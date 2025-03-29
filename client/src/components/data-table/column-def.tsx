'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { z } from 'zod';
import { TableCellViewer } from './table-cell-viewer';
import { categorySchema, discountSchema, productSchema } from './types';

// Столбцы для каждой таблицы
export const categoryColumns: ColumnDef<z.infer<typeof categorySchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => <TableCellViewer item={row.original} />,
        enableHiding: false,
    },
    {
        accessorKey: 'parentId',
        header: 'Родительский ID',
        cell: ({ row }) => (
            <Badge variant="outline">{row.original.parentId || 'Нет'}</Badge>
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
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IconDotsVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => <TableCellViewer item={row.original} />,
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: 'Описание',
        cell: ({ row }) => row.original.description || 'Описание отсутствует',
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
    },
    {
        accessorKey: 'discountId',
        header: 'Скидка',
        cell: ({ row }) => row.original.discountId || 'Нет',
    },
    {
        id: 'actions',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IconDotsVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export const discountColumns: ColumnDef<z.infer<typeof discountSchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => <TableCellViewer item={row.original} />,
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
            new Date(row.original.startDate).toLocaleDateString(),
    },
    {
        accessorKey: 'endDate',
        header: 'Конец',
        cell: ({ row }) => new Date(row.original.endDate).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IconDotsVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
