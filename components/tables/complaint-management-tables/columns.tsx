import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ComplaintManagement } from '@/constants/complaint-management-data';

// Updated Columns
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
    accessorKey: '_id',
    header: 'Sno',
    cell: ({ row }) => <div>{row.index + 1}</div> // Generate row number (Sno)
  },
  {
    accessorKey: 'ComplaintType', // Matches the payload structure
    header: 'Complaint Type'
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.Status ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        <span className='text-black bold'>
          {row.original.Status ? 'Active' : 'Inactive'}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'Description', // Matches the payload structure
    header: 'Description'
  },
  {
    accessorKey: 'CreatedBy.FirstName', // Access nested field
    header: 'Created By',
    cell: ({ row }) => (
      <div>
        {row.original.CreatedBy.FirstName} {row.original.CreatedBy.LastName}
      </div>
    )
  },
  {
    accessorKey: 'UpdatedBy.FirstName', // Access nested field
    header: 'Updated By',
    cell: ({ row }) => (
      <div>
        {row.original.UpdatedBy.FirstName} {row.original.UpdatedBy.LastName}
      </div>
    )
  },
  {
    accessorKey: 'UpdatedAt',
    header: 'Last Updated',
    cell: ({ row }) => new Date(row.original.UpdatedAt).toLocaleString() // Format date
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.CreatedAt).toLocaleString() // Format date
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
