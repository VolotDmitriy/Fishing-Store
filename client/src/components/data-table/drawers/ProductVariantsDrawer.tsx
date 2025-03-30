import { DiscountType, VariantType } from '@/components/data-table/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface VariantDrawerProps {
    item: VariantType;
    data: VariantType[];
    discountsData: DiscountType[];
}

export const VariantDrawer: React.FC<VariantDrawerProps> = ({
    item,
    discountsData,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="sku">Артикул</Label>
                <Input id="sku" defaultValue={item.sku} />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="price">Цена</Label>
                <Input id="price" defaultValue={item.price} />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="inStock">В наличии</Label>
                <Input id="inStock" defaultValue={item.inStock} />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="discountId">Скидка</Label>
                <Select defaultValue={item.discountId || 'null'}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите скидку" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="null">Без скидки</SelectItem>
                        {discountsData.map((discount) => (
                            <SelectItem
                                key={discount.id}
                                value={`${discount.id}`}
                            >
                                {discount.percentage}% {discount.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="attributes">Атрибуты</Label>
                {item.attributes.map((attr: any, index: number) => {
                    return (
                        <div key={index} className="flex flex-row gap-2">
                            <Label htmlFor={`param_attr_${index}`}>
                                {attr.typeId}:
                            </Label>
                            <Input
                                id={`param_attr_${index}`}
                                defaultValue={attr.value}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
