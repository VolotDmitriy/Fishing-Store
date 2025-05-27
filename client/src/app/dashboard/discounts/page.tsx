import DataTableWrapper from '@/components/data-table/data-table-wrapper';
import { discountSchema } from '@/components/data-table/types';
import { fetchDiscounts } from '@/utils/requests';

export default async function DiscountsPage() {
    try {
        const responseData = await fetchDiscounts(false);
        const discounts = discountSchema.array().parse(responseData);

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
