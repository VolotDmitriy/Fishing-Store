import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { toast } from 'sonner';
import { ColumnType } from './types';

import categories from '@/app/dashboard/categ.json';

// Универсальный компонент TableCellViewer с Drawer
export function TableCellViewer({ item }: { item: ColumnType }) {
    const [name, setName] = React.useState(item.name || '');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Сохранение ${name}`,
            success: 'Сохранено!',
            error: 'Ошибка',
        });
    };
    const categoriesData = categories;
    const isCategory = 'parentId' in item;
    const isProduct =
        'description' in item &&
        'categoryId' in item &&
        'images' in item &&
        'discountId' in item;
    const isDiscount =
        'percentage' in item && 'startDate' in item && 'endDate' in item;

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="link"
                    className="text-foreground w-fit px-0 text-left"
                >
                    {item.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent aria-description="Drawer description">
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.name}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Общее поле для всех типов */}
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">Название</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Поля для категории */}
                        {isCategory && (
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="parentId">
                                    Родительский ID
                                </Label>
                                <Select
                                    defaultValue={`${item.parentId || 'null'}`}
                                >
                                    <SelectTrigger
                                        className="**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate w-full"
                                        size="sm"
                                        id={`parentId`}
                                    >
                                        <SelectValue placeholder="Выберите категорию" />
                                    </SelectTrigger>
                                    <SelectContent align="end">
                                        <SelectItem value={'null'}>
                                            {'Без родителя'}
                                        </SelectItem>
                                        {categoriesData
                                            .filter((i) => i.id !== item.id)
                                            .map((i) => (
                                                <SelectItem
                                                    key={i.id}
                                                    value={`${i.id}`}
                                                >
                                                    {i.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Поля для продукта */}
                        {isProduct && (
                            <>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="description">
                                        Описание
                                    </Label>
                                    <Input
                                        id="description"
                                        defaultValue={item.description}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="categoryId">
                                        Категория
                                    </Label>
                                    <Select
                                        defaultValue={`${item.categoryId || 'null'}`}
                                    >
                                        <SelectTrigger
                                            className="**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate w-full"
                                            size="sm"
                                            id={`categoryId`}
                                        >
                                            <SelectValue placeholder="Выберите категорию" />
                                        </SelectTrigger>
                                        <SelectContent align="end">
                                            {categoriesData.map((i) => (
                                                <SelectItem
                                                    key={i.id}
                                                    value={`${i.id}`}
                                                >
                                                    {i.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="images">Изображения</Label>
                                    <Input
                                        id="images"
                                        defaultValue={item.images.join(', ')}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="discountId">Скидка</Label>
                                    <Input
                                        id="discountId"
                                        defaultValue={item.discountId || ''}
                                    />
                                </div>
                            </>
                        )}

                        {/* Поля для скидки */}
                        {isDiscount && (
                            <>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="percentage">
                                        Скидка (%)
                                    </Label>
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
                                        defaultValue={item.startDate.slice(
                                            0,
                                            16,
                                        )}
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
                            </>
                        )}
                    </form>
                </div>
                <DrawerFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
