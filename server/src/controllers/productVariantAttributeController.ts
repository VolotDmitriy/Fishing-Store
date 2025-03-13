import { PrismaClient } from '@prisma/client';
import { RouterHandler, ErrorHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllProductVariantAttributes: RouterHandler = async (
    req,
    res,
) => {
    try {
        const productVariantAttributes =
            await prisma.productVariantAttribute.findMany();

        res.status(200).json(productVariantAttributes);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductVariantAttributeById: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { id } = req.params;
        const productVariantAttribute =
            await prisma.productVariantAttribute.findUnique({
                where: { id },
            });

        if (!productVariantAttribute) {
            res.status(404).json({
                message: 'Product variant attribute not found',
            });
            return;
        }

        res.status(200).json(productVariantAttribute);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductVariantAttributeByVariantId: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { variantId } = req.params;
        const productVariantAttributes =
            await prisma.productVariantAttribute.findMany({
                where: { variantId },
            });

        res.status(200).json(productVariantAttributes);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const createProductVariantAttribute: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { variantId, typeId, value } = req.body;

        const newProductVariantAttribute =
            await prisma.productVariantAttribute.create({
                data: {
                    variantId,
                    typeId,
                    value,
                },
            });

        res.status(201).json({
            message: 'Product variant attribute created successfully',
            data: newProductVariantAttribute,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const updateProductVariantAttributeById: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { id } = req.params;
        const { variantId, typeId, value } = req.body;

        const productVariantAttribute =
            await prisma.productVariantAttribute.update({
                where: { id },
                data: {
                    variantId,
                    typeId,
                    value,
                },
            });

        if (!productVariantAttribute) {
            res.status(404).json({
                message: 'Product variant attribute not found',
            });
            return;
        }

        res.status(200).json(productVariantAttribute);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const deleteProductVariantAttributeById: RouterHandler = async (
    req,
    res,
) => {
    try {
        const { id } = req.params;

        const productVariantAttribute =
            await prisma.productVariantAttribute.findUnique({
                where: { id },
            });

        if (!productVariantAttribute) {
            res.status(404).json({
                message: 'Product variant attribute not found',
            });
            return;
        }

        await prisma.productVariantAttribute.delete({
            where: { id },
        });

        res.status(200).json({
            message: 'Product variant attribute deleted successfully',
            data: productVariantAttribute,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
