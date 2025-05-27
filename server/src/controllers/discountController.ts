import { PrismaClient } from '@prisma/client';
import { ErrorHandler, RouterHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllDiscounts: RouterHandler = async (req, res) => {
    try {
        const { active } = req.query;
        const { full } = req.query as { full?: string };
        const now = new Date();

        if (full !== undefined && full !== 'true' && full !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const isFull = full === 'true';

        const discounts = await prisma.discount.findMany({
            where: active
                ? {
                      startDate: { lte: now },
                      endDate: { gte: now },
                  }
                : undefined,
            ...(isFull && { include: { products: true, variants: true } }),
        });

        if (!discounts) {
            res.status(404).json({ message: 'Discounts not found' });
            return;
        }

        res.status(200).json(discounts);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getDiscountById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { full } = req.query as { full?: string };

        if (full !== undefined && full !== 'true' && full !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const isFull = full === 'true';

        const discount = await prisma.discount.findMany({
            where: { id },
            ...(isFull && { include: { products: true, variants: true } }),
        });

        if (!discount) {
            res.status(404).json({ message: 'Discount not found' });
            return;
        }

        res.status(200).json(discount);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createDiscount: RouterHandler = async (req, res) => {
    try {
        const { name, percentage, date, products, variants } = req.body;

        const newDiscount = await prisma.discount.create({
            data: {
                name,
                percentage,
                startDate: date.from ? new Date(date.from) : undefined,
                endDate: date.to ? new Date(date.to) : undefined,
            },
        });

        res.status(201).json(newDiscount);
    } catch (error) {
        ErrorHandler(error, res);
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
        ErrorHandler(error, res);
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
        ErrorHandler(error, res);
    }
};

export const checkDiscount: RouterHandler = async (req, res) => {
    try {
        const { code } = req.body;
        const now = new Date();
        const discount = await prisma.discount.findFirst({
            where: {
                name: code,
                startDate: { lte: now },
                endDate: { gte: now },
            },
        });
        if (!discount) {
            res.status(200).json({
                message: 'Discount not found or not active',
            });
            return;
        }
        res.status(200).json({
            message: 'Coupon applied successfully',
            discount: {
                id: discount.id,
                name: discount.name,
                percentage: discount.percentage,
            },
        });
        return;
    } catch (error) {
        ErrorHandler(error, res);
    }
};
