'use client';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';

interface Warehouse {
    Description: string;
    Number: string;
    CityDescription: string;
    TypeOfWarehouse: string;
}

interface WarehouseSelectorProps {
    settlementRef: string;
    selectedWarehouse: string;
    setSelectedWarehouse: (warehouse: string) => void;
    warehouseType: 'warehouse' | 'postomat';
}

const warehouseRefs = {
    warehouse: [
        '6f8c7162-4b72-4b0a-88e5-906948c6a92f', // Поштове відділення з обмеження
        '841339c7-591a-42e2-8233-7a0a00f0ed6f', // Поштове(ий)
        '9a68df70-0267-42a8-bb5c-37f427e36ee4', // Вантажне(ий)
    ],
    postomat: [
        '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc', // Поштомат ПриватБанку
        'f9316480-5f2d-425d-bc2c-ac7cd29decf0', // Поштомат
    ],
};

const WarehouseSelector = ({
    settlementRef,
    selectedWarehouse,
    setSelectedWarehouse,
    warehouseType,
}: WarehouseSelectorProps) => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const fetchWarehouses = async () => {
        if (!settlementRef) return;

        setIsLoading(true);
        setError(null);

        try {
            const refs = warehouseRefs[warehouseType];
            const promises = refs.map((ref) =>
                fetch('https://api.novaposhta.ua/v2.0/json/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: '',
                        modelName: 'Address',
                        calledMethod: 'getWarehouses',
                        methodProperties: {
                            SettlementRef: settlementRef,
                            TypeOfWarehouseRef: ref,
                        },
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if (result.success) {
                            console.log('Список відділень:', result.data);
                            return result.data;
                        } else {
                            console.error('Помилка API:', result.errors);
                            return [];
                        }
                    })
                    .catch((err) => {
                        console.error('Помилка мережі:', err);
                        return [];
                    }),
            );

            const results = await Promise.all(promises);
            const allWarehouses = results.flat();
            setWarehouses(allWarehouses);
        } catch (err) {
            setError('Помилка сервера');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWarehouses();
    }, [settlementRef, warehouseType]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] px-5 text-white border-white"
                >
                    <span className="truncate overflow-hidden whitespace-nowrap block w-full text-left">
                        {selectedWarehouse ||
                            'Виберіть відділення або поштомат'}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[400px] w-full p-0">
                <Command>
                    <CommandInput placeholder="Пошук..." className="h-9" />
                    <CommandList>
                        {isLoading ? (
                            <CommandEmpty>Завантаження...</CommandEmpty>
                        ) : error ? (
                            <CommandEmpty>{error}</CommandEmpty>
                        ) : warehouses.length > 0 ? (
                            <CommandGroup>
                                {warehouses.map((warehouse, index) => (
                                    <CommandItem
                                        key={warehouse.TypeOfWarehouse + index}
                                        value={warehouse.Description}
                                        onSelect={() => {
                                            setSelectedWarehouse(
                                                warehouse.Description,
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {warehouse.Description} (
                                        {warehouse.CityDescription})
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>
                                Немає доступних відділень
                            </CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default WarehouseSelector;
