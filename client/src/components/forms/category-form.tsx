'use client';

import { ProductType } from '@/components/data-table/types';
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
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ProductSelector } from './ProductSelector';
import {
    categoryFormSchema,
    CategoryFormValues,
    SelectedProduct,
} from './types';

const defaultValues: Partial<CategoryFormValues> = {
    name: '',
    parentId: '',
    products: [],
};

async function fetchProducts(): Promise<ProductType[]> {
    try {
        const response = await axios.get(
            'http://localhost:4200/product?full=false',
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw error;
    }
}

export function CategoryForm() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const { fields, replace, remove } = useFieldArray({
        name: 'products',
        control: form.control,
    });

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    function onSubmit(data: CategoryFormValues) {
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

    const handleProductsSelected = (selectedProducts: SelectedProduct[]) => {
        replace(selectedProducts);
    };

    const sortedFields = [...fields].sort((a, b) =>
        a.productId.localeCompare(b.productId),
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
                    Loading products...
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
                                                placeholder="Category name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter category name
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
                                        <FormLabel>Parent</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={'null'}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category parent" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="null">
                                                    Без родителя
                                                </SelectItem>
                                                {products.map((product) => (
                                                    <SelectItem
                                                        key={product.id}
                                                        value={product.id}
                                                    >
                                                        {product.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Please select a category parent
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>Products</FormLabel>
                                <div className="space-y-2">
                                    <ProductSelector
                                        onProductsSelected={
                                            handleProductsSelected
                                        }
                                        initialSelected={fields.map(
                                            (field) => ({
                                                productId: field.productId,
                                                name: field.name,
                                            }),
                                        )}
                                        products={products}
                                    />
                                    {sortedFields.length > 0 && (
                                        <div className="space-y-2">
                                            {sortedFields.map(
                                                (field, index) => (
                                                    <div
                                                        key={field.id}
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
                                                                remove(index)
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
                                    Select products for this category
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            <Button type="submit">Update profile</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
