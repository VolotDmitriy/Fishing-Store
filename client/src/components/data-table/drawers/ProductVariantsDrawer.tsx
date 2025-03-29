import { VariantType } from '@/components/data-table/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VariantDrawerProps {
    item: VariantType;
    data: VariantType[];
}

export const VariantDrawer: React.FC<VariantDrawerProps> = ({ item }) => {
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
                <Input
                    id="discountId"
                    defaultValue={item.discountId || 'Нет'}
                />
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
