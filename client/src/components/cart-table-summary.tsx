'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    getCart,
    removeFromCart,
    setCart,
    updateCartItem,
} from '@/utils/cartUtils';
import { checkDiscount, getProduct } from '@/utils/requests';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ProductType } from './data-table/types';

interface CartProductType extends ProductType {
    quantity: number;
    selectedVariantId: string;
}

interface CartProps {
    onPlaceOrder: (orderDetails: any) => void;
}

const Cart = forwardRef<{ reset: () => void }, CartProps>(
    ({ onPlaceOrder }, ref) => {
        const [cartItems, setCartItems] = useState<CartProductType[]>([]);
        const [isMounted, setIsMounted] = useState(false);
        const [showCouponInput, setShowCouponInput] = useState(false);
        const [couponCode, setCouponCode] = useState('');
        const [discountPercentage, setDiscountPercentage] = useState(0);
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [stockError, setStockError] = useState<string>('');

        useImperativeHandle(ref, () => ({
            reset: () => {
                setCartItems([]);
                setCouponCode('');
                setDiscountPercentage(0);
                setError('');
                setSuccessMessage('');
                setShowCouponInput(false);
                setStockError('');
                setCart([]);
            },
        }));

        useEffect(() => {
            const loadCart = async () => {
                const storedCart = getCart();
                const fullCartItems: CartProductType[] = [];

                for (const item of storedCart) {
                    try {
                        const product = await getProduct(item.id);
                        fullCartItems.push({
                            ...product,
                            quantity: item.quantity,
                            selectedVariantId: item.selectedVariantId,
                        });
                    } catch (err) {
                        console.error(
                            `Failed to fetch product ${item.id}:`,
                            err,
                        );
                        setError(
                            `Failed to load product ${item.name}. It may have been removed.`,
                        );
                        setTimeout(() => setError(''), 5000);
                    }
                }

                setCartItems(fullCartItems);
                setIsMounted(true);
            };

            loadCart();
        }, []);

        useEffect(() => {
            if (isMounted) {
                console.log('Saving cart:', cartItems);
                setCart(cartItems);
            }
        }, [cartItems, isMounted]);

        const updateQuantity = (
            id: string,
            delta: number,
            variantId: string,
        ) => {
            setCartItems((prevItems) =>
                prevItems
                    .map((item) => {
                        if (
                            item.id === id &&
                            item.selectedVariantId === variantId
                        ) {
                            const currentVariant = item.variants?.find(
                                (v) => v.id === variantId,
                            );
                            if (!currentVariant) {
                                setStockError('Selected variant not found');
                                setTimeout(() => setStockError(''), 3000);
                                return item;
                            }
                            const newQuantity = Math.max(
                                0,
                                item.quantity + delta,
                            );
                            return {
                                ...item,
                                quantity: newQuantity,
                            };
                        }
                        return item;
                    })
                    .filter((item) => item.quantity > 0),
            );

            try {
                const item = cartItems.find(
                    (i) => i.id === id && i.selectedVariantId === variantId,
                );
                if (item) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    updateCartItem(id, newQuantity, variantId);
                }
            } catch (error: any) {
                setStockError(error.message);
                setTimeout(() => setStockError(''), 3000);
                setCartItems(getCart());
            }
        };

        const handleRemoveItem = (id: string, variantId: string) => {
            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) =>
                        !(
                            item.id === id &&
                            item.selectedVariantId === variantId
                        ),
                ),
            );
            removeFromCart(id, variantId);
            setStockError('');
        };

        const handleApplyCoupon = async () => {
            if (!couponCode.trim()) {
                setError('Coupon code cannot be empty');
                setSuccessMessage('');
                return;
            }

            setIsLoading(true);
            try {
                const data = await checkDiscount(couponCode.trim());
                if (data.discount) {
                    setDiscountPercentage(data.discount.percentage);
                    setError('');
                    setSuccessMessage(
                        data.message || 'Coupon applied successfully',
                    );
                    setCouponCode('');
                } else {
                    setDiscountPercentage(0);
                    setError(data.message || 'Invalid coupon');
                    setSuccessMessage('');
                }
            } catch (error) {
                setDiscountPercentage(0);
                setError('Failed to apply coupon');
                setSuccessMessage('');
            } finally {
                setIsLoading(false);
            }
        };

        const handlePlaceOrderClick = () => {
            const cartData = {
                items: cartItems,
                subtotal,
                salesTax,
                discount,
                grandTotal,
                couponCode,
            };
            onPlaceOrder(cartData);
        };

        const subtotal = cartItems.reduce((sum, item) => {
            const variant = item.variants?.find(
                (v) => v.id === item.selectedVariantId,
            );
            return (
                sum + (variant ? parseFloat(variant.price) * item.quantity : 0)
            );
        }, 0);
        const salesTax = subtotal * 0.1;
        const discount = discountPercentage
            ? (subtotal + salesTax) * (discountPercentage / 100)
            : 0;
        const grandTotal = subtotal + salesTax - discount;

        const CartTable = () => (
            <div className="flex flex-col w-full gap-[10px]">
                {cartItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-[100px_1fr_150px_150px_150px] gap-4 border border-white px-5 py-2 pb-3 font-plus-jakarta-sans text-[20px] leading-[1]">
                            <div>Product</div>
                            <div></div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Total</div>
                        </div>
                        {cartItems.map((item) => {
                            const currentVariant = item.variants?.find(
                                (v) => v.id === item.selectedVariantId,
                            );
                            if (!currentVariant) {
                                return (
                                    <div
                                        key={`${item.id}-${item.selectedVariantId}`}
                                        className="grid grid-cols-[100px_1fr_150px_150px_150px] gap-4 items-center border border-white px-5 py-4 text-red-500"
                                    >
                                        <div>
                                            Error: Variant not found for{' '}
                                            {item.name}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={`${item.id}-${item.selectedVariantId}`}
                                    className="grid grid-cols-[100px_1fr_150px_150px_150px] gap-4 items-center border border-white px-5 py-4"
                                >
                                    <img
                                        src={
                                            item.images[0] || '/placeholder.jpg'
                                        }
                                        alt={item.name}
                                        className="w-full h-full max-w-20 max-h-20 object-cover rounded-[10px]"
                                    />
                                    <div>
                                        <p>
                                            {item.name} (
                                            {currentVariant.sku || 'N/A'})
                                        </p>
                                        <p
                                            className={`text-sm ${
                                                item.quantity ===
                                                currentVariant.inStock
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {item.quantity}/
                                            {currentVariant.inStock} units
                                        </p>
                                    </div>
                                    <div>
                                        {parseFloat(
                                            currentVariant.price,
                                        ).toFixed(2)}{' '}
                                        €
                                    </div>
                                    <div className="flex items-center outline outline-white rounded-[10px] w-fit leading-[1] gap-4 px-2.5">
                                        <Button
                                            variant="ghost_custom"
                                            size="icon"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    -1,
                                                    item.selectedVariantId,
                                                )
                                            }
                                            className={'w-fit'}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="font-jakarta text-[18px] leading-[1] mb-1 min-w-[26px] text-center">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="ghost_custom"
                                            size="icon"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    1,
                                                    item.selectedVariantId,
                                                )
                                            }
                                            className={'w-fit'}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 pr-4">
                                        <span className="flex-1">
                                            {(
                                                parseFloat(
                                                    currentVariant.price,
                                                ) * item.quantity
                                            ).toFixed(2)}{' '}
                                            €
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleRemoveItem(
                                                    item.id,
                                                    item.selectedVariantId,
                                                )
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                        {stockError && (
                            <div className="text-red-500 text-sm mt-2">
                                {stockError}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-gray-400 py-10 text-lg border border-white">
                        Your cart is empty 🛒
                    </div>
                )}
            </div>
        );

        const CartSummary = () => (
            <div className={'flex flex-col gap-[10px]'}>
                <div className="space-y-4 font-jakarta text-[18px] font-bold border border-white p-5 text-white">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{subtotal.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Sales Tax</span>
                        <span>{salesTax.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>{discount.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                        <span className="pt-2">Coupon code</span>
                        <div className="flex flex-col relative">
                            {!showCouponInput ? (
                                <button
                                    className="text-gray-400 underline hover:text-gray-300 cursor-pointer"
                                    onClick={() => setShowCouponInput(true)}
                                >
                                    Add coupon
                                </button>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(e.target.value)
                                            }
                                            placeholder="Enter code"
                                            className="w-[180px] h-8 text-sm"
                                            autoFocus
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="font-jakarta h-8 text-xs px-3"
                                            onClick={handleApplyCoupon}
                                            disabled={isLoading}
                                        >
                                            {isLoading
                                                ? 'Checking...'
                                                : 'Apply'}
                                        </Button>
                                    </div>
                                    {error && (
                                        <span className="absolute -top-5 left-0 text-red-500 text-xs">
                                            {error}
                                        </span>
                                    )}
                                    {successMessage && (
                                        <span className="absolute -top-5 left-0 text-green-400 text-xs">
                                            {successMessage}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pb-2 border-b border-gray-500">
                        <span>Grand total</span>
                        <span className="text-[22px]">
                            {grandTotal.toLocaleString()} €
                        </span>
                    </div>
                    <Button
                        onClick={handlePlaceOrderClick}
                        className="w-full bg-white text-black text-lg py-6 hover:bg-gray-200"
                    >
                        Place Order
                    </Button>
                </div>
                <div className="space-y-4 font-jakarta text-[18px] border border-white p-5 text-white">
                    <div className="border-b border-gray-500 h-fit pb-2">
                        <p className="min-h-10 mb-2.5 text-[20px]">
                            Looks like you forgot something!
                        </p>
                        <p className="min-h-10 text-gray-500 text-[16px]">
                            Check out the catalog—maybe you’ll find something
                            useful
                        </p>
                    </div>
                    <Link href="/catalog" passHref>
                        <Button
                            variant="link"
                            className="w-full font-bold text-[20px] font-jakarta h-auto text-white"
                        >
                            Return to Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );

        return (
            <div className="p-6 bg-black text-white min-h-fit">
                <h1 className="text-4xl font-bold mb-6">SHOPPING CART</h1>
                {isMounted ? (
                    <div className="flex gap-[10px]">
                        <div className="flex-1">
                            <CartTable />
                        </div>
                        <div className="w-[500px]">
                            <CartSummary />
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-10 text-lg border border-white rounded-lg">
                        Loading cart...
                    </div>
                )}
            </div>
        );
    },
);

export default Cart;
