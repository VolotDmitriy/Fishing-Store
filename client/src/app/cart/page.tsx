'use client';

import Footer from '@/components/app-components/footer';
import Header from '@/components/app-components/header';
import Cart from '@/components/cart-table-summary';
import OrderForm from '@/components/reg-order';
import { CartItem, DeliveryMethod, LocationData } from '@/utils/types';
import { useRef } from 'react';

interface OrderData {
    firstName: string;
    secondName: string;
    phone: string;
    email: string;
    comment: string;
    location: LocationData;
    deliveryMethod: DeliveryMethod;
    selectedDeliveryPoint: string;
}

interface CartData {
    items: CartItem[]; // Assuming CartItem is defined in '@/utils/types'
    subtotal: number;
    salesTax: number;
    discount: number;
    grandTotal: number;
    couponCode: string;
}

export default function CartPage() {
    const orderFormRef = useRef<{
        getOrderData: () => OrderData;
        reset: () => void;
    }>(null);
    const cartRef = useRef<{ reset: () => void }>(null);

    const handlePlaceOrder = (cartData: CartData): void => {
        if (orderFormRef.current && cartRef.current) {
            const orderData = orderFormRef.current.getOrderData();
            const fullOrder = {
                cart: cartData,
                order: orderData,
            };
            localStorage.setItem('order', JSON.stringify(fullOrder));
            console.log('Order saved to localStorage:', fullOrder);

            // Сбрасываем состояние
            orderFormRef.current.reset();
            cartRef.current.reset();
        } else {
            console.error('Refs not set');
        }
    };

    return (
        <div className="bg-[#141414]">
            <Header />
            <Cart ref={cartRef} onPlaceOrder={handlePlaceOrder} />
            <OrderForm ref={orderFormRef} />
            <Footer />
        </div>
    );
}
