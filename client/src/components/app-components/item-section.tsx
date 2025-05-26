'use client';

import {
    productSchema,
    ProductType,
    VariantTypeType,
} from '@/components/data-table/types';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { addToCart } from '@/utils/cartUtils';
import { fetchVariantTypes } from '@/utils/requests';
import { CartItem } from '@/utils/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function getProduct(id: string): Promise<ProductType> {
    if (!id) throw new Error('Product ID is required');

    const res = await fetch(`http://localhost:4200/product/${id}?full=true`);
    if (!res.ok) throw new Error('Failed to fetch product');

    const data = await res.json();
    return productSchema.parse(data);
}

interface ItemSectionProps {
    id: string;
}

function ItemSection({ id }: ItemSectionProps) {
    const [selectedVariantId, setSelectedVariantId] = useState<string>('');
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [typeMap, setTypeMap] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        const loadData = async () => {
            try {
                const [productData, typeData] = await Promise.all([
                    getProduct(id),
                    fetchVariantTypes(false),
                ]);

                setProduct(productData);
                if (productData.variants?.length > 0) {
                    setSelectedVariantId(productData.variants[0].id);
                }

                const map = new Map<string, string>();
                typeData.forEach((type: VariantTypeType) => {
                    map.set(type.id, type.name);
                });
                setTypeMap(map);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const selectedVariant =
        product?.variants?.find((v) => v.id === selectedVariantId) ||
        product?.variants?.[0];
    const maxQuantity = selectedVariant?.inStock || 1;
    const unitPrice = selectedVariant?.price
        ? parseFloat(selectedVariant.price)
        : 0;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (product && selectedVariant) {
            const cartItem: CartItem = {
                id: selectedVariant.id,
                name: `${product.name} - ${selectedVariant.sku}`,
                imgURL: product.images?.[0] || '/default-image.jpg',
                price: parseFloat(selectedVariant.price),
                quantity: quantity,
                productId: product.id,
                variantSku: selectedVariant.sku,
            };
            addToCart(cartItem);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!product) return <div>Товар не найден</div>;

    const price = selectedVariant?.price
        ? parseFloat(selectedVariant.price).toFixed(2)
        : '0.00';

    try {
        return (
            <div className="w-full flex justify-center px-[100px]">
                <section className="w-full max-w-[1920px] flex flex-col gap-[50px]">
                    <div className="w-full flex flex-row items-end pt-[60px]">
                        <h2 className="text-white font-brigends-expanded text-[32px] font-bold leading-[1] flex items-end">
                            Shopping cart
                        </h2>
                    </div>

                    <div className="w-full flex flex-row justify-between gap-[30px]">
                        <div className="w-full max-w-[1080px] min-w-[376px] h-full flex flex-col items-start gap-[20px]">
                            <div className="w-full flex flex-row items-start gap-[20px] overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt="Additional Photo 1"
                                    width={200}
                                    height={220}
                                    className="w-full max-w-[800px] object-cover"
                                />
                                {product.images &&
                                    product.images.length > 1 && (
                                        <div className="w-full max-w-[250px] h-full flex items-start overflow-hidden relative">
                                            <div className="w-full min-w-[100px] h-full flex flex-col gap-[20px] overflow-y-auto absolute inset-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                                {product.images
                                                    .slice(1)
                                                    .map((image, index) => (
                                                        <Image
                                                            key={`additional-photo-${index}`}
                                                            src={image}
                                                            alt={`Additional Photo ${index + 1}`}
                                                            width={200}
                                                            height={220}
                                                            className="w-full object-cover"
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                            <div className="w-full flex flex-col items-start py-[20px] gap-[20px] box-border">
                                <div className="w-full flex flex-col justify-center items-start px-[20px] pb-[10px] border-b-4 border-[#474747]">
                                    <span className="text-white font-plus-jakarta-sans font-medium text-[24px] leading-[1] flex">
                                        Description
                                    </span>
                                </div>
                                <div className="w-full flex flex-col items-start px-5">
                                    <p className="text-white font-plus-jakarta-sans font-medium text-[18px] flex items-center text-justify">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-[780px] h-full flex flex-col gap-[20px]">
                            <div className="w-full flex flex-col px-[20px] py-[16px] gap-[20px] border border-white rounded box-border">
                                <div className="w-full flex flex-col justify-center items-start pb-[10px] gap-[10px] border-b-4 border-[#4B4B4B] box-border">
                                    <span className="text-white font-plus-jakarta-sans font-medium text-[24px] flex items-center">
                                        {product.name}
                                    </span>
                                    <span className="w-full text-[#474747] font-plus-jakarta-sans font-medium text-[16px] flex items-center">
                                        {selectedVariant?.sku}
                                    </span>
                                </div>
                                <div className="w-full flex flex-row items-start gap-[10px] leading-[1]">
                                    {maxQuantity > 0 ? (
                                        <div className="w-full max-w-[160px] h-full bg-[#CFFFE5] border border-[#009739] rounded-[16px] flex justify-center items-center">
                                            <span className="text-[#009739] font-plus-jakarta-sans text-[16px] py-[8px]">
                                                In stock: {maxQuantity}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="w-full max-w-[160px] h-full bg-[#F8D7DA] border border-[#FD3F2B] rounded-[16px] flex justify-center items-center">
                                            <span className="text-[#FD3F2B] font-plus-jakarta-sans text-[16px] py-[8px]">
                                                Out of stock
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full flex flex-row items-start gap-[40px]">
                                    <div className="h-full flex flex-row items-center gap-[24px]">
                                        <span className="text-white font-plus-jakarta-sans font-medium text-[18px] flex items-center">
                                            Quantity
                                        </span>
                                        <div className=" h-full border border-white rounded-[10px] flex flex-row justify-center items-center px-[10px] gap-[16px] box-border">
                                            <button
                                                className={`text-white ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                onClick={handleDecrease}
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="text-white">
                                                {quantity}
                                            </span>
                                            <button
                                                className={`text-white ${quantity >= maxQuantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                onClick={handleIncrease}
                                                disabled={
                                                    quantity >= maxQuantity
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-full flex flex-row items-center gap-[24px]">
                                        <span className="w-[63px] h-[13px] text-white font-plus-jakarta-sans font-medium text-[18px] flex items-center">
                                            Variants
                                        </span>
                                        <div className="w-full max-w-[300px]">
                                            <Select
                                                value={selectedVariantId}
                                                onValueChange={(value) => {
                                                    setSelectedVariantId(value);
                                                    setQuantity(1);
                                                }}
                                            >
                                                <SelectTrigger className="h-[40px] bg-black border border-white rounded-[10px] text-white">
                                                    <SelectValue placeholder="Выберите вариант">
                                                        {selectedVariant?.sku ||
                                                            product
                                                                .variants?.[0]
                                                                ?.sku}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="bg-black text-white max-h-[300px] overflow-y-auto">
                                                    {product.variants?.map(
                                                        (variant) => (
                                                            <SelectItem
                                                                key={variant.id}
                                                                value={
                                                                    variant.id
                                                                }
                                                                className="hover:bg-gray-800"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium">
                                                                        {
                                                                            variant.sku
                                                                        }{' '}
                                                                        (В
                                                                        наличии:{' '}
                                                                        {
                                                                            variant.inStock
                                                                        }
                                                                        )
                                                                    </span>
                                                                    {variant
                                                                        .attributes
                                                                        ?.length >
                                                                        0 && (
                                                                        <div className="flex flex-row gap-[8px] text-sm text-gray-400">
                                                                            {variant.attributes.map(
                                                                                (
                                                                                    attr,
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            attr.id
                                                                                        }
                                                                                        className="block"
                                                                                    >
                                                                                        {typeMap.get(
                                                                                            attr.typeId,
                                                                                        ) ||
                                                                                            attr.typeId}

                                                                                        :{' '}
                                                                                        {
                                                                                            attr.value
                                                                                        }
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-row items-center rounded">
                                    <span className="text-white font-plus-jakarta-sans font-medium text-[28px]">
                                        Total: ${totalPrice}
                                    </span>
                                </div>
                                <div className="w-full h-[50px] flex flex-row justify-start items-center gap-[20px]">
                                    <Link
                                        href="/cart"
                                        className="w-full max-w-[300px] h-full"
                                    >
                                        <button className="w-full max-w-[300px] h-full bg-white border-[2px] border-black rounded-[4px] text-black font-plus-jakarta-sans font-medium text-[20px] cursor-pointer hover:brightness-80 hover:border-[0px] active:brightness-80 active:opacity-80 transition-all duration-100">
                                            Купить
                                        </button>
                                    </Link>
                                    <div className="h-full flex flex-row justify-center items-center">
                                        <Button
                                            variant="custom_outline"
                                            className="w-full h-full text-white text-[14px] border-white cursor-pointer hover:bg-white hover:text-black active:brightness-80 active:opacity-80 transition-all duration-300"
                                            onClick={handleAddToCart}
                                        >
                                            <ShoppingCart className="mr-[8px] h-5 w-5" />
                                            Добавить в корзину
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start px-[20px] py-[20px] gap-[20px] border border-white box-border">
                                <div className="w-full flex flex-col justify-center items-start px-[10px] py-[10px] border-b-4 border-[#474747]">
                                    <span className="w-full text-white font-plus-jakarta-sans font-medium text-[24px] leading-[1] flex items-center">
                                        Specifications
                                    </span>
                                </div>
                                <div className="w-full flex flex-col items-start text-[16px] leading-[1] font-brigend">
                                    {product.attributes.map((item, index) => (
                                        <div
                                            key={`product-attr-${item.id}`}
                                            className={`w-full flex flex-row justify-center items-center px-[12px] py-[12px] rounded-[6px] gap-[10px] ${
                                                index % 2 === 0
                                                    ? 'bg-[#252525]'
                                                    : 'bg-[#141414]'
                                            }`}
                                        >
                                            <span className="w-full justify-start text-white flex items-center">
                                                {typeMap.get(item.typeId) ||
                                                    item.typeId}
                                            </span>
                                            <span className="w-full justify-end text-white flex items-center text-right">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                    {selectedVariant &&
                                        selectedVariant.attributes?.length >
                                            0 &&
                                        selectedVariant.attributes.map(
                                            (attr, index) => (
                                                <div
                                                    key={`variant-attr-${attr.id}`}
                                                    className={`w-full flex flex-row justify-center items-center px-[12px] py-[12px] rounded-[6px] gap-[10px] ${
                                                        (index +
                                                            product.attributes
                                                                .length) %
                                                            2 ===
                                                        0
                                                            ? 'bg-[#252525]'
                                                            : 'bg-[#141414]'
                                                    }`}
                                                >
                                                    <span className="w-full justify-start text-white flex items-center">
                                                        {typeMap.get(
                                                            attr.typeId,
                                                        ) || attr.typeId}
                                                    </span>
                                                    <span className="w-full justify-end text-white flex items-center text-right">
                                                        {attr.value}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('Error loading product:', error);
        return (
            <div className="text-red-500">Ошибка загрузки данных товара</div>
        );
    }
}

export default ItemSection;
