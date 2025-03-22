'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconDotsVertical,
    IconLayoutColumns,
    IconPlus,
} from '@tabler/icons-react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// Схемы данных
export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    categoryId: z.string().nullable(),
    images: z.array(z.string()),
    discountId: z.string().nullable(),
});

export const discountSchema = z.object({
    id: z.string(),
    name: z.string(),
    percentage: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

type ColumnType =
    | z.infer<typeof categorySchema>
    | z.infer<typeof productSchema>
    | z.infer<typeof discountSchema>;
// Столбцы для каждой таблицы
const categoryColumns: ColumnDef<z.infer<typeof categorySchema>>[] = [
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

const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
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
        cell: ({ row }) => row.original.description,
    },
    {
        accessorKey: 'categoryId',
        header: 'Категория',
        cell: ({ row }) => row.original.categoryId || 'Нет',
    },
    {
        accessorKey: 'images',
        header: 'Изображения',
        cell: ({ row }) => row.original.images.join(', '),
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

const discountColumns: ColumnDef<z.infer<typeof discountSchema>>[] = [
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

// Универсальный компонент TableCellViewer с Drawer
function TableCellViewer({ item }: { item: ColumnType }) {
    const [name, setName] = React.useState(item.name || '');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Сохранение ${name}`,
            success: 'Сохранено!',
            error: 'Ошибка',
        });
    };

    const isCategory = 'parentId' in item;
    const isProduct =
        'description' in item &&
        'categoryId' in item &&
        'images' in item &&
        'discountId' in item;
    const isDiscount =
        'percentage' in item && 'startDate' in item && 'endDate' in item;

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="link"
                    className="text-foreground w-fit px-0 text-left"
                >
                    {item.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.name}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Общее поле для всех типов */}
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">Название</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Поля для категории */}
                        {isCategory && (
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="parentId">
                                    Родительский ID
                                </Label>

                                <Input
                                    id="parentId"
                                    defaultValue={item.parentId || ''}
                                />
                            </div>
                        )}

                        {/* Поля для продукта */}
                        {isProduct && (
                            <>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="description">
                                        Описание
                                    </Label>
                                    <Input
                                        id="description"
                                        defaultValue={item.description}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="categoryId">
                                        Категория
                                    </Label>
                                    <Input
                                        id="categoryId"
                                        defaultValue={item.categoryId || ''}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="images">Изображения</Label>
                                    <Input
                                        id="images"
                                        defaultValue={item.images.join(', ')}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="discountId">Скидка</Label>
                                    <Input
                                        id="discountId"
                                        defaultValue={item.discountId || ''}
                                    />
                                </div>
                            </>
                        )}

                        {/* Поля для скидки */}
                        {isDiscount && (
                            <>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="percentage">
                                        Скидка (%)
                                    </Label>
                                    <Input
                                        id="percentage"
                                        defaultValue={item.percentage}
                                        type="number"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="startDate">Начало</Label>
                                    <Input
                                        id="startDate"
                                        defaultValue={item.startDate.slice(
                                            0,
                                            16,
                                        )}
                                        type="datetime-local"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="endDate">Конец</Label>
                                    <Input
                                        id="endDate"
                                        defaultValue={item.endDate.slice(0, 16)}
                                        type="datetime-local"
                                    />
                                </div>
                            </>
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

// Компонент таблицы с Customize Columns
function TableView({
    data,
    columns,
}: {
    data: ColumnType[];
    columns: ColumnDef<ColumnType>[];
}) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns />
                                <span className="hidden lg:inline">
                                    Customize Columns
                                </span>
                                <span className="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !==
                                            'undefined' && column.getCanHide(),
                                )
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                        <IconPlus />
                        <span className="hidden lg:inline">Add Item</span>
                    </Button>
                </div>
            </div>
            <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label
                                htmlFor="rows-per-page"
                                className="text-sm font-medium"
                            >
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) =>
                                    table.setPageSize(Number(value))
                                }
                            >
                                <SelectTrigger
                                    size="sm"
                                    className="w-20"
                                    id="rows-per-page"
                                >
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to first page
                                </span>
                                <IconChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to previous page
                                </span>
                                <IconChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <IconChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <IconChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Основной компонент DataTable с вкладками
interface DataTableProps {
    categories: ColumnType[];
    products: ColumnType[];
    discounts: ColumnType[];
}

export function DataTable({ categories, products, discounts }: DataTableProps) {
    return (
        <Tabs
            defaultValue="categories"
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <TabsList className="hidden @4xl/main:flex">
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="discounts">Discounts</TabsTrigger>
                </TabsList>
                {/* Кнопки Customize Columns и Add Item перенесены внутрь TableView */}
            </div>
            <TabsContent value="categories">
                <TableView
                    data={categories}
                    columns={categoryColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
            <TabsContent value="products">
                <TableView
                    data={products}
                    columns={productColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
            <TabsContent value="discounts">
                <TableView
                    data={discounts}
                    columns={discountColumns as ColumnDef<ColumnType>[]}
                />
            </TabsContent>
        </Tabs>
    );
}
