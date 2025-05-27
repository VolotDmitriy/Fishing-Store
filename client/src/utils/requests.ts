import {
    CategoryType,
    DiscountType,
    ProductType,
} from '@/components/data-table/types';
import axios from 'axios';

export async function fetchCategories(full: boolean): Promise<CategoryType[]> {
    try {
        const response = await axios.get(
            `http://localhost:4200/category?full=${full}`,
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
            `http://localhost:4200/product?full=${full}`,
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
            `http://localhost:4200/discount?full=${full}`,
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении скидок:', error);
        throw error;
    }
}
