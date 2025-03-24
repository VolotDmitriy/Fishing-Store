import { z } from 'zod';

// Схемы данных
export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productVariantAtribute = z.object({
    id: z.string(),
    variantId: z.string(),
    typeId: z.string(),
    value: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productVariant = z.object({
    id: z.string(),
    productId: z.string(),
    sku: z.string(),
    price: z.string(),
    inStock: z.number(),
    attributes: z.array(productVariantAtribute),
    discountId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const ProductAttribute = z.object({
    id: z.string(),
    productId: z.string(),
    typeId: z.string(),
    value: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    categoryId: z.string(),
    images: z.array(z.string()),
    variants: z.array(productVariant).nullable(),
    attributes: z.array(ProductAttribute),
    discountId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const discountSchema = z.object({
    id: z.string(),
    name: z.string(),
    percentage: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type ColumnType =
    | z.infer<typeof categorySchema>
    | z.infer<typeof productSchema>
    | z.infer<typeof discountSchema>;

// Основной компонент DataTable с вкладками
export interface DataTableProps {
    categories: ColumnType[];
    products: ColumnType[];
    discounts: ColumnType[];
}
