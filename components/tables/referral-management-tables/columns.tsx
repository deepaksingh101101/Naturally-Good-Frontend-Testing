'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ReferralManagement } from '@/constants/referral-management-data';

export const columns: ColumnDef<ReferralManagement>[] = [
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
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To'
  },
  {
    accessorKey: 'discountPercentage',
    header: 'Discount',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center' >{row.original.discountPercentage} %</span>
      </div>
    )
  },
  {
    accessorKey: 'validity',
    header: 'Validity',
    cell: ({ row }) => (
      <span>{row.original.validity} Month</span>
    )
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
