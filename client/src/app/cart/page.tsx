'use client';

import Cart from '@/components/cart-table-summary';
import OrderForm from '@/components/reg-order';

export default function CartPage() {
    return (
        <div className=" bg-[#141414]">
            <Cart />
            <OrderForm />
        </div>
    );
}
