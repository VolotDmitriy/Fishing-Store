'use client';

import { VariantDrawer } from '@/components/data-table/drawers/ProductVariantsDrawer';
import { TableCellViewer } from '@/components/data-table/table-cell-viewer';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { fetchProducts } from '@/utils/requests';
import { VariantType } from './types';

interface VariantSubTableProps {
    variants: VariantType[];
}

const dataDiscount = await fetchProducts();

export function VariantSubTable({ variants }: VariantSubTableProps) {
    return (
        <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>В наличии</TableHead>
                    <TableHead>Скидка</TableHead>
                    <TableHead>Атрибуты</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {variants.map((variant, index) => (
                    <TableRow key={index}>
                        <TableCell>{variant.id}</TableCell>
                        <TableCell>
                            <TableCellViewer itemName={variant.sku}>
                                <VariantDrawer
                                    item={variant}
                                    data={variants}
                                ></VariantDrawer>
                            </TableCellViewer>
                        </TableCell>
                        <TableCell>{variant.price} ₴</TableCell>
                        <TableCell>{variant.inStock} шт.</TableCell>
                        <TableCell>{variant.discountId || 'Нет'}</TableCell>
                        <TableCell>
                            {variant.attributes
                                .map((attr) => `${attr.typeId}: ${attr.value}`)
                                .join(',  ')}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
