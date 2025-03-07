import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RouterHandler = (req: Request, res: Response) => void;

const ErrorHandler = (error: any, res: Response) => {
    const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
    return res
        .status(500)
        .json({ error: 'Internal Server Error', details: errorMessage });
};

export const getAllCategories: RouterHandler = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
    } catch (error) {
        return ErrorHandler(error, res);
    }
};

export const getCategoryById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // Статус 404, если категория не найдена
        }

        return res.status(200).json(category); // Статус 200 для успешного получения категории
    } catch (error) {
        return ErrorHandler(error, res);
    }
};

export const createCategory: RouterHandler = async (req, res) => {
    try {
        const { id, name, parentId } = req.body;

        if (parentId) {
            const parentExists = await prisma.category.findUnique({
                where: { id: parentId },
            });

            if (!parentExists) {
                return res
                    .status(400)
                    .json({ error: 'Parent category not found' }); // Статус 400 для ошибки с родительской категорией
            }
        }

        const newCategory = await prisma.category.create({
            data: {
                id,
                name,
                parentId,
            },
        });

        return res.status(201).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        return ErrorHandler(error, res);
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
            return res.status(404).json({ message: 'Category not found' }); // Статус 404 для ошибки, если категория не найдена
        }

        return res.status(200).json(category); // Статус 200 для успешного обновления категории
    } catch (error) {
        return ErrorHandler(error, res);
    }
};

export const deleteCategoryById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.body;
        const category = await prisma.category.delete({
            where: { id },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // Статус 404 для ошибки, если категория не найдена
        }

        return res
            .status(200)
            .json({ message: 'Category deleted successfully', data: category }); // Статус 200 или 204 для успешного удаления
    } catch (error) {
        return ErrorHandler(error, res);
    }
};
