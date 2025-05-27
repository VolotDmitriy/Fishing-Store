import { ProductType } from '@/components/data-table/types';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    products?: ProductType[];
    isLoading: boolean;
}

export const CatalogProducts: React.FC<Props> = ({
    className,
    products,
    isLoading,
}) => {
    const ProductCardSkeleton: React.FC = () => {
        return (
            <div className="w-full max-w-[360px] min-w-[360px] max-h-[540px] min-h-[540px] mx-[10px] bg-black flex flex-col justify-between gap-[30px] px-[20px] pt-[20px] pb-[30px] my-[1px] rounded-[16px] border-solid border-white border-[1px] shadow-lg">
                <Skeleton className="w-full h-[340px] rounded-[12px] bg-gray-800" />
                <div className="flex flex-col gap-[18px]">
                    <Skeleton className="h-[24px] w-3/4 bg-gray-800" />
                    <Skeleton className="h-[30px] w-[120px] bg-gray-800" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-[24px] w-[100px] bg-gray-800" />
                    <Skeleton className="h-[40px] w-[120px] rounded-md bg-gray-800" />
                </div>
            </div>
        );
    };

    return (
        <div className={cn(className, 'w-full flex justify-center')}>
            <div className="flex flex-row flex-wrap gap-y-8 gap-x-3">
                {isLoading
                    ? Array.from({ length: 10 }).map((_, index) => (
                          <ProductCardSkeleton key={index} />
                      ))
                    : products &&
                      products.map((product) => (
                          <div className="max-w-[350px]" key={product.id}>
                              <ProductCard key={product.id} item={product} />
                          </div>
                      ))}
            </div>
        </div>
    );
};
