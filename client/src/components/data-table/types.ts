import { z } from 'zod';

// Схемы данных
export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    categoryId: z.string().nullable(),
    images: z.array(z.string()),
    discountId: z.string().nullable(),
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
