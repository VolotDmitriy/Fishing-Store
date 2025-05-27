import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { CategoryType, DiscountType, ProductType } from '../types';

interface ProductDrawerProps {
    item: ProductType;
    data: ProductType[];
    categoriesData: CategoryType[];
    discountsData: DiscountType[];
    onChange: (data: {
        name: string;
        description: string | undefined;
        categoryId: string | null;
        images: string[];
        discountId: string | null;
    }) => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
    item,
    data,
    categoriesData,
    discountsData,
    onChange,
}) => {
    const [name, setName] = React.useState(item.name);
    const [description, setDescription] = React.useState(item.description);
    const [categoryId, setCategoryId] = React.useState<string | null>(
        item.categoryId || 'null',
    );
    const [images, setImages] = React.useState(item.images.join(', '));
    const [discountId, setDiscountId] = React.useState<string | null>(
        item.discountId || 'null',
    );

    React.useEffect(() => {
        onChange({
            name,
            description,
            categoryId: categoryId === 'null' ? null : categoryId,
            images: images.split(',').map((img) => img.trim()),
            discountId: discountId === 'null' ? null : discountId,
        });
    }, [name, description, categoryId, images, discountId, onChange]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="name">Название</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="description">Описание</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="categoryId">Категория</Label>
                <Select
                    value={categoryId || 'null'}
                    onValueChange={(value) => setCategoryId(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="null">Без категории</SelectItem>
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
                <Input
                    id="images"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="discountId">Скидка</Label>
                <Select
                    value={discountId || 'null'}
                    onValueChange={(value) => setDiscountId(value)}
                >
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
