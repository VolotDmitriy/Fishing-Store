import { DiscountType } from '@/components/data-table/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DiscountDrawerProps {
    item: DiscountType;
    data: DiscountType[];
}

export const DiscountDrawer: React.FC<DiscountDrawerProps> = ({ item }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="percentage">Скидка (%)</Label>
                <Input
                    id="percentage"
                    defaultValue={item.percentage}
                    type="number"
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="startDate">Начало</Label>
                <Input
                    id="startDate"
                    defaultValue={item.startDate.slice(0, 16)}
                    type="datetime-local"
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="endDate">Конец</Label>
                <Input
                    id="endDate"
                    defaultValue={item.endDate.slice(0, 16)}
                    type="datetime-local"
                />
            </div>
        </div>
    );
};
