'use client';

import Footer from '@/components/app-components/footer';
import Header from '@/components/app-components/header';
import Cart from '@/components/cart-table-summary';
import OrderForm from '@/components/reg-order';

export default function CartPage() {
    return (
        <div className=" bg-[#141414]">
            <Header />
            <Cart />
            <OrderForm />
            <Footer />
        </div>
    );
}
