'use client';

import { CategoryTypeF, ProductType } from '@/components/data-table/types';
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
import { fetchCategories, fetchProducts } from '@/utils/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoadingOverlay } from '../loading-overlay';
import { ItemSelector } from './item-selector';
import { categoryFormSchema, CategoryFormValues } from './types';

const defaultValues: Partial<CategoryFormValues> = {
    name: '',
    parentId: 'null',
    products: [],
    childCategories: [],
};

export function CategoryForm() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryTypeF[]>([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const {
        fields: productFields,
        replace: replaceProducts,
        remove: removeProduct,
    } = useFieldArray({
        keyName: 'code',
        name: 'products',
        control: form.control,
    });

    const {
        fields: categoryFields,
        replace: replaceCategories,
        remove: removeCategory,
    } = useFieldArray({
        keyName: 'code',
        name: 'childCategories',
        control: form.control,
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [fetchedProducts, fetchedCategories] = await Promise.all([
                    fetchProducts(false),
                    fetchCategories(true),
                ]);
                setProducts(fetchedProducts);
                setCategories(fetchedCategories);
            } catch (error) {
                toast.error('Failed to load data' + error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    async function onSubmit(data: CategoryFormValues) {
        setCreateLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,

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

    const handleProductsSelected = (
        selectedProducts: { id: string; name: string }[],
    ) => {
        const selectedProductsMapped = selectedProducts.map((product) => ({
            productId: product.id,
            name: product.name,
        }));
        replaceProducts(selectedProductsMapped);
    };

    const handleCategoriesSelected = (
        selectedCategories: { id: string; name: string }[],
    ) => {
        const selectedCategoriesMapped = selectedCategories.map((category) => ({
            categoryId: category.id,
            name: category.name,
        }));
        replaceCategories(selectedCategoriesMapped);
    };

    const sortedProductFields = [...productFields].sort((a, b) =>
        a.productId.localeCompare(b.productId),
    );
    const sortedCategoryFields = [...categoryFields].sort((a, b) =>
        a.categoryId.localeCompare(b.categoryId),
    );

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
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Название категории"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите название категории
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Родительская категория
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue="null"
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите родительскую категорию" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="null">
                                                    Без родителя
                                                </SelectItem>
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
                                            Выберите родительскую категорию
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>Дочерние категории</FormLabel>
                                <div className="space-y-2">
                                    <ItemSelector
                                        onSelected={handleCategoriesSelected}
                                        initialSelected={categoryFields.map(
                                            (field) => ({
                                                id: field.categoryId,
                                                name: field.name,
                                            }),
                                        )}
                                        items={categories}
                                        itemType="category"
                                        triggerButtonText="Выбрать дочерние категории"
                                    />
                                    {sortedCategoryFields.length > 0 && (
                                        <div className="space-y-2">
                                            {sortedCategoryFields.map(
                                                (field, index) => (
                                                    <div
                                                        key={field.code}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span>
                                                            {field.categoryId} -{' '}
                                                            {field.name}
                                                        </span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeCategory(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            ✕
                                                        </Button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormDescription>
                                    Выберите дочерние категории для этой
                                    категории
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Товары</FormLabel>
                                <div className="space-y-2">
                                    <ItemSelector
                                        onSelected={handleProductsSelected}
                                        initialSelected={productFields.map(
                                            (field) => ({
                                                id: field.productId,
                                                name: field.name,
                                            }),
                                        )}
                                        items={products}
                                        itemType="products"
                                        triggerButtonText="Выбрать товары"
                                    />
                                    {sortedProductFields.length > 0 && (
                                        <div className="space-y-2">
                                            {sortedProductFields.map(
                                                (field, index) => (
                                                    <div
                                                        key={field.code}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span>
                                                            {field.productId} -{' '}
                                                            {field.name}
                                                        </span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeProduct(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            ✕
                                                        </Button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormDescription>
                                    Выберите товары для этой категории
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            <Button type="submit">Создать категорию</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
