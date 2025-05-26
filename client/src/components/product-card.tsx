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
import { addToCart } from '@/utils/cartUtils';
import { CartItem } from '@/utils/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface ProductCardProps {
    item: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const [selectedSku, setSelectedSku] = useState<string | null>(null);
    const [isFlying, setIsFlying] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (item.variants.length > 0) {
            setSelectedSku(item.variants[0].sku);
        }
    }, [item]);

    const currentVariant = item.variants.find((v) => v.sku === selectedSku);

    const handleAddToCart = () => {
        if (currentVariant) {
            const cartItem: CartItem = {
                id: currentVariant.id,
                productId: item.id,
                name: item.name,
                variantSku: currentVariant.sku,
                imgURL: item.images[0],
                price: parseFloat(currentVariant.price),
                quantity: 1,
            };
            addToCart(cartItem);
            setIsFlying(true);
            setTimeout(() => {
                setIsFlying(false);
            }, 1000);
        }
    };

    const cartIcon = document.querySelector('.cart-icon');
    const cartRect = cartIcon?.getBoundingClientRect();
    const cardRect = cardRef.current?.getBoundingClientRect();
    let x = 0;
    let y = 0;
    if (cartRect && cardRect) {
        x = cartRect.left - cardRect.left - 200;
        y = cartRect.top - cardRect.top;
    }

    return (
        <div
            ref={cardRef}
            className="w-full max-w-[360px] h-fit min-h-[540px] bg-black text-white flex flex-col justify-between gap-[30px] px-[20px] pt-[20px] pb-[30px] mx-[10px] rounded-[16px] border-solid border-white border-[1px] shadow-lg relative"
        >
            <AnimatePresence>
                {isFlying && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[200px] z-50"
                        initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        animate={{
                            x: `${x}px`,
                            y: `${y}px`,
                            scale: 0.3,
                            opacity: 0,
                        }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="object-cover w-full h-full rounded-[12px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full h-full h-[340px] flex justify-center items-center overflow-hidden rounded-[12px] outline-solid outline-white outline-[1px]">
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="object-cover aspect-square w-full h-full"
                />
            </div>

            <div className="flex flex-col gap-[18px]">
                <h3 className="text-lg overflow-hidden text-[20px] leading-[1] whitespace-nowrap text-ellipsis">
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
                        <SelectTrigger className="w-fit h-[30px] bg-black border-gray-600 text-white cursor-pointer">
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
                        ? `${Number(currentVariant.price).toFixed(2)} $`
                        : 'Цена не указана'}
                </span>
                <Button
                    variant="custom_outline"
                    className="text-white border-white hover:bg-white hover:text-black cursor-pointer"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="mr-[8px] h-5 w-5" />В корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
