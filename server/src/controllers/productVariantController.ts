import { PrismaClient } from '@prisma/client';
import { RouterHandler, ErrorHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllProductVariants: RouterHandler = async (req, res) => {
    try {
        const productVariants = await prisma.productVariant.findMany();

        res.status(200).json(productVariants);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductVariantById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const productVariant = await prisma.productVariant.findUnique({
            where: { id },
        });

        if (!productVariant) {
            res.status(404).json({ message: 'Product variant not found' });
            return;
        }

        res.status(200).json(productVariant);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductVariantsByProductId: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { productId } = req.params;
        const productVariants = await prisma.productVariant.findMany({
            where: { productId },
        });

        res.status(200).json(productVariants);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createProductVariant: RouterHandler = async (req, res) => {
    try {
        const { productId, sku, price, inStock } = req.body;

        const newProductVariant = await prisma.productVariant.create({
            data: {
                productId,
                sku,
                price,
                inStock,
            },
        });

        res.status(201).json({
            massage: 'Product variant created successfully',
            data: newProductVariant,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateProductVariantById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, sku, price, inStock } = req.body;

        const productVariant = await prisma.productVariant.update({
            where: { id },
            data: {
                productId,
                sku,
                price,
                inStock,
            },
        });

        if (!productVariant) {
            res.status(404).json({ message: 'Product variant not found' });
            return;
        }

        res.status(200).json(productVariant);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteProductVariantById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const productVariant = await prisma.productVariant.findUnique({
            where: { id },
        });

        if (!productVariant) {
            res.status(404).json({ message: 'Product variant not found' });
            return;
        }

        await prisma.productVariant.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Product variant deleted successfully',
            data: productVariant,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
