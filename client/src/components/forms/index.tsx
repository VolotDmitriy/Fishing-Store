'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryForm } from './category-form';
import { DiscountForm } from './discount-form';
import { ProductForm } from './product-form';
// import axios from 'axios';
// import React from 'react';

export function Forms() {
    // const [categories, setCategories] = React.useState([]);
    // const [products, setProducts] = React.useState([]);
    // const [discounts, setDiscounts] = React.useState([]);

    // React.useEffect(() => {
    //     try {
    //         (async () => {
    //             console.log('request!');
    //             const dataCategories = await axios
    //                 .get('http://localhost:4200/category')
    //                 .then((res) => res.data);
    //             setCategories(dataCategories);

    //             const dataProducts = await axios
    //                 .get('http://localhost:4200/product?full=true')
    //                 .then((res) => res.data);
    //             setProducts(dataProducts);

    //             const dataDiscounts = await axios
    //                 .get('http://localhost:4200/discount')
    //                 .then((res) => res.data);
    //             setDiscounts(dataDiscounts);
    //         })();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);

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
                <CategoryForm />
            </TabsContent>
            <TabsContent value="products">
                <ProductForm />
            </TabsContent>
            <TabsContent value="discounts">
                <DiscountForm />
            </TabsContent>
        </Tabs>
    );
}
