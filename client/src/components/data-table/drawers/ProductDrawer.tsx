import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ProductType } from '../types';

interface ProductDrawerProps {
    item: ProductType;
    data: ProductType[];
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ item, data }) => {
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
                        {data.map((product) => (
                            <SelectItem
                                key={product.id}
                                value={`${product.id}`}
                            >
                                {product.name}
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
                <Input id="discountId" defaultValue={item.discountId || ''} />
            </div>
        </div>
    );
};
