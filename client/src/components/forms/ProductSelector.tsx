'use client';

import { ProductType } from '@/components/data-table/types';
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
import { SelectedProduct } from './types';

interface ProductSelectorProps {
    onProductsSelected: (selectedProducts: SelectedProduct[]) => void;
    initialSelected?: SelectedProduct[];
    triggerButtonText?: string;
    products: ProductType[];
}

export function ProductSelector({
    onProductsSelected,
    initialSelected = [],
    triggerButtonText = 'Выбрать товары',
    products,
}: ProductSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] =
        useState<SelectedProduct[]>(initialSelected);

    useEffect(() => {
        if (isOpen) {
            setSelectedProducts(initialSelected);
        }
    }, [isOpen, initialSelected]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSelect = (product: ProductType) => {
        const selected = { productId: product.id, name: product.name };
        setSelectedProducts((prev) => {
            const exists = prev.some((p) => p.productId === product.id);
            if (exists) {
                return prev.filter((p) => p.productId !== product.id);
            } else {
                return [...prev, selected];
            }
        });
    };

    const handleSubmit = () => {
        onProductsSelected(selectedProducts);
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
                    <DialogTitle>Выберите товары</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Поиск товаров..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ScrollArea className="h-[500px] w-full rounded-md border">
                        <div className="p-4">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center text-muted-foreground">
                                    {searchTerm
                                        ? 'Товары не найдены'
                                        : 'Список товаров пуст'}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={product.id}
                                                checked={selectedProducts.some(
                                                    (p) =>
                                                        p.productId ===
                                                        product.id,
                                                )}
                                                onCheckedChange={() =>
                                                    handleSelect(product)
                                                }
                                            />
                                            <label
                                                htmlFor={product.id}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {product.id} - {product.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Выбрано: {selectedProducts.length}
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
                                disabled={selectedProducts.length === 0}
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
