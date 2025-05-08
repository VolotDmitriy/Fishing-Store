import {
    Prisma,
    PrismaClient,
    Product,
    ProductAttribute,
    ProductVariant,
    VariantType,
} from '@prisma/client';

const prisma = new PrismaClient();

export interface IRequestBody {
    name: string;
    description?: string;
    categoryId: string;
    images: { value: string }[];
    discountId?: string;
    attributes: { name: string; value: string }[];
    variants: {
        sku: string;
        price: number;
        inStock: number;
        discountId?: string;
        attributes: { name: string; value: string }[];
    }[];
}

export const upsertVariantTypes = async (
    tx: Prisma.TransactionClient,
    names: string[],
    categoryId: string,
): Promise<{ typeMap: Map<string, string>; created: VariantType[] }> => {
    const existing = await tx.variantType.findMany({
        where: { name: { in: names }, categoryId },
    });

    const map = new Map(existing.map((vt) => [vt.name, vt.id]));

    const newNames = names.filter((n) => !map.has(n));
    let created: VariantType[] = [];

    if (newNames.length > 0) {
        await tx.variantType.createMany({
            data: newNames.map((n) => ({ name: n, categoryId })),
            skipDuplicates: true,
        });

        const newlyCreated = await tx.variantType.findMany({
            where: { name: { in: newNames }, categoryId },
        });

        created = newlyCreated;

        newlyCreated.forEach((vt) => map.set(vt.name, vt.id));
    }

    return { typeMap: map, created };
};

export const createAttributes = async (
    tx: Prisma.TransactionClient,
    attributes: { name: string; value: string }[],
    productId: string,
    typeMap: Map<string, string>,
): Promise<ProductAttribute[]> => {
    const data = attributes.map((a) => ({
        value: a.value,
        typeId: typeMap.get(a.name) || '',
        productId,
    }));

    await tx.productAttribute.createMany({
        data,
        skipDuplicates: true,
    });

    return tx.productAttribute.findMany({
        where: { productId },
    });
};

export const createVariants = async (
    tx: Prisma.TransactionClient,
    variants: {
        sku: string;
        price: number;
        inStock: number;
        discountId?: string;
        attributes: { name: string; value: string }[];
    }[],
    typeMap: Map<string, string>,
    productId: string,
): Promise<ProductVariant[]> => {
    const createdVariants: ProductVariant[] = [];
    for (const variant of variants) {
        const existing = await tx.productVariant.findUnique({
            where: { sku: variant.sku },
        });
        if (existing) {
            throw new Error(`Variant with SKU ${variant.sku} already exists`);
        }

        const createdVariant = await tx.productVariant.create({
            data: {
                sku: variant.sku,
                price: variant.price,
                inStock: variant.inStock,
                discountId: variant.discountId || null,
                productId,
            },
        });

        const attrData = variant.attributes.map((attr) => ({
            variantId: createdVariant.id,
            value: attr.value,
            typeId: typeMap.get(attr.name) || '',
        }));

        if (attrData.length > 0) {
            await tx.productVariantAttribute.createMany({
                data: attrData,
                skipDuplicates: true,
            });
        }
        createdVariants.push(createdVariant);
    }

    return createdVariants;
};

export const createProduct = async (input: IRequestBody) => {
    const {
        name,
        description,
        categoryId,
        images,
        discountId,
        variants,
        attributes,
    } = input;

    const imagesArray = images.map((i) => i.value);

    const resultData: {
        product: Product;
        variantTypes?: VariantType[];
        attributes?: ProductAttribute[];
        variants?: ProductVariant[];
    } = { product: null as any, variantTypes: [] };

    const transactionResult = await prisma.$transaction(async (tx) => {
        const newProduct = await tx.product.create({
            data: {
                name,
                description: description || null,
                categoryId,
                images: imagesArray,
                discountId: discountId || null,
            },
        });
        resultData.product = newProduct;

        if (attributes.length > 0) {
            const { typeMap, created } = await upsertVariantTypes(
                tx,
                [...new Set(attributes.map((a) => a.name))],
                categoryId,
            );

            const newAttributes = await createAttributes(
                tx,
                attributes,
                newProduct.id,
                typeMap,
            );

            resultData.variantTypes?.push(...created);
            resultData.attributes = newAttributes;
        }

        if (variants.length > 0) {
            const { typeMap, created } = await upsertVariantTypes(
                tx,
                [
                    ...new Set(
                        variants.flatMap((v) =>
                            v.attributes.map((a) => a.name),
                        ),
                    ),
                ],
                categoryId,
            );

            const newVariants = await createVariants(
                tx,
                variants,
                typeMap,
                newProduct.id,
            );

            resultData.variantTypes?.push(...created);
            resultData.variants = newVariants;
        }

        return resultData;
    });

    return transactionResult;
};
