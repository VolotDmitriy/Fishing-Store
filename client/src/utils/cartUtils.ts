import { ProductType } from '@/components/data-table/types';

interface CartProductType extends ProductType {
    quantity: number;
    selectedVariantId: string;
}

const CART_KEY = 'shopping_cart';

const validateStock = (
    item: ProductType,
    quantity: number,
    variantId: string,
): { valid: boolean; message?: string } => {
    const variant = item.variants.find((v) => v.id === variantId);
    if (!variant) {
        return { valid: false, message: 'Selected variant not found' };
    }
    if (quantity > variant.inStock) {
        return {
            valid: false,
            message: `Cannot add ${quantity} of ${item.name}. Only ${variant.inStock} in stock.`,
        };
    }
    return { valid: true };
};

export const getCart = (): CartProductType[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const cart = localStorage.getItem(CART_KEY);
    try {
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
    }
};

export const setCart = (cart: CartProductType[]) => {
    if (typeof window !== 'undefined') {
        const serializedCart = cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            selectedVariantId: item.selectedVariantId,
            name: item.name,
            images: item.images,
            variants: item.variants.map((v) => ({
                id: v.id,
                sku: v.sku,
                price: v.price,
                inStock: v.inStock,
            })),
        }));
        localStorage.setItem(CART_KEY, JSON.stringify(serializedCart));
    }
};

export const addToCart = (
    item: ProductType,
    quantity: number = 1,
    variantId: string = item.variants[0].id,
) => {
    const cart = getCart();
    const validation = validateStock(item, quantity, variantId);
    if (!validation.valid) {
        throw new Error(validation.message || 'Invalid stock');
    }

    const existingItemIndex = cart.findIndex(
        (i) => i.id === item.id && i.selectedVariantId === variantId,
    );
    if (existingItemIndex >= 0) {
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        const reValidation = validateStock(item, newQuantity, variantId);
        if (!reValidation.valid) {
            throw new Error(reValidation.message || 'Exceeds stock');
        }
        cart[existingItemIndex].quantity = newQuantity;
    } else {
        cart.push({
            ...item,
            quantity,
            selectedVariantId: variantId,
        });
    }
    setCart(cart);
};

export const updateCartItem = (
    id: string,
    quantity: number,
    variantId: string,
) => {
    const cart = getCart();
    const itemIndex = cart.findIndex(
        (i) => i.id === id && i.selectedVariantId === variantId,
    );
    if (itemIndex >= 0) {
        const item = cart[itemIndex];
        const validation = validateStock(item, quantity, variantId);
        if (!validation.valid) {
            throw new Error(validation.message || 'Invalid stock');
        }
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.splice(itemIndex, 1);
        }
        setCart(cart);
    } else {
        throw new Error('Item not found in cart');
    }
};

export const removeFromCart = (id: string, variantId: string) => {
    const cart = getCart();
    const updatedCart = cart.filter(
        (i) => !(i.id === id && i.selectedVariantId === variantId),
    );
    setCart(updatedCart);
};
