import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

type RouterHandler = (req: Request, res: Response) => Promise<void>;

export const getAllDiscounts: RouterHandler = async (req, res) => {
    try {
        const { active } = req.query;
        const now = new Date();

        const discounts = await prisma.discount.findMany({
            where: active
                ? {
                      startDate: { lte: now },
                      endDate: { gte: now },
                  }
                : undefined,
        });

        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении скидок', error });
    }
};

export const getDiscountById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const discount = await prisma.discount.findUnique({
            where: { id },
        });
        if (discount) {
            res.status(200).json(discount);
        } else {
            res.status(404).json({ message: 'Скидка не найдена' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении скидки', error });
    }
};

export const createDiscount: RouterHandler = async (req, res) => {
    try {
        const { name, percentage, startDate, endDate, products, variants } =
            req.body;

        const newDiscount = await prisma.discount.create({
            data: {
                name,
                percentage,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
            },
        });

        res.status(201).json(newDiscount);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании скидки', error });
    }
};

export const updateDiscount: RouterHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, percentage, startDate, endDate, products, variants } =
            req.body;

        const existingDiscount = await prisma.discount.findUnique({
            where: { id },
        });
        if (!existingDiscount) {
            res.status(404).json({ message: 'Скидка не найдена' });
            return;
        }

        const updatedDiscount = await prisma.discount.update({
            where: { id },
            data: {
                name,
                percentage,
                startDate:
                    startDate !== undefined
                        ? new Date(startDate)
                        : existingDiscount.startDate,
                endDate:
                    endDate !== undefined
                        ? new Date(endDate)
                        : existingDiscount.endDate,
            },
        });

        res.status(200).json(updatedDiscount);
    } catch (error) {
        res.status(500).json({
            message: 'Ошибка при обновлении скидки',
            error,
        });
    }
};

export const deleteDiscount: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const existingDiscount = await prisma.discount.findUnique({
            where: { id },
        });
        if (!existingDiscount) {
            res.status(404).json({ message: 'Скидка не найдена' });
            return;
        }

        const deletedDiscount = await prisma.discount.delete({ where: { id } });

        res.status(200).json({ message: 'Скидка удалена', deletedDiscount });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении скидки', error });
    }
};
