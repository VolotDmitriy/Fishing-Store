'use client';

import { CatalogProducts } from '@/components/app-components/catalog-products';
import { Filter } from '@/components/app-components/filter';
import { CategoryTypeF, ProductType } from '@/components/data-table/types';
import { cn } from '@/lib/utils';
import { fetchCategories } from '@/utils/requests';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    className?: string;
    category?: CategoryTypeF;
}

export const CatalogComponents: React.FC<Props> = ({ className, category }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<CategoryTypeF[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [fetchedCategories] = await Promise.all([
                    fetchCategories(true),
                ]);
                setCategories(fetchedCategories);
            } catch (error) {
                toast.error('Failed to load data' + error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const products: ProductType[] = category
        ? category.parentId !== null
            ? category.products || []
            : [
                  ...(category.products || []),
                  ...(category.children?.flatMap((child) =>
                      categories
                          .filter((cat) => cat.id === child.id)
                          .flatMap((cat) => cat.products || []),
                  ) || []),
              ]
        : categories.flatMap((cat) => cat.products || []);

    return (
        <div className={cn(className, 'flex flex-row my-10')}>
            <Filter
                className="w-[290px]"
                categories={categories}
                isLoading={isLoading}
            />
            <CatalogProducts products={products} />
        </div>
    );
};
