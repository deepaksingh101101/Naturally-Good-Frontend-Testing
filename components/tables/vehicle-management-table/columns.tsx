'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { VehicleManagement } from '@/constants/vehicle-management';

export const columns: ColumnDef<VehicleManagement>[] = [
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
    accessorKey: 'sno',
    header: 'Sno'
  },
  {
    accessorKey: 'vehicleType',
    header: 'Vehicle Type'
  },
  {
    accessorKey: 'classification',
    header: 'Classification'
  },
  {
    accessorKey: 'sortOrder',
    header: 'Sort Order'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.status === 'Active' ? 'bg-green-400' :
          row.original.status === 'Inactive' ? 'bg-red-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black bold'>{row.original.status}</span>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
