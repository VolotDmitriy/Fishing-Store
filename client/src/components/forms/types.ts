import { z } from 'zod';

export const categoryFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(30, {
            message: 'Name must not be longer than 30 characters.',
        }),
    parentId: z
        .string({
            required_error: 'Please select an parentId to display.',
        })
        .optional(),
    products: z
        .array(z.object({ productId: z.string(), name: z.string() }))
        .optional(),
    childCategories: z
        .array(z.object({ categoryId: z.string(), name: z.string() }))
        .optional(),
});

export const productFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(30, {
            message: 'Name must not be longer than 30 characters.',
        }),
    description: z
        .string()
        .min(0, {
            message: 'Name must be at least 2 characters.',
        })
        .max(250, {
            message: 'Name must not be longer than 250 characters.',
        })
        .optional(),
    categoryId: z.string({
        required_error: 'Please select an categoryId to display.',
    }),
    images: z.array(
        z.object({
            value: z.string().url({ message: 'Please enter a valid URL.' }),
        }),
    ),
    variants: z
        .array(
            z.object({
                sku: z
                    .string()
                    .min(1, 'SKU is required')
                    .regex(
                        /^[A-Za-z0-9-]+$/,
                        'SKU must contain only letters, numbers, and hyphens',
                    ),
                price: z
                    .string()
                    .transform((val) =>
                        parseFloat(val.replace(/^0+/, '') || '0'),
                    )
                    .pipe(z.number().min(0, 'Price must be a positive number')),

                inStock: z
                    .string()
                    .transform((val) =>
                        parseInt(val.replace(/^0+,/, '') || '0'),
                    )
                    .pipe(
                        z
                            .number()
                            .int('Stock must be an integer')
                            .min(0, 'Stock must be a non-negative number'),
                    ),
                discountId: z.string().nullable().optional(),
            }),
        )
        .optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export interface SelectedProduct {
    productId: string;
    name: string;
}

export type ProductFormValues = z.infer<typeof productFormSchema>;

export interface SelectedProduct {
    productId: string;
    name: string;
}

export interface SelectedCategory {
    categoryId: string;
    name: string;
}
