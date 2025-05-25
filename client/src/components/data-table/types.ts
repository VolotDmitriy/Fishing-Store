import { z } from 'zod';

// Схемы данных
export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productVariantAttribute = z.object({
    id: z.string(),
    variantId: z.string(),
    typeId: z.string(),
    value: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productVariant = z.object({
    id: z.string(),
    productId: z.string(),
    sku: z.string(),
    price: z.string(),
    inStock: z.number(),
    attributes: z.array(productVariantAttribute),
    discountId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const ProductAttribute = z.object({
    id: z.string(),
    productId: z.string(),
    typeId: z.string(),
    value: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    categoryId: z.string(),
    images: z.array(z.string()),
    variants: z.array(productVariant).nullable(),
    attributes: z.array(ProductAttribute),
    discountId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const variantTypeSchema = z.object({
    id: z.string(),
    categoryId: z.string(),
    name: z.string(),
    productAttributes: z.array(ProductAttribute),
    productVariantAttributes: z.array(productVariantAttribute),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const discountSchema = z.object({
    id: z.string(),
    name: z.string(),
    percentage: z.number(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type CategoryType = z.infer<typeof categorySchema>;
export type ProductType = z.infer<typeof productSchema>;
export type DiscountType = z.infer<typeof discountSchema>;
export type ProductVariantType = z.infer<typeof productVariant>;
export type VariantTypeType = z.infer<typeof variantTypeSchema>;

export type ColumnType =
    | z.infer<typeof categorySchema>
    | z.infer<typeof productSchema>
    | z.infer<typeof discountSchema>;

export interface DataTableProps {
    categories: ColumnType[];
    products: ColumnType[];
    discounts: ColumnType[];
}

export const categorySchemaF = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    children: z.array(z.lazy(() => categorySchema)).optional(),
    products: z.array(z.lazy(() => productSchema)).optional(),
    variantTypes: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                createdAt: z.string(),
                updatedAt: z.string(),
            }),
        )
        .optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type CategoryTypeF = z.infer<typeof categorySchemaF>;
