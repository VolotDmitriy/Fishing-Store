import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { categorySchema } from '@/components/data-table/types';
import { fetchCategories } from '@/utils/requests';

export default async function CategoriesPage() {
    try {
        const responseData = await fetchCategories();
        const categories = categorySchema.array().parse(responseData);

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
