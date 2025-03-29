import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { productSchema } from '@/components/data-table/types';
import { fetchProducts } from '@/utils/requests';

export default async function ProductsPage() {
    try {
        const responseData = await fetchProducts();
        const products = productSchema.array().parse(responseData);

        return (
            <DataTableWrapper
                categories={[]}
                products={products}
                discounts={[]}
                type="products"
            />
        );
    } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
        return <div>Ошибка загрузки данных</div>;
    }
}
