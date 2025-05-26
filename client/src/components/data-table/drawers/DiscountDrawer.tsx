import { DiscountType } from '@/components/data-table/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface DiscountDrawerProps {
    item: DiscountType;
    data: DiscountType[];
    onChange: (data: {
        name: string;
        percentage: number;
        startDate: string;
        endDate: string;
    }) => void;
}

export const DiscountDrawer: React.FC<DiscountDrawerProps> = ({
    item,
    onChange,
}) => {
    const [name, setName] = React.useState(item.name);
    const [percentage, setPercentage] = React.useState(item.percentage);
    const [startDate, setStartDate] = React.useState(
        item.startDate.slice(0, 16),
    );
    const [endDate, setEndDate] = React.useState(item.endDate.slice(0, 16));

    React.useEffect(() => {
        onChange({ name, percentage, startDate, endDate });
    }, [name, percentage, startDate, endDate, onChange]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="discountName">Название скидки</Label>
                <Input
                    id="discountName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="percentage">Скидка (%)</Label>
                <Input
                    id="percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    type="number"
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="startDate">Начало</Label>
                <Input
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="datetime-local"
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="endDate">Конец</Label>
                <Input
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="datetime-local"
                />
            </div>
        </div>
    );
};
