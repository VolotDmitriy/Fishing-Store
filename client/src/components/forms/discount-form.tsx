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
import { fetchProducts } from '@/utils/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePickerWithRange } from '../data-range-picker';
import { DiscountFormValues, discountFormSchema } from './types';

const defaultValues: Partial<DiscountFormValues> = {
    name: '',
    percentage: 0,
    date: { from: new Date(), to: new Date() },
    // startDate: null,
    // endDate: null,
    products: [],
    variants: [],
};

export function DiscountForm() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<DiscountFormValues>({
        resolver: zodResolver(discountFormSchema),
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

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [fetchedProducts] = await Promise.all([
                    fetchProducts(false),
                ]);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    function onSubmit(data: DiscountFormValues) {
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

    const handleProductsSelected = (
        selectedProducts: { id: string; name: string }[],
    ) => {
        const selectedProductsMapped = selectedProducts.map((product) => ({
            productId: product.id,
            name: product.name,
        }));
        replaceProducts(selectedProductsMapped);
    };

    // const sortedProductFields = [...productFields].sort((a, b) =>
    //     a.productId.localeCompare(b.productId),
    // );
    // const sortedCategoryFields = [...categoryFields].sort((a, b) =>
    //     a.categoryId.localeCompare(b.categoryId),
    // );

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
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Название скидки"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите название скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Размер</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Размер скидки"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите размер скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Размер</FormLabel>
                                        <FormControl>
                                            <DatePickerWithRange
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите размер скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Создать скидку</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
