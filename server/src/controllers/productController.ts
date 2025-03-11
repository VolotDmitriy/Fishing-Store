/*

model Product {
  id          String             @id @default(cuid()) // "prod001"
  name        String // "Смартфон Samsung Galaxy S24"
  description String? // "Флагманский смартфон с топовыми характеристиками."
  categoryId  String // "cat001"
  category    Category           @relation(fields: [categoryId], references: [id])
  images      String[] // ["https://example.com/samsung_s24.jpg"]
  variants    ProductVariant[]
  attributes  ProductAttribute[]
  discountId  String? // "disc001"
  discount    Discount?          @relation(fields: [discountId], references: [id])
}

model ProductAttribute {
  id        String      @id @default(cuid()) // "attr001"
  productId String // "prod001"
  product   Product     @relation(fields: [productId], references: [id])
  typeId    String // "varType002"
  type      VariantType @relation(fields: [typeId], references: [id])
  value     String // "Snapdragon 8 Gen 3"
}

model ProductVariant {
  id         String                    @id @default(cuid()) // "var001"
  productId  String // "prod001"
  product    Product                   @relation(fields: [productId], references: [id])
  sku        String                    @unique // "SAMSUNG-S24-256GB-BLACK"
  price      Decimal // 89999.00
  inStock    Int                       @default(10) // 10 штук на складе
  attributes ProductVariantAttribute[]
  discountId String? // null (нет скидки)
  discount   Discount?                 @relation(fields: [discountId], references: [id])
}

model ProductVariantAttribute {
  id        String         @id @default(cuid()) // "varAttr001"
  variantId String // "var001"
  variant   ProductVariant @relation(fields: [variantId], references: [id])
  typeId    String // "varType001"
  type      VariantType    @relation(fields: [typeId], references: [id])
  value     String // "256 ГБ"
}

------------------- READY ---------------------------
model VariantType {
  id                      String                    @id @default(cuid()) // "varType003"
  categoryId              String // "cat001"
  category                Category                  @relation(fields: [categoryId], references: [id])
  name                    String // "Производитель"
  ProductAttribute        ProductAttribute[]
  ProductVariantAttribute ProductVariantAttribute[]
}
*/

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

type RouterHandler = (req: Request, res: Response) => Promise<void>;

const ErrorHandler = (error: any, res: Response) => {
    const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
        error: 'Internal Server Error',
        details: errorMessage,
    });
};

export const getAllVariantTypes: RouterHandler = async (req, res) => {
    try {
        const variantTypes = await prisma.variantType.findMany();

        res.status(200).json(variantTypes);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getVariantTypeById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const variantType = await prisma.variantType.findUnique({
            where: { id },
        });

        if (!variantType) {
            res.status(404).json({ message: 'VariantType not found' });
            return;
        }

        res.status(200).json(variantType);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createVariantType: RouterHandler = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) {
            res.status(400).json({
                message: 'name and categoryId are required',
            });
            return;
        }

        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!categoryExists) {
            res.status(404).json({
                error: 'Category not found while creating VariantType',
            });
            return;
        }

        const newVariantType = await prisma.variantType.create({
            data: {
                name,
                categoryId,
            },
        });

        res.status(201).json({
            message: 'VariantType created successfully',
            data: newVariantType,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateVariantTypeById: RouterHandler = async (req, res) => {
    try {
        const { id, name, categoryId } = req.body;

        const variantType = await prisma.variantType.update({
            where: { id },
            data: {
                name,
                categoryId,
            },
        });

        if (!variantType) {
            res.status(404).json({ message: 'VariantType not found' });
            return;
        }

        res.status(200).json(variantType);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteVariantTypeById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const variantType = await prisma.variantType.findUnique({
            where: { id },
        });

        if (!variantType) {
            res.status(404).json({ message: 'VariantType not found' });
            return;
        }

        await prisma.variantType.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Category deleted successfully',
            data: variantType,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

/*
model Product {
  id          String             @id @default(cuid()) // "prod001"
  name        String // "Смартфон Samsung Galaxy S24"
  description String? // "Флагманский смартфон с топовыми характеристиками."
  categoryId  String // "cat001"
  category    Category           @relation(fields: [categoryId], references: [id])
  images      String[] // ["https://example.com/samsung_s24.jpg"]
  variants    ProductVariant[]
  attributes  ProductAttribute[]
  discountId  String? // "disc001"
  discount    Discount?          @relation(fields: [discountId], references: [id])
}
*/
// PRODUCTS
export const getAllProducts: RouterHandler = async (req, res) => {
    try {
        const products = await prisma.product.findMany();

        res.status(200).json(products);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductByCategory: RouterHandler = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await prisma.product.findMany({
            where: { categoryId },
        });

        res.status(200).json(products);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createProduct: RouterHandler = async (req, res) => {
    try {
        const { name, description, categoryId, images, discountId } = req.body;

        const newProduct = await prisma.product.create({
            data: {
                name,
                description: description || undefined,
                categoryId,
                images,
                discountId: discountId || undefined,
            },
        });

        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateProductById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoryId, images, discountId } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description: description || undefined,
                categoryId,
                images,
                discountId: discountId || undefined,
            },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteProductById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await prisma.product.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Product deleted successfully',
            data: product,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
