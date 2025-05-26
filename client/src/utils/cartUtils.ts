import { CartItem } from '@/utils/types';

const CART_KEY = 'shopping_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const cart = localStorage.getItem(CART_KEY);
    console.log('cart', cart);
    return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
};

export const addToCart = (item: CartItem) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((i) => i.id === item.id);
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    setCart(cart);
};

export const updateCartItem = (id: string, quantity: number) => {
    const cart = getCart();
    const itemIndex = cart.findIndex((i) => i.id === id);
    if (itemIndex >= 0) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.splice(itemIndex, 1);
        }
        setCart(cart);
    }
};

export const removeFromCart = (id: string) => {
    const cart = getCart();
    const updatedCart = cart.filter((i) => i.id !== id);
    setCart(updatedCart);
};
