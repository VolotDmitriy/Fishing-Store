'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColumnDef } from '@tanstack/react-table';
import { categoryColumns, discountColumns, productColumns } from './column-def';
import { TableView } from './table-view';
// import { ColumnType, DataTableProps } from './types';
import axios from 'axios';
import React from 'react';
import { ColumnType } from './types';

export function DataTable() {
    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [discounts, setDiscounts] = React.useState([]);

    React.useEffect(() => {
        try {
            (async () => {
                console.log('request!');
                const dataCategories = await axios
                    .get('http://localhost:4200/category')
                    .then((res) => res.data);
                setCategories(dataCategories);

                const dataProducts = await axios
                    .get('http://localhost:4200/product')
                    .then((res) => res.data);
                setProducts(dataProducts);

                const dataDiscounts = await axios
                    .get('http://localhost:4200/discount')
                    .then((res) => res.data);
                setDiscounts(dataDiscounts);
            })();
        } catch (error) {
            console.error(error);
        }
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
                {/* Кнопки Customize Columns и Add Item перенесены внутрь TableView */}
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
