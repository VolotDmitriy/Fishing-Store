import { PrismaClient } from '@prisma/client';
import { RouterHandler, ErrorHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllCategories: RouterHandler = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getCategoryById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createCategory: RouterHandler = async (req, res) => {
    try {
        const { name, parentId } = req.body;

        if (parentId) {
            const parentExists = await prisma.category.findUnique({
                where: { id: parentId },
            });

            if (!parentExists) {
                res.status(400).json({ error: 'Parent category not found' });
                return;
            }
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                parentId,
            },
        });

        res.status(201).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateCategoryById: RouterHandler = async (req, res) => {
    try {
        const { id, name, parentId } = req.body;
        const category = await prisma.category.update({
            where: { id },
            data: {
                id,
                name,
                parentId,
            },
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteCategoryById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        await prisma.category.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Category deleted successfully',
            data: category,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
