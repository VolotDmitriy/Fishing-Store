import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { discountSchema } from '@/components/data-table/types';
import axios from 'axios';

export default async function DiscountsPage() {
    try {
        const response = await axios.get('http://localhost:4200/discount');
        const discounts = discountSchema.array().parse(response.data);

        return (
            <DataTableWrapper
                categories={[]}
                products={[]}
                discounts={discounts}
                type="discounts"
            />
        );
    } catch (error) {
        console.error('Ошибка загрузки скидок:', error);
        return <div>Ошибка загрузки данных</div>;
    }
}
