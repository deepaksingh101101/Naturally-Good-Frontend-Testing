'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';


// Define static columns
export const staticColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'sno',
    header: 'SNo',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.sno}</span>
      </div>
    ),
  },
  {
    accessorKey: 'productType',
    header: 'Product Type',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.productType}</span>
      </div>
    ),
  },
  {
    accessorKey: 'productGroup',
    header: 'Product Group',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.productGroup}</span>
      </div>
    ),
  },
  {
    accessorKey: 'season',
    header: 'Season',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.season}</span>
      </div>
    ),
  },
  {
    accessorKey: 'productName',
    header: 'Product Name',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.productName}</span>
      </div>
    ),
  },
  {
    accessorKey: 'unitQuantity',
    header: 'Unit Quantity',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.unitQuantity}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Quantity',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.totalQuantity}</span>
      </div>
    ),
  },
  {
    accessorKey: 'units',
    header: 'Units',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.units}</span>
      </div>
    ),
  },
  {
    accessorKey:'soldUnits',
    header: 'Sold Units',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.soldUnits}</span>
      </div>
    ),
  },
];


