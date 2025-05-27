import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { dataCategories, dataDiscount, dataProducts } from './column-def';
import { CategoryDrawer } from './drawers/CategoryDrawer';
import { DiscountDrawer } from './drawers/DiscountDrawer';
import { ProductDrawer } from './drawers/ProductDrawer';
import { TableCellViewer } from './table-cell-viewer';
import { CategoryType, DiscountType, ProductType } from './types';

interface ActionsCellProps {
    entityType: 'category' | 'product' | 'discount';
    item: CategoryType | ProductType | DiscountType;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({
    entityType,
    item,
}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const endpointMap: Record<string, string> = {
                category: `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${item.id}?force=true`,
                product: `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${item.id}?force=true`,
                discount: `${process.env.NEXT_PUBLIC_SERVER_URL}/discount/${item.id}`,
            };

            const response = await axios.delete(endpointMap[entityType], {
                withCredentials: true,
            });

            if (response.status !== 200) {
                throw new Error(`Failed to delete ${entityType}`);
            }

            toast.success(
                `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} успешно удален!`,
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error(`Ошибка при удалении ${entityType}: ${String(error)}`);
        }
    };

    const renderDrawerContent = () => {
        switch (entityType) {
            case 'category':
                return (
                    <CategoryDrawer
                        item={item as CategoryType}
                        data={dataCategories}
                        onChange={() => {}}
                    />
                );
            case 'product':
                return (
                    <ProductDrawer
                        item={item as ProductType}
                        data={dataProducts}
                        categoriesData={dataCategories}
                        discountsData={dataDiscount}
                        onChange={() => {}}
                    />
                );
            case 'discount':
                return (
                    <DiscountDrawer
                        item={item as DiscountType}
                        data={dataDiscount}
                        onChange={() => {}}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IconDotsVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => setIsDrawerOpen(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <TableCellViewer
                itemName={(item as any).name}
                itemId={item.id}
                entityType={entityType}
                isOpen={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                isNameVisible={false}
            >
                {renderDrawerContent()}
            </TableCellViewer>
        </>
    );
};
