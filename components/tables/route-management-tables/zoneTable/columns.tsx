'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Zone } from '@/constants/zones';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'ZoneName',
    header: 'Zone Name',
  },
  {
    accessorKey: 'CityName',
    header: 'Associated City',
  },
  {
    accessorKey: 'Serviceable',
    header: 'Serviceable',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center justify-center px-2 py-1 ${
          row?.original?.Serviceable ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        <span className="text-black  bold">{row?.original?.Serviceable ? 'Yes' : 'No'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'DeliveryCost',
    header: 'Delivery Cost',
    cell: ({ row }) => <div className="flex justify-center">₹{row.original.DeliveryCost.toFixed(2)}</div>
  },
  {
    accessorKey: 'CreatedBy',
    header: 'Created By',
    cell: ({ row }) => <div className="flex justify-center">{row.original.CreatedBy.Email}</div>
  },
  {
    accessorKey: 'UpdatedBy',
    header: 'Updated By',
    cell: ({ row }) => <div className="flex justify-center">{row.original.UpdatedBy.Email}</div>
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
