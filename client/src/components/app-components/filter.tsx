'use client';

import { CategoryTypeF } from '@/components/data-table/types';
import { cn } from '@/lib/utils';
import { slugify } from '@/utils/convert-cyrillic';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

interface Props {
    className?: string;
    categories: CategoryTypeF[];
    isLoading: boolean;
}

export const Filter: React.FC<Props> = ({
    className,
    categories,
    isLoading,
}) => {
    const pathname = usePathname();

    const [openCategories, setOpenCategories] = useState<{
        [key: string]: boolean;
    }>({});

    const currentSegment =
        pathname
            .split('/')
            .filter((segment) => segment !== '')
            .pop() || '';

    useEffect(() => {
        const initialOpenState = categories.reduce(
            (acc, category) => ({
                ...acc,
                [category.id]: true,
            }),
            {},
        );
        setOpenCategories(initialOpenState);
    }, [categories]);

    const toggleCategory = (categoryId: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const renderSkeleton = () => (
        <div className={cn(className, 'mt-10')}>
            <div className="w-full gap-8 flex flex-col overflow-auto scrollbar max-h-[calc(100vh-120px)] pr-3">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-8">
                        <div className="flex flex-row justify-between items-center">
                            <Skeleton className="h-6 w-48 rounded-md" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                        <div className="gap-4 flex flex-col">
                            {[...Array(2)].map((_, subIndex) => (
                                <div key={subIndex} className="pl-5">
                                    <Skeleton className="h-5 w-28 rounded-md" />
                                </div>
                            ))}
                        </div>
                        <Skeleton className="h-px w-full" />
                    </div>
                ))}
            </div>
        </div>
    );

    if (isLoading) {
        return renderSkeleton();
    }

    return (
        <div className={cn(className, 'mt-10')}>
            <div className="w-full gap-8 flex flex-col overflow-auto scrollbar max-h-[calc(100vh-120px)] pr-3">
                {categories
                    .filter((category) => category.parentId === null)
                    .map((category) => (
                        <div key={category.id} className="flex flex-col gap-8">
                            <div className="flex flex-row justify-between items-center">
                                <Link
                                    className={cn(
                                        'font-semibold text-xl text-white font-plus-jakarta-sans leading-[21px] whitespace-nowrap hover:text-[#38E078]',
                                        currentSegment ===
                                            slugify(category.name) &&
                                            'text-[#38E078]',
                                    )}
                                    href={`/catalog/${slugify(category.name)}`}
                                >
                                    {category.name}
                                </Link>
                                {!!category.children?.length && (
                                    <ChevronDown
                                        className={cn(
                                            'cursor-pointer transition-transform duration-300 ease-in-out',
                                            openCategories[category.id]
                                                ? 'rotate-180'
                                                : 'rotate-0',
                                        )}
                                        onClick={() =>
                                            toggleCategory(category.id)
                                        }
                                    />
                                )}
                            </div>

                            {!!category.children?.length && (
                                <>
                                    <div
                                        className={cn(
                                            'gap-4 flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
                                            openCategories[category.id]
                                                ? 'opacity-100 max-h-screen'
                                                : 'opacity-0 max-h-0',
                                        )}
                                    >
                                        {category.children?.map(
                                            (subCategory) => (
                                                <div
                                                    key={subCategory.id}
                                                    className={cn(
                                                        'pl-5',
                                                        className,
                                                    )}
                                                >
                                                    <div className="flex justify-between">
                                                        <Link
                                                            className={cn(
                                                                'font-light text-lg text-white font-plus-jakarta-sans leading-[21px] whitespace-nowrap hover:text-[#38E078]',
                                                                currentSegment ===
                                                                    slugify(
                                                                        subCategory.name,
                                                                    ) &&
                                                                    'text-[#38E078]',
                                                            )}
                                                            href={`/catalog/${slugify(subCategory.name)}`}
                                                        >
                                                            {subCategory.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="border-b-[1px] border-white"></div>
                        </div>
                    ))}
                { }
            </div>
        </div>
    );
};
