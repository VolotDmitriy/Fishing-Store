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
import { CategoryType } from '../types';

interface CategoryDrawerProps {
    item: CategoryType;
    data: CategoryType[];
    onChange: (data: { name: string; parentId: string }) => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
    item,
    data,
    onChange,
}) => {
    const [name, setName] = React.useState(item.name);
    const [parentId, setParentId] = React.useState<string>(
        item.parentId || 'null',
    );

    React.useEffect(() => {
        onChange({ name, parentId });
    }, [name, parentId, onChange]);

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
                <Label htmlFor="parentId">Родительская категория</Label>
                <Select
                    value={parentId}
                    onValueChange={(value) => setParentId(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value={'null'}>Без родителя</SelectItem>
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
