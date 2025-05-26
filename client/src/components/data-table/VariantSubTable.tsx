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

import { fetchDiscounts, fetchVariantTypes } from '@/utils/requests';
import { useEffect, useState } from 'react';
import { ProductVariantType, VariantTypeType } from './types';

interface VariantSubTableProps {
    variants: ProductVariantType[];
}

export function VariantSubTable({ variants }: VariantSubTableProps) {
    const [discounts, setDiscounts] = useState<any[]>([]);
    const [typeMap, setTypeMap] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        const loadData = async () => {
            try {
                const [discountData, typeData] = await Promise.all([
                    fetchDiscounts(false),
                    fetchVariantTypes(false),
                ]);

                setDiscounts(discountData);

                const map = new Map<string, string>();
                typeData.forEach((type: VariantTypeType) => {
                    map.set(type.id, type.name);
                });
                setTypeMap(map);
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };

        loadData();
    }, []);

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
                                    discountsData={discounts}
                                />
                            </TableCellViewer>
                        </TableCell>
                        <TableCell>{variant.price} ₴</TableCell>
                        <TableCell>{variant.inStock} шт.</TableCell>
                        <TableCell>{variant.discountId || 'Нет'}</TableCell>
                        <TableCell>
                            {variant.attributes
                                .map((attr) => {
                                    const typeName =
                                        typeMap.get(attr.typeId) || attr.typeId;
                                    return `${typeName}: ${attr.value}`;
                                })
                                .join(', ')}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
