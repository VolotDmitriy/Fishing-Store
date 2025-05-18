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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoadingOverlay } from '../loading-overlay';
import { Textarea } from '../ui/textarea';
import { productFormSchema, ProductFormValues } from './types';
import { VariantForm } from './variant-form';

// Define default values
const defaultValues: Partial<ProductFormValues> = {
    name: '',
    description: '',
    categoryId: 'null',
    images: [{ value: '' }],
    attributes: [],
    variants: [],
};

export function ProductForm() {
    const [discounts, setDiscounts] = useState<DiscountType[]>([]);
    const [categories, setCategories] = useState<CategoryTypeF[]>([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

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

    const {
        fields: attributeFields,
        append: appendAttribute,
        remove: removeAttribute,
    } = useFieldArray({
        name: 'attributes',
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
                toast.error('Failed to load data! ' + error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [form]);

    async function onSubmit(data: ProductFormValues) {
        setCreateLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/product`,

                data,
                {
                    withCredentials: true,
                },
            );
            if (response.status === 200 || response.status === 201) {
                const resData = response.data;

                Object.keys(resData.data).forEach((key) => {
                    if (Array.isArray(resData.data[key])) {
                        if (resData.data[key].length <= 0) {
                            delete resData.data[key];
                        } else {
                            resData.data[key] = resData.data[key].length;
                        }
                    } else {
                        resData.data[key] = 1;
                    }
                });

                toast('You submitted the following values:', {
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {`${resData.message}\nCreated/Updated: ${JSON.stringify(
                                    resData.data,
                                    null,
                                    2,
                                )}`}
                            </code>
                        </pre>
                    ),
                });
                form.reset();
            }
        } catch (error) {
            toast('Error submitting form:', {
                description: (
                    <pre className="mt-2  w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white text-wrap">
                            {'Please try again later. \n' + error}
                        </code>
                    </pre>
                ),
            });
        } finally {
            setCreateLoading(false);
        }
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
            <LoadingOverlay isLoading={createLoading} />{' '}
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

                            <div className="mt-4">
                                <div className="flex flex-row gap-15 mb-2">
                                    <div className="flex flex-col gap-2 mb-2">
                                        <FormLabel>Attributes</FormLabel>
                                        <FormDescription>
                                            Add attributes for this variant.
                                        </FormDescription>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            appendAttribute({
                                                name: '',
                                                value: '',
                                            })
                                        }
                                    >
                                        Add Attribute
                                    </Button>
                                </div>
                                {attributeFields.map((attrField, attrIndex) => (
                                    <div
                                        key={attrField.id}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`attributes.${attrIndex}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Attribute name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`attributes.${attrIndex}.value`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Attribute value"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeAttribute(attrIndex)
                                            }
                                        >
                                            ✖
                                        </Button>
                                    </div>
                                ))}
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
                            <Button type="submit">Create product</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
