'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import categoryData from '@/app/dashboard/categ.json';
import discountData from '@/app/dashboard/disc.json';
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
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { productFormSchema, ProductFormValues } from './types';

const defaultValues: Partial<ProductFormValues> = {
    name: '',
    description: '',
    categoryId: 'null',
    images: [{ value: '' }],
    variants: [], // Изначально пустой массив
};

export function ProductForm() {
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
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={categoryData[0].id}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category for product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categoryData.map(
                                                    (category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ),
                                                )}
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
                                                })
                                            }
                                        >
                                            Add Variant
                                        </Button>
                                    </div>
                                ) : (
                                    variantFields.map((field, index) => (
                                        <FormItem
                                            key={field.id}
                                            className="mb-4"
                                        >
                                            <div className="flex flex-row justify-between items-start">
                                                <div className="flex flex-col gap-2">
                                                    <FormLabel
                                                        className={cn(
                                                            index !== 0 &&
                                                                'sr-only',
                                                        )}
                                                    >
                                                        Variant
                                                    </FormLabel>
                                                    <FormDescription
                                                        className={cn(
                                                            index !== 0 &&
                                                                'sr-only',
                                                            index === 0 &&
                                                                'mb-2',
                                                        )}
                                                    >
                                                        Add variant details for
                                                        this product.
                                                    </FormDescription>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeVariant(index)
                                                    }
                                                    disabled={
                                                        variantFields.length ===
                                                        0
                                                    }
                                                    className="mt-2"
                                                >
                                                    ✖
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-6">
                                                    <FormLabel className="w-20">
                                                        SKU:
                                                    </FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name={`variants.${index}.sku`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Variant SKU"
                                                                        className="w-64"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <FormLabel className="w-20">
                                                        Price:
                                                    </FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name={`variants.${index}.price`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="Variant price"
                                                                        className="w-64"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <FormLabel className="w-20">
                                                        In Stock:
                                                    </FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name={`variants.${index}.inStock`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        step="1"
                                                                        placeholder="Variant in stock"
                                                                        className="w-64"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <FormLabel className="w-20">
                                                        Discount ID:
                                                    </FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name={`variants.${index}.discountId`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <Select
                                                                    onValueChange={
                                                                        field.onChange
                                                                    }
                                                                    defaultValue={
                                                                        'null'
                                                                    }
                                                                >
                                                                    <FormControl className="w-full">
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select a discount" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="null">
                                                                            Без
                                                                            скидки
                                                                        </SelectItem>
                                                                        {discountData.map(
                                                                            (
                                                                                category,
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        category.id
                                                                                    }
                                                                                    value={
                                                                                        category.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        category.name
                                                                                    }
                                                                                </SelectItem>
                                                                            ),
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormItem>
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
