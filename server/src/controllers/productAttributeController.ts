import { PrismaClient } from '@prisma/client';
import { ErrorHandler, RouterHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllAttributes: RouterHandler = async (req, res) => {
    try {
        const attributes = await prisma.productAttribute.findMany();

        res.status(200).json(attributes);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getAttributeById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const attribute = await prisma.productAttribute.findUnique({
            where: { id },
        });

        if (!attribute) {
            res.status(404).json({ message: 'Attribute not found' });
            return;
        }

        res.status(200).json(attribute);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createAttribute: RouterHandler = async (req, res) => {
    try {
        const { productId, typeId, value } = req.body;

        const newAttribute = await prisma.productAttribute.create({
            data: {
                productId,
                typeId,
                value,
            },
        });

        res.status(201).json({
            massage: 'Attribute created successfully',
            data: newAttribute,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateAttributeById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, typeId, value } = req.body;

        const attribute = await prisma.productAttribute.update({
            where: { id },
            data: {
                productId,
                typeId,
                value,
            },
        });

        if (!attribute) {
            res.status(404).json({ message: 'Attribute not found' });
            return;
        }

        res.status(200).json(attribute);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteAttributeById: RouterHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const attribute = await prisma.productAttribute.findUnique({
            where: { id },
        });

        if (!attribute) {
            res.status(404).json({ message: 'Attribute not found' });
            return;
        }

        await prisma.productAttribute.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Attribute deleted successfully',
            data: attribute,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
