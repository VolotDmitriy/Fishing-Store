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
