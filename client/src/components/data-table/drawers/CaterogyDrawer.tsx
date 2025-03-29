import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CategoryType } from '../types';

interface CategoryDrawerProps {
    item: CategoryType;
    data: CategoryType[];
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
    item,
    data,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Label htmlFor="name">Название</Label>
                <Input id="name" defaultValue={item.name} />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="parentId">Родительская категория</Label>
                <Select defaultValue={item.parentId || 'null'}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="null">Без родителя</SelectItem>
                        {data
                            .filter((i) => i.id !== item.id)
                            .map((i) => (
                                <SelectItem key={i.id} value={`${i.id}`}>
                                    {i.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
