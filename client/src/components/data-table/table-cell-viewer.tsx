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
import * as React from 'react';
import { toast } from 'sonner';

interface TableCellViewerProps {
    itemName: string;
    children: React.ReactNode;
}

export function TableCellViewer({ itemName, children }: TableCellViewerProps) {
    const [name, setName] = React.useState(itemName);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Сохранение ${name}`,
            success: 'Сохранено!',
            error: 'Ошибка',
        });
    };

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="link"
                    className="text-foreground w-fit px-0 text-left"
                >
                    {name}
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
                        {children}
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
