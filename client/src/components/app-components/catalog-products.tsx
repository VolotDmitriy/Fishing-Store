import { ProductType } from '@/components/data-table/types';
import ProductCard from '@/components/product-card';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    products?: ProductType[];
}

export const CatalogProducts: React.FC<Props> = ({ className, products }) => {
    return (
        <div className={cn(className, 'w-full flex justify-center')}>
            <div className="flex flex-row flex-wrap gap-y-8 gap-x-3">
                {products &&
                    products.map((product) => (
                        <div className='max-w-[350px]' key={product.id}>
                            <ProductCard key={product.id} item={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};
