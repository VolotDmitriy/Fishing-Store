import {
    CategoryType,
    CategoryTypeF,
    DiscountType,
    ProductType,
    VariantTypeType,
    productSchema,
} from '@/components/data-table/types';
import { DiscountResponse } from '@/utils/types';
import axios from 'axios';

type FetchCategoriesResponse<T extends boolean> = T extends true
    ? CategoryTypeF[]
    : CategoryType[];

export async function fetchCategories<T extends boolean>(
    full: T,
): Promise<FetchCategoriesResponse<T>> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/category?full=${full}`,
        );

        return response.data as FetchCategoriesResponse<T>;
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        throw error;
    }
}

export async function getProduct(id: string): Promise<ProductType> {
    if (!id) throw new Error('Product ID is required');

    const res = await fetch(`http://localhost:4200/product/${id}?full=true`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch product');

    const data = await res.json();
    return productSchema.parse(data);
}

export async function fetchCategoryById(full: boolean): Promise<CategoryType> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/category?full=${full}`,
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        throw error;
    }
}

export async function fetchProducts(full: boolean): Promise<ProductType[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/product?full=${full}`,
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw error;
    }
}

export async function fetchDiscounts(full: boolean): Promise<DiscountType[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/discount?full=${full}`,
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении скидок:', error);
        throw error;
    }
}

export async function fetchVariantTypes(
    full: boolean,
): Promise<VariantTypeType[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/product/type?full=${full}`,
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении типов вариантов:', error);
        throw error;
    }
}

export async function checkDiscount(code: string): Promise<DiscountResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/discount/check`,
            { code },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при проверке скидки:', error);
        throw error;
    }
}

export async function fetchSettlements(query: string): Promise<any[]> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery/location`,
            { query },
        );
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні населених пунктів:', error);
        throw error;
    }
}

export async function fetchWarehouses(
    settlementRef: string,
    warehouseType: 'warehouse' | 'postomat',
): Promise<any[]> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery/warehouse`,
            {
                settlementRef,
                warehouseType,
            },
        );
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні відділень:', error);
        throw error;
    }
}
