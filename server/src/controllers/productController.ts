import { PrismaClient } from '@prisma/client';
import { RouterHandler, ErrorHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

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
