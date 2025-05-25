'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCart, setCart } from '@/utils/cartUtils';
import { CartItem } from '@/utils/types';
import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(getCart());
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Сохранение корзины:', cartItems);
        setCart(cartItems);
    }, [cartItems]);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: Math.max(0, item.quantity + delta),
                          }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const salesTax = subtotal * 0.1;
    const discount = isCouponApplied ? (subtotal + salesTax) * 0.1 : 0;
    const grandTotal = subtotal + salesTax - discount;

    const handleApplyCoupon = () => {
        if (couponCode.trim().toLowerCase() === 'save10') {
            setIsCouponApplied(true);
            setError('');
        } else {
            setIsCouponApplied(false);
            setError('Invalid coupon');
        }
    };

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
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-[100px_1fr_150px_150px_150px] gap-4 items-center border border-white px-5 py-4"
                        >
                            <img
                                src={item.imgURL}
                                alt={item.name}
                                className="w-full h-full max-w-20 max-h-20 object-cover rounded-[10px]"
                            />
                            <div>
                                <p>
                                    {item.name} ({item.variantSku})
                                </p>
                                <p className="text-sm text-gray-500">
                                    57,000.yn/wt
                                </p>
                            </div>
                            <div>{item.price} €</div>
                            <div className="flex items-center gap-2 outline outline-white rounded-[10px] w-fit leading-[1] gap-4 px-2.5">
                                <Button
                                    variant="ghost_custom"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, -1)}
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
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className={'w-fit'}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-end gap-2 pr-4">
                                <span className="flex-1">
                                    {item.price * item.quantity} €
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className="text-center text-gray-400 py-10 text-lg border border-white rounded-lg">
                    Ваша корзина пуста 🛒
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
                                    >
                                        Apply
                                    </Button>
                                </div>
                                {error && (
                                    <span className="absolute -top-5 left-0 text-red-500 text-xs">
                                        {error}
                                    </span>
                                )}
                                {isCouponApplied && (
                                    <span className="absolute -top-5 left-0 text-green-400 text-xs">
                                        Coupon applied
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
                <Button className="w-full bg-white text-black text-lg py-6 hover:bg-gray-200">
                    Place Order
                </Button>
            </div>
            <div className="space-y-4 font-jakarta text-[18px] border border-white p-5 text-white">
                <div className="border-b border-gray-500 h-fit pb-2">
                    <p className="min-h-10 mb-2.5 text-[20px]">
                        Looks like you forgot something!
                    </p>
                    <p className="min-h-10 text-gray-500 text-[16px]">
                        Check out the catalog—maybe you’ll find something useful
                    </p>
                </div>
                <Button
                    variant="link"
                    className="w-full font-bold text-[20px] font-jakarta h-auto text-white"
                >
                    Return to Shopping
                </Button>
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-black text-white min-h-fit">
            <h1 className="text-4xl font-bold mb-6">SHOPPING CART</h1>
            <div className="flex gap-[10px]">
                <div className="flex-1">
                    <CartTable />
                </div>
                <div className="w-[500px]">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default Cart;
