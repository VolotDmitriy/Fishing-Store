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
        .min(2, {
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
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type ProductFormValues = z.infer<typeof productFormSchema>;
