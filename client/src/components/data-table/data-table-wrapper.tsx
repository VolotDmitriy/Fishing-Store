'use client';

import {
    categoryColumns,
    discountColumns,
    productColumns,
} from '@/components/data-table/column-def';
import { TableView } from '@/components/data-table/table-view';
import { ColumnType } from '@/components/data-table/types';
import { ColumnDef } from '@tanstack/react-table';

interface DataTableWrapperProps {
    categories: ColumnType[];
    products: ColumnType[];
    discounts: ColumnType[];
    type: 'categories' | 'products' | 'discounts';
}

export default function DataTableWrapper({
    categories,
    products,
    discounts,
    type,
}: DataTableWrapperProps) {
    const dataMap = {
        categories: { data: categories, columns: categoryColumns },
        products: { data: products, columns: productColumns },
        discounts: { data: discounts, columns: discountColumns },
    };

    return (
        <TableView
            data={dataMap[type].data}
            columns={dataMap[type].columns as ColumnDef<ColumnType>[]}
        />
    );
}
