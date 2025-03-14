import { PrismaClient } from '@prisma/client';
import { ErrorHandler, RouterHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

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
