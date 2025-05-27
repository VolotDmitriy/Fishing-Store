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
import { Warehouse } from '@/utils/types';
import { useState } from 'react';

interface WarehouseSelectorProps {
    warehouses: Warehouse[];
    selectedWarehouse: string;
    setSelectedWarehouse: (point: string) => void;
    warehouseType: 'warehouse' | 'postomat';
}

const WarehouseSelector = ({
    warehouses,
    selectedWarehouse,
    setSelectedWarehouse,
    warehouseType,
}: WarehouseSelectorProps) => {
    const [open, setOpen] = useState<boolean>(false);

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
                        {warehouses.length > 0 ? (
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
