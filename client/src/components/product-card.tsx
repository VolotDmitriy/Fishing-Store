'use client';

import { ProductType } from '@/components/data-table/types';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const images = [
    'Products/1.jpg',
    'Products/2.jpg',
    'Products/3.jpg',
    'Products/4.jpg',
];
interface ProductCardProps {
    item: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const [selectedSku, setSelectedSku] = useState<string | null>(null);

    useEffect(() => {
        if (item.variants.length > 0) {
            setSelectedSku(item.variants[0].sku);
        }
    }, [item]);

    const currentVariant = item.variants.find((v) => v.sku === selectedSku);

    return (
        <div className="w-full max-w-[360px] max-h-fit bg-black text-white flex flex-col justify-between gap-[30px] px-[20px] pt-[20px] pb-[30px] mx-[10px] rounded-[16px] border-solid! border-white border-[1px] shadow-lg">
            <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-[12px] outline-solid! outline-white outline-[1px]">
                <img
                    src={images[0]} // Затычка
                    alt={item.name}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col gap-[18px]">
                <h3 className="text-lg overflow-hidden text-[20px] leading-[1] whitespace-nowrap overflow-hidden text-ellipsis">
                    <Link href={`/${item.id}`} passHref legacyBehavior>
                        <a className="inline-block">{item.name}</a>
                    </Link>
                </h3>

                {item.variants.length > 0 && (
                    <Select
                        value={selectedSku || ''}
                        onValueChange={(value) => {
                            setSelectedSku(value);
                        }}
                    >
                        <SelectTrigger className="w-fit h-[30px]! bg-black border-gray-600 text-white cursor-pointer">
                            <SelectValue placeholder="Выберите вариант">
                                {selectedSku || item.variants[0].sku}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white max-h-[300px] overflow-y-auto">
                            {item.variants.map((variant) => (
                                <SelectItem
                                    key={variant.id}
                                    value={variant.sku}
                                    className="hover:bg-gray-800 cursor-pointer"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {variant.sku} (В наличии:{' '}
                                            {variant.inStock})
                                        </span>
                                        {variant.attributes?.length > 0 && (
                                            <div className="flex flex-row gap-[8px] text-sm text-gray-400">
                                                {variant.attributes.map(
                                                    (attr) => (
                                                        <span
                                                            key={attr.id}
                                                            className="block"
                                                        >
                                                            {attr.value}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-[24px] font-bold">
                    {currentVariant
                        ? `${currentVariant.price} $`
                        : 'Цена не указана'}
                </span>
                <Button
                    variant="custom_outline"
                    className="text-white border-white hover:bg-white hover:text-black cursor-pointer"
                >
                    <ShoppingCart className="mr-[8px] h-5 w-5" />В корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
