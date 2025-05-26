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
import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';

interface TableCellViewerProps {
    itemName: string;
    itemId: string;
    children: React.ReactNode;
    entityType: 'category' | 'product' | 'discount';
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    isNameVisible?: boolean;
}

export function TableCellViewer({
    itemName,
    children,
    itemId,
    entityType,
    isOpen,
    onOpenChange,
    isNameVisible = true,
}: TableCellViewerProps) {
    const [name, setName] = React.useState(itemName);

    const [formData, setFormData] = React.useState<Record<string, any>>({
        name: itemName,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpointMap: Record<string, string> = {
                category: `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${itemId}`,
                product: `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${itemId}`,
                discount: `${process.env.NEXT_PUBLIC_SERVER_URL}/discount/${itemId}`,
            };

            const response = await axios.put(
                endpointMap[entityType],
                formData,
                {
                    withCredentials: true,
                },
            );

            if (response.status !== 200) {
                throw new Error(`Failed to update ${entityType}`);
            }

            toast.success(
                `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} успешно обновлен!`,
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error(
                `Ошибка при обновлении ${entityType}: ${String(error)}`,
            );
        }
    };

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                <Button
                    variant="link"
                    className="text-foreground w-fit px-0 text-left"
                >
                    {isNameVisible && name}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{name}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {React.Children.map(children, (child) =>
                            React.isValidElement(child)
                                ? React.cloneElement(child, {
                                      onChange: setFormData,
                                  } as any)
                                : child,
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
