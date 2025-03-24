import { PrismaClient } from '@prisma/client';
import { ErrorHandler, RouterHandler } from '../utils/controllerUtils';

const prisma = new PrismaClient();

export const getAllCategories: RouterHandler = async (req, res) => {
    try {
        const { full } = req.query as { full?: string };

        if (full !== undefined && full !== 'true' && full !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const isFull = full === 'true';

        const categories = await prisma.category.findMany({
            ...(isFull && {
                include: {
                    children: true,
                    products: {
                        include: {
                            variants: { include: { attributes: true } },
                            attributes: true,
                        },
                    },
                    variantTypes: {
                        include: {
                            productAttributes: true,
                            productVariantAttributes: true,
                        },
                    },
                },
            }),
        });

        if (!categories) {
            res.status(404).json({ message: 'Categories not found' });
            return;
        }

        res.status(200).json(categories);
    } catch (error) {
        ErrorHandler(error, res);
    }
};

export const getCategoryById: RouterHandler = async (req, res) => {
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

        const categories = await prisma.category.findMany({
            where: { id },
            ...(isFull && {
                include: {
                    children: true,
                    products: {
                        include: {
                            variants: { include: { attributes: true } },
                            attributes: true,
                        },
                    },
                    variantTypes: {
                        include: {
                            productAttributes: true,
                            productVariantAttributes: true,
                        },
                    },
                },
            }),
        });

        if (!categories) {
            res.status(404).json({ message: 'Categories not found' });
            return;
        }

        res.status(200).json(categories);
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
        const { id } = req.params;
        const { name, parentId } = req.body;
        const category = await prisma.category.update({
            where: { id },
            data: {
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
        const { newId, name, parentId } = req.body;
        const { force } = req.query;

        if (force !== undefined && force !== 'true' && force !== 'false') {
            res.status(400).json({
                message: 'Force parameter is true or false',
            });
            return;
        }

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                products: {
                    include: { variants: true },
                },
                variantTypes: true,
            },
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        if (force) {
            await prisma.$transaction(async (tx) => {
                const variantTypesId = category.variantTypes.map(
                    (variant) => variant.id,
                );

                const productsId = category.products.map(
                    (product) => product.id,
                );

                const variantsId = category.products
                    .map((product) =>
                        product.variants.map((variant) => variant.id),
                    )
                    .flat();

                // delete VariantTypes
                await tx.productAttribute.deleteMany({
                    where: {
                        typeId: { in: variantTypesId },
                    },
                });

                await tx.productVariantAttribute.deleteMany({
                    where: {
                        typeId: { in: variantTypesId },
                    },
                });

                await tx.productVariantAttribute.deleteMany({
                    where: {
                        variantId: { in: variantsId },
                    },
                });

                await tx.variantType.deleteMany({
                    where: {
                        id: { in: variantTypesId },
                    },
                });

                // delete Products
                await tx.productVariant.deleteMany({
                    where: {
                        productId: { in: productsId },
                    },
                });

                await tx.productAttribute.deleteMany({
                    where: {
                        productId: { in: productsId },
                    },
                });

                await tx.product.deleteMany({
                    where: {
                        id: { in: productsId },
                    },
                });

                // delete Category
                await tx.category.delete({
                    where: { id },
                });
            });
        } else {
            await prisma.category.update({
                where: { id },
                data: { id: newId, name, parentId },
            });
        }

        // await prisma.category.delete({
        //     where: { id },
        // });

        res.status(200).json({
            message: 'Category deleted successfully',
            data: category,
        });
    } catch (error) {
        ErrorHandler(error, res);
    }
};
