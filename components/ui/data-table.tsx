'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  FilterFn,
  Table,
} from '@tanstack/react-table';

import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from './dropdown-menu';

interface FilterOption {
  label: string;
  subOptions: string[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeys?: string[];
  onSearch?: (value: string) => void;
  filters?: FilterOption[];
  meta?: {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    updateColumnData: (columnId: string, value: any) => void;
  };
  rowNo?:number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKeys = [],
  onSearch,
  filters,
  meta,
  rowNo,
}: DataTableProps<TData, TValue>) {
  const [filterInput, setFilterInput] = useState('');

  const filterFunction: FilterFn<TData> = (row, columnId, filterValue) => {
    if (!searchKeys || searchKeys.length === 0) {
      return true;
    }
    return searchKeys.some((key) => {
      const cellValue = row.getValue(key);
      return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filterInput,
    },
    onGlobalFilterChange: setFilterInput,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: filterFunction,
    manualSorting: true,
    meta,
  });

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setFilterInput(value);
    if (onSearch) {
      onSearch(value);
    }
  };



  return (
    <>
     {filters &&  <div className="flex justify-end">
        <Input
          value={filterInput}
          onChange={handleSearchChange}
          placeholder={`Search by ${searchKeys.join(', ') || 'defaultSearchKey'}`}
          className="mb-4 max-w-64"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button style={{ background: "#04894d", color: 'white' }} className="text-xs md:text-sm ms-4">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">
            {filters?.map((filter) => (
              <DropdownMenuSub key={filter.label}>
                <DropdownMenuSubTrigger>
                  {filter.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  {filter.subOptions.map((subOption) => (
                    <DropdownMenuItem key={subOption}>{subOption}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>}

      <ScrollArea className="rounded-md border">
        <UiTable className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  rowNumber={index} // Pass row number
                  highlightedRow={rowNo} // Pass the highlighted row number
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UiTable>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    
    </>
  );
}
