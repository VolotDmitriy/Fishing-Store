import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { productSchema } from '@/components/data-table/types';
import axios from 'axios';

export default async function ProductsPage() {
    try {
        const response = await axios.get(
            'http://localhost:4200/product?full=true',
        );
        const products = productSchema.array().parse(response.data);

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
