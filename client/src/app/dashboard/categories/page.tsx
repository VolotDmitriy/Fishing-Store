import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { categorySchema } from '@/components/data-table/types';
import axios from 'axios';

export default async function CategoriesPage() {
    try {
        const response = await axios.get('http://localhost:4200/category');
        const categories = categorySchema.array().parse(response.data);

        return (
            <DataTableWrapper
                categories={categories}
                products={[]}
                discounts={[]}
                type="categories"
            />
        );
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        return <div>Ошибка загрузки данных</div>;
    }
}
