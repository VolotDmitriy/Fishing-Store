import { PrismaClient } from '@prisma/client';
import { ErrorHandler, RouterHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllProducts: RouterHandler = async (req, res) => {
    try {
        const { full } = req.query as { full?: string };

        if (full !== undefined && full !== 'true' && full !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const isFull = full === 'true';

        const products = await prisma.product.findMany({
            ...(isFull && {
                include: {
                    variants: { include: { attributes: true } },
                    attributes: true,
                    discount: true,
                },
            }),
        });

        if (!products) {
            res.status(404).json({ message: 'Products not found' });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getProductById: RouterHandler = async (req, res) => {
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

        const product = await prisma.product.findUnique({
            where: { id },
            ...(isFull && {
                include: {
                    variants: { include: { attributes: true } },
                    attributes: true,
                    discount: true,
                },
            }),
        });

        if (!product) {
            res.status(404).json({ message: 'Products not found' });
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
        const { full } = req.query as { full?: string };
        if (full !== undefined && full !== 'true' && full !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const isFull = full === 'true';

        const products = await prisma.product.findMany({
            where: { categoryId },
            ...(isFull && {
                include: {
                    variants: { include: { attributes: true } },
                    attributes: true,
                    discount: true,
                },
            }),
        });

        if (!products) {
            res.status(404).json({ message: 'Products not found' });
            return;
        }

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

        const { force } = req.query;

        if (force !== undefined && force !== 'true' && force !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                attributes: true,
            },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        if (force) {
            await prisma.$transaction(async (tx) => {
                const variantsId = product.variants.map(
                    (variant) => variant.id,
                );

                await tx.productVariantAttribute.deleteMany({
                    where: {
                        variantId: { in: variantsId },
                    },
                });

                await tx.productVariant.deleteMany({
                    where: {
                        productId: id,
                    },
                });

                await tx.productAttribute.deleteMany({
                    where: {
                        productId: id,
                    },
                });

                await tx.product.delete({
                    where: { id },
                });
            });
        } else {
            await prisma.product.delete({
                where: { id },
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            data: product,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
