'use client';

import { CategoryDrawer } from '@/components/data-table/drawers/CategoryDrawer';
import { DiscountDrawer } from '@/components/data-table/drawers/DiscountDrawer';
import { ProductDrawer } from '@/components/data-table/drawers/ProductDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    fetchCategories,
    fetchDiscounts,
    fetchProducts,
} from '@/utils/requests';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { z } from 'zod';
import { ActionsCell } from './actions-cell';
import { TableCellViewer } from './table-cell-viewer';
import { categorySchema, discountSchema, productSchema } from './types';

export const dataCategories = await fetchCategories(false);
export const dataProducts = await fetchProducts(true);
export const dataDiscount = await fetchDiscounts(false);

export const categoryColumns: ColumnDef<z.infer<typeof categorySchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => (
            <TableCellViewer
                itemName={row.original.name}
                itemId={row.original.id}
                entityType="category"
            >
                <CategoryDrawer
                    item={row.original}
                    data={dataCategories}
                    onChange={() => {}}
                />
            </TableCellViewer>
        ),
        enableHiding: false,
    },
    {
        accessorKey: 'parentId',
        header: 'Родительский ID',
        cell: ({ row }) => (
            <Badge variant="outline">
                {dataCategories.find((c) => c.id === row.original.parentId)
                    ?.name || 'Нет'}
            </Badge>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата создания',
        cell: ({ row }) =>
            new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        accessorKey: 'updatedAt',
        header: 'Дата обновления',
        cell: ({ row }) =>
            new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <ActionsCell entityType="category" item={row.original} />
        ),
    },
];

export const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => (
            <TableCellViewer
                itemName={row.original.name}
                itemId={row.original.id}
                entityType="product"
            >
                <ProductDrawer
                    item={row.original}
                    data={dataProducts}
                    categoriesData={dataCategories}
                    discountsData={dataDiscount}
                    onChange={() => {}}
                />
            </TableCellViewer>
        ),
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: 'Описание',
        cell: ({ row }) => row.original.description || 'Описание отсутствует',
        enableHiding: true,
    },
    {
        accessorKey: 'variants',
        header: 'Варианты',
        cell: ({ row, table }) => {
            const variants = row.original.variants;
            if (!variants || variants.length === 0) {
                return 'Нет вариантов';
            }
            const count = variants.length;
            const expandedState = table.getState().expanded;
            const isExpanded =
                typeof expandedState === 'object'
                    ? expandedState[row.id]
                    : false;

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (typeof expandedState === 'object') {
                            table.setExpanded({
                                ...expandedState,
                                [row.id]: !isExpanded,
                            });
                        } else {
                            table.setExpanded({ [row.id]: true });
                        }
                    }}
                >
                    {count} Вариант{count > 1 ? 'ов' : ''}{' '}
                    {isExpanded ? <ChevronDown /> : <ChevronRight />}
                </Button>
            );
        },
    },
    {
        accessorKey: 'categoryId',
        header: 'Категория',
        cell: ({ row }) => row.original.categoryId || 'Нет',
    },
    {
        accessorKey: 'images',
        header: 'Изображения',
        cell: ({ row }) => row.original.images.join(', ') || 'Нет изображений',
        enableHiding: true,
    },
    {
        accessorKey: 'discountId',
        header: 'Скидка',
        cell: ({ row }) => row.original.discountId || 'Нет',
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <ActionsCell entityType="product" item={row.original} />
        ),
    },
];

export const discountColumns: ColumnDef<z.infer<typeof discountSchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => (
            <TableCellViewer
                itemName={row.original.name}
                itemId={row.original.id}
                entityType="discount"
            >
                <DiscountDrawer
                    item={row.original}
                    data={dataDiscount}
                    onChange={() => {}}
                />
            </TableCellViewer>
        ),
        enableHiding: false,
    },
    {
        accessorKey: 'percentage',
        header: 'Скидка (%)',
        cell: ({ row }) => `${row.original.percentage}%`,
    },
    {
        accessorKey: 'startDate',
        header: 'Начало',
        cell: ({ row }) =>
            row.original.startDate
                ? new Date(row.original.startDate).toLocaleDateString()
                : 'Нет данных',
    },
    {
        accessorKey: 'endDate',
        header: 'Конец',
        cell: ({ row }) =>
            row.original.endDate
                ? new Date(row.original.endDate).toLocaleDateString()
                : 'Нет данных',
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <ActionsCell entityType="discount" item={row.original} />
        ),
    },
];
