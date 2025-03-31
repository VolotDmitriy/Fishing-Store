'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    fetchCategories,
    fetchDiscounts,
    fetchProducts,
} from '@/utils/requests';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { categoryColumns, discountColumns, productColumns } from './column-def';
import { TableView } from './table-view';
import { CategoryType, ColumnType, DiscountType, ProductType } from './types';

export function DataTable() {
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [products, setProducts] = React.useState<ProductType[]>([]);
    const [discounts, setDiscounts] = React.useState<DiscountType[]>([]);

    React.useEffect(() => {
        const loadCategories = async () => {
            try {
                const dataCategories = await fetchCategories();
                setCategories(dataCategories);
            } catch (error) {
                console.error('Не удалось загрузить категории:', error);
            }
        };

        const loadProducts = async () => {
            try {
                const dataProducts = await fetchProducts(true);
                setProducts(dataProducts);
            } catch (error) {
                console.error('Не удалось загрузить продукты:', error);
            }
        };

        const loadDiscount = async () => {
            try {
                const dataDiscounts = await fetchDiscounts();
                setDiscounts(dataDiscounts);
            } catch (error) {
                console.error('Не удалось загрузить скидки:', error);
            }
        };

        loadCategories();
        loadProducts();
        loadDiscount();
    }, []);

    return (
        <Tabs
            defaultValue="categories"
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <TabsList className="hidden @4xl/main:flex">
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="discounts">Discounts</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="categories">
                <TableView
                    data={categories}
                    columns={categoryColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
            <TabsContent value="products">
                <TableView
                    data={products}
                    columns={productColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
            <TabsContent value="discounts">
                <TableView
                    data={discounts}
                    columns={discountColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
        </Tabs>
    );
}
