import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CategoryType, DiscountType, ProductType } from '../types';

interface ProductDrawerProps {
    item: ProductType;
    data: ProductType[];
    categoriesData: CategoryType[];
    discountsData: DiscountType[];
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
    item,
    data,
    categoriesData,
    discountsData,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="description">Описание</Label>
                <Input id="description" defaultValue={item.description} />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="categoryId">Категория</Label>
                <Select defaultValue={`${item.categoryId || 'null'}`}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        {categoriesData.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={`${category.id}`}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="images">Изображения</Label>
                <Input id="images" defaultValue={item.images.join(', ')} />
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
        </div>
    );
};
