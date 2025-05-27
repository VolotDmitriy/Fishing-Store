'use client';

import { ProductType } from '@/components/data-table/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card';
import UniversalCarousel from '../universal-carousel';

const ProductCarousel: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ProductType[]>(
                    'http://localhost:4200/product?full=true',
                );
                if (res.status === 200) {
                    const sortedProducts = res.data.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                    );
                    const limitedProducts = sortedProducts.slice(0, 10);
                    setProducts(limitedProducts);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const renderSkeleton = () =>
        Array.from({ length: 4 }).map((_, index) => (
            <div
                key={index}
                className="w-full h-full flex justify-center mx-6 animate-pulse"
            >
                <div className="w-full h-[532px] bg-gray-500 rounded-md"></div>
            </div>
        ));

    return (
        <div className="w-full flex justify-center bg-[#242424]">
            <div
                className={
                    'w-full max-w-[1760px] flex flex-col items-center justify-center px-[20px]'
                }
            >
                <h2
                    className={
                        'font-brigend text-[44px] leading-[1] font-bold pt-[82px]'
                    }
                >
                    NEW ARRIVALS
                </h2>
                <UniversalCarousel itemsPerView={4}>
                    {isLoading
                        ? renderSkeleton()
                        : products.map((product) => (
                              <ProductCard key={product.id} item={product} />
                          ))}
                </UniversalCarousel>
            </div>
        </div>
    );
};

export default ProductCarousel;
