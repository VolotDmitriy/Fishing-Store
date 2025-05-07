import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

interface ProductCardProps {
    imageSrc: string;
    title: string;
    price: number;
    sizes: string[];
    weights: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
    imageSrc,
    title,
    price,
    sizes,
    weights,
}) => {
    return (
        <div className="bg-black text-white px-5 py-5 pb-[30px] mx-2.5 rounded-[16px] border-solid! border-white border-[1px] w-full min-w-fit flex flex-col justify-between shadow-lg">
            <div className="w-full h-64 overflow-hidden rounded-[12px] outline-solid! outline-white outline-[1px] mb-4">
                <img
                    src={imageSrc}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>

            <h3 className="text-lg overflow-hidden text-ellipsis text-nowrap mb-[18px]">
                {title}
            </h3>

            <div className="flex gap-2 mb-4">
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
                    <SelectTrigger className="min-w-[100px] h-[30px]! w-fit bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder={weights[0]} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 text-white">
                        {weights.map((weight) => (
                            <SelectItem key={weight} value={weight}>
                                {weight}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold">{price}$</span>
                <Button
                    variant="custom_outline"
                    className="text-white border-white hover:bg-white hover:text-black"
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />В корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
