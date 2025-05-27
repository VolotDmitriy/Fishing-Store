'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';

interface SelectableItem {
    id: string;
    name: string;
}

interface ItemSelectorProps<T extends SelectableItem> {
    onSelected: (selectedItems: T[]) => void;
    initialSelected?: T[];
    triggerButtonText?: string;
    items: T[];
    itemType: string;
}

export function ItemSelector<T extends SelectableItem>({
    onSelected,
    initialSelected = [],
    triggerButtonText = 'Выбрать элементы',
    items,
    itemType,
}: ItemSelectorProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<T[]>(initialSelected);

    useEffect(() => {
        if (isOpen) {
            setSelectedItems(initialSelected);
        }
    }, [isOpen, initialSelected]);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSelect = (item: T) => {
        setSelectedItems((prev) => {
            const exists = prev.some((p) => p.id === item.id);
            if (exists) {
                return prev.filter((p) => p.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleSubmit = () => {
        onSelected(selectedItems);
        setIsOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setSearchTerm('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerButtonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Выберите {itemType}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder={`Поиск ${itemType}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ScrollArea className="h-[500px] w-full rounded-md border">
                        <div className="p-4">
                            {filteredItems.length === 0 ? (
                                <div className="text-center text-muted-foreground">
                                    {searchTerm
                                        ? `${itemType} не найдены`
                                        : `Список ${itemType} пуст`}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedItems.some(
                                                    (p) => p.id === item.id,
                                                )}
                                                onCheckedChange={() =>
                                                    handleSelect(item)
                                                }
                                            />
                                            <label
                                                htmlFor={item.id}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.id} - {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Выбрано: {selectedItems.length}
                        </span>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={selectedItems.length === 0}
                            >
                                Добавить
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
