'use client';

import { CategoryTypeF, DiscountType } from '@/components/data-table/types';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { fetchCategories, fetchDiscounts } from '@/utils/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { productFormSchema, ProductFormValues } from './types';
import { VariantForm } from './variant-form';

// Define default values
const defaultValues: Partial<ProductFormValues> = {
    name: '',
    description: '',
    categoryId: 'null',
    images: [{ value: '' }],
    variants: [],
};

export function ProductForm() {
    const [discounts, setDiscounts] = useState<DiscountType[]>([]);
    const [categories, setCategories] = useState<CategoryTypeF[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage,
    } = useFieldArray({
        name: 'images',
        control: form.control,
    });

    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant,
    } = useFieldArray({
        name: 'variants',
        control: form.control,
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [fetchedCategories, fetchedDiscounts] = await Promise.all(
                    [fetchCategories(true), fetchDiscounts(false)],
                );
                setCategories(fetchedCategories);
                setDiscounts(fetchedDiscounts);
            } catch (error) {
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [form]);

    function onSubmit(data: ProductFormValues) {
        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    if (loading) {
        return (
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-spin"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Loading data...
                </div>
            </div>
        );
    }

    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-2xl">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Product name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter product name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter product description
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category for product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Please select a category for product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                {imageFields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`images.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormLabel
                                                    className={cn(
                                                        index !== 0 &&
                                                            'sr-only',
                                                    )}
                                                >
                                                    URLs images
                                                </FormLabel>
                                                <FormDescription
                                                    className={cn(
                                                        index !== 0 &&
                                                            'sr-only',
                                                        index === 0 && 'mb-2',
                                                    )}
                                                >
                                                    Add links to your website,
                                                    blog, or social media
                                                    profiles.
                                                </FormDescription>
                                                <div className="flex items-center flex-row">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
                                                        disabled={
                                                            imageFields.length ===
                                                            1
                                                        }
                                                        className="ml-2"
                                                    >
                                                        ✖
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => appendImage({ value: '' })}
                                >
                                    Add URL
                                </Button>
                            </div>
                            <div>
                                {variantFields.length === 0 ? (
                                    <div className="flex flex-row justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <FormLabel>Variant</FormLabel>
                                            <FormDescription>
                                                Add variant details for this
                                                product.
                                            </FormDescription>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() =>
                                                appendVariant({
                                                    sku: '',
                                                    price: 0,
                                                    inStock: 0,
                                                    discountId: null,
                                                    attributes: [],
                                                })
                                            }
                                        >
                                            Add Variant
                                        </Button>
                                    </div>
                                ) : (
                                    variantFields.map((field, index) => (
                                        <VariantForm
                                            key={field.id}
                                            index={index}
                                            form={form}
                                            removeVariant={() =>
                                                removeVariant(index)
                                            }
                                            discounts={discounts}
                                        />
                                    ))
                                )}
                                {variantFields.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() =>
                                            appendVariant({
                                                sku: '',
                                                price: 0,
                                                inStock: 0,
                                                discountId: null,
                                                attributes: [],
                                            })
                                        }
                                    >
                                        Add Variant
                                    </Button>
                                )}
                            </div>
                            <Button type="submit">Update profile</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
