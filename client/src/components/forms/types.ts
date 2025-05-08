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
            value: z.string(),
        }),
    ),
    attributes: z.array(
        z.object({
            name: z.string({
                required_error: 'Please select an attribute type.',
            }),
            value: z
                .string()
                .min(1, { message: 'Attribute value is required.' }),
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
                attributes: z
                    .array(
                        z.object({
                            name: z
                                .string()
                                .min(1, 'Attribute name is required'),
                            value: z
                                .string()
                                .min(1, 'Attribute value is required'),
                        }),
                    )
                    .optional(),
            }),
        )
        .optional(),
});

export const discountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(30, {
            message: 'Name must not be longer than 30 characters.',
        }),
    percentage: z
        .string()
        .transform((val) => (val ? parseFloat(val) : 0))
        .refine((val) => val >= 0 && val <= 100, {
            message: 'Discount percentage should be from 0 to 100',
        }),
    date: z
        .object({
            from: z.date(),
            to: z.date(),
        })
        .refine((data) => data.to >= data.from, {
            message: 'The end date must be later than the start date',
            path: ['to'],
        }),
    products: z.array(z.unknown()).optional(),
    variants: z.array(z.unknown()).optional(),
});

export interface SelectedProduct {
    productId: string;
    name: string;
}

export interface SelectedCategory {
    categoryId: string;
    name: string;
}
export type ProductFormValues = z.infer<typeof productFormSchema>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type DiscountFormValues = z.infer<typeof discountFormSchema>;
