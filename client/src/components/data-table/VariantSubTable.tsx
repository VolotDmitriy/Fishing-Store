'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { z } from 'zod';
import { productVariant } from './types';

interface VariantSubTableProps {
    variants: z.infer<typeof productVariant>[];
}

export function VariantSubTable({ variants }: VariantSubTableProps) {
    return (
        <Table>
            <TableHeader>
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
                        <TableCell>{variant.sku}</TableCell>
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
