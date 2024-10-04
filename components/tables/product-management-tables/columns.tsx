'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: '_id',
    header: 'Sno',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'ImageURL',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex items-center">
{      row?.original?.ImageURL?<img src={row?.original?.ImageURL} alt={row?.original?.ProductName} width={50} height={50} />:"No Image"
}      </div>
    ),
  },
  {
    accessorKey: 'ProductName',
    header: 'Item Name',
    cell: ({ row }) => (
        <span className="ml-2">{row?.original?.ProductName}</span>
    ),
  },
  {
    accessorKey: 'Type.Name',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex items-center me-9">
        <span className="ml-2">{row?.original?.Type?.Name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Season.Name',
    header: 'Season',
    cell: ({ row }) => (
      <span className="ml-2">{row?.original?.Season?.Name}</span>
  ),
  },
  {
    accessorKey: 'Priority.Name',
    header: 'Priority',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
       
      >
        <span className="text-black bold text-center ms-2">{row?.original?.Priority?.Name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Roster.Name',
    header: 'Roster',
    cell: ({ row }) => (
      <span className="ml-2">{row?.original?.Roster?.Name}</span>
  ),
  },
  {
    accessorKey: 'VeggieNameInHindi',
    header: 'Veggie Name in Hindi',
    cell: ({ row }) => (
      <div className="text-center">
        {row?.original?.VeggieNameInHindi}
      </div>
    ),
  },

  {
    accessorKey: 'UnitQuantity',
    header: 'Unit Quantity',
    cell: ({ row }) => (
      <div className="text-center">
        {(row?.original?.UnitType === 'grams' || row?.original?.UnitType === 'liter') 
          ? `${row?.original?.UnitQuantity} ${row?.original?.UnitType}` 
          : ""}
      </div>
    ),
  }
,  
  // {
  //   accessorKey: 'UnitType',
  //   header: 'Unit Type',
  //   cell: ({ row }) => (
  //     <div className="text-center">
  //       {row?.original?.UnitType}
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'Price',
    header: 'Item Price',
    cell: ({ row }) => (
      <div className="text-center">
        ₹{row?.original?.Price}
      </div>
    ),
  },
  {
    accessorKey: 'MinimumUnits',
    header: 'Min Unit',
    cell: ({ row }) => (
      <div className="text-center">
        {row?.original?.MinimumUnits}
      </div>
    ),
  },
  {
    accessorKey: 'MaximumUnits',
    header: 'Max Unit',
    cell: ({ row }) => (
      <div className="text-center">
        {row?.original?.MaximumUnits}
      </div>
    ),
  },
  {
    accessorKey: 'Group.Name',
    header: 'Group',
    cell: ({ row }) => (
      <span className="ml-2">{row?.original?.Group?.Name}</span>
  ),
  },
  {
    accessorKey: 'Available',
    header: 'Available',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center justify-center px-2 py-1 ${
          row?.original?.Available ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        <span className="text-black  bold">{row?.original?.Available ? 'Yes' : 'No'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Visibility',
    header: 'Visibility',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center px-2 py-1 ${
          row?.original?.Visibility === 'Admin' ? 'bg-red-400' :
          row?.original?.Visibility === 'Customer+Admin' ? 'bg-green-400' :
          'bg-red-400'
        }`}
      >
        <span className="text-black bold">{row?.original?.Visibility === 'Admin' ? 'Admin' : 'Public'}</span>
      </div>
    ),
  },

  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-start">
        {row?.original?.Description?.split(' ').slice(0, 10).join(' ')}...
      </div>
    ),
  },
  {
    accessorKey: 'Notes',
    header: 'Notes',
    cell: ({ row }) => (
      <div className="text-start">
        {row?.original?.Notes?.split(' ').slice(0, 10).join(' ')}...
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
