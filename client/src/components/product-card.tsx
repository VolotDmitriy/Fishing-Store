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
import React from 'react';

interface ProductCardProps {
    id: string;
    imageSrc: string;
    title: string;
    price: number;
    sizes: string[];
    weights: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    imageSrc,
    title,
    price,
    sizes,
    weights,
}) => {
    return (
        <div className="w-full max-w-[360px] max-h-fit bg-black text-white flex flex-col justify-between gap-[30px] px-[20px] pt-[20px] pb-[30px] mx-[10px] rounded-[16px] border-solid! border-white border-[1px] shadow-lg">
            <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-[12px] outline-solid! outline-white outline-[1px]">
                <img
                    src={imageSrc}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col gap-[18px]">
                <Link href={`/${id}`} passHref legacyBehavior>
                    <h3 className="text-lg overflow-hidden text-[20px] leading-[1] text-nowrap cursor-pointer">
                        {title}
                    </h3>
                </Link>
                <div className="flex flex-row gap-[20px]">
                    <Select>
                        <SelectTrigger className="w-fit h-[30px]! bg-black border-gray-600 text-white">
                            <SelectValue placeholder={sizes[0]} />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                            {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="min-w-[100px] h-[30px]! w-fit bg-black border-gray-600 text-white">
                            <SelectValue placeholder={weights[0]} />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                            {weights.map((weight) => (
                                <SelectItem key={weight} value={weight}>
                                    {weight}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-[24px] font-bold">{price}$</span>
                <Button
                    variant="custom_outline"
                    className="text-white border-white hover:bg-white hover:text-black"
                >
                    <ShoppingCart className="mr-[8px] h-5 w-5" />В корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
