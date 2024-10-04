'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { format } from 'date-fns';
import { CellAction } from './cell-action';
import { CouponManagement } from '@/constants/coupons-management-data';

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
    enableHiding: false,
  },
  {
    accessorKey: 'sno',
    header: 'Sno',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'Code',
    header: 'Coupon Code',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image src={row.original.image} alt={row.original.Code} width={50} height={50} />
      </div>
    ),
  },
  {
    accessorKey: 'CouponType',
    header: 'Coupon Type',
    cell: ({ row }) => (
      <div
        className={`flex items-center px-2 py-1 text-white font-bold ${
          row.original.CouponType === 'Subscription' ? 'bg-blue-400' : 'bg-red-400'
        }`}
        style={{ borderRadius: '20px' }}
      >
        <span className="text-white bold">{row.original.CouponType}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CouponCategory',
    header: 'Coupon Category',
  },
  {
    accessorKey: 'DiscountType',
    header: 'Discount Type',
    cell: ({ row }) => (
      <div className="flex">
        <span  >{row.original.DiscountType}</span> 
      </div>
    ),
  },
  {
    accessorKey: 'DiscountPrice',
    header: 'Discount Price',
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span  >₹ {row.original.DiscountPrice}</span> 
      </div>
    ),
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={`flex items-center px-2 py-1 ${
          row.original.Status === 'Active' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{ borderRadius: '10px' }}
      >
        <span className="text-white font-bold">{row.original.Status}</span>
      </div>
    ),
  },
  
  {
    accessorKey: 'ValidityType',
    header: 'Validity Type',
  },
  {
    accessorKey: 'StartDate',
    header: 'Start Date',
    cell: ({ row }) => format(new Date(row.original.StartDate), 'dd MMM yyyy'),
  },
  {
    accessorKey: 'EndDate',
    header: 'End Date',
    cell: ({ row }) => format(new Date(row.original.EndDate), 'dd MMM yyyy'),
  },
  {
    accessorKey: 'CouponVisibility',
    header: 'Visibility',
  },
  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-start">
        {row.original.Description.split(' ').slice(0, 10).join(' ')}...
      </div>
    ),
  },
  {
    accessorKey: 'CouponsName',
    header: 'Coupon Name',
  },
  {
    accessorKey: 'CreatedBy.FirstName',
    header: 'Created By',
    cell: ({ row }) => `${row.original.CreatedBy.FirstName} ${row.original.CreatedBy.LastName}`,
  },
  {
    accessorKey: 'CreatedBy.Email',
    header: 'Creator Email',
  },
  {
    accessorKey: 'UpdatedBy.FirstName',
    header: 'Updated By',
    cell: ({ row }) => `${row.original.UpdatedBy.FirstName} ${row.original.UpdatedBy.LastName}`,
  },
  // {
  //   accessorKey: 'Subscriptions',
  //   header: 'Subscriptions',
  //   cell: ({ row }) =>
  //     row.original.Subscriptions?.map((sub: any) => (
  //       <div key={sub._id} className="mb-2">
  //         <div>Subscription Type: {sub.SubscriptionTypeId?.Name}</div>
  //         <div>Frequency: {sub.FrequencyId?.Name}</div>
  //         <div>Total Deliveries: {sub.TotalDeliveryNumber}</div>
  //         <div>Net Price: ₹ {sub.NetPrice}</div>
  //         <div>Delivery Days: {sub.DeliveryDays.map((day: any) => day.day).join(', ')}</div>
  //       </div>
  //     )),
  // },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
