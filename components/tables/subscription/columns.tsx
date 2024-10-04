'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Subscription } from '@/constants/subscription-data';
import { Checkbox } from '@/components/ui/checkbox';
import { SubscriptionCellAction } from './cell-action';
import { Calendar, Check, X, IndianRupee } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'sno',
    header: 'Sno',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <span>{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: 'SubscriptionTypeId.Name',
    header: 'Subscription Type',
    cell: ({ row }) => (
      <div>
        {row.original.SubscriptionTypeId?.Name}
      </div>
    ),
  },
  {
    accessorKey: 'FrequencyId.Name',
    header: 'Frequency',
    cell: ({ row }) => (
      <div>
        {row.original.FrequencyId?.Name}
      </div>
    )
  },
  {
    accessorKey: 'TotalDeliveryNumber',
    header: 'Total Delivery',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.TotalDeliveryNumber}
      </div>
    )
  },
  {
    accessorKey: 'Bag.BagName',
    header: 'Bags Name',
    cell: ({ row }) => (
      <div>
        {row.original.Bag?.BagName}
      </div>
    ),
  },
  {
    accessorKey: 'Visibility',
    header: 'Visibility',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.Visibility === 'Admin' ? 'bg-red-400' :
          row.original.Visibility === 'Public' ? 'bg-green-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black bold'>{row.original.Visibility}</span>
      </div>
    )
  },
  {
    accessorKey: 'Status',
    header: 'Subscription Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 me-5 ${
          row.original.Status ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row.original.Status ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row.original.Status ? 'Active' : 'Inactive'}</span>
      </div>
    )
  },
  {
    accessorKey: 'DeliveryDays',
    header: 'Delivery Days',
    cell: ({ row }) => (
      <ul>
        {row.original.DeliveryDays?.map((day:any, index:number) => (
          <li key={index}>{day.day}</li>
        ))}
      </ul>
    )
  },
  {
    accessorKey: 'OriginalPrice',
    header: 'Price',
    cell: ({ row }) => (
      <div className="flex items-center">
        <IndianRupee className="mr-1" width={16} height={16} />
        {row.original.OriginalPrice}
      </div>
    )
  },
  {
    accessorKey: 'Offer',
    header: 'Offers',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.Offer}%
      </div>
    )
  },
  {
    accessorKey: 'NetPrice',
    header: 'Net Price',
    cell: ({ row }) => (
      <div className="flex items-center">
        <IndianRupee className="mr-1" width={16} height={16} />
        {row.original.NetPrice}
      </div>
    )
  },
  {
    accessorKey: 'ImageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.ImageUrl && <img src={row.original.ImageUrl} alt={row.original.SubscriptionTypeId?.Name} width={50} height={50} />}
      </div>
    ),
  },
  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-start">
        {row.original.Description?.split(' ').slice(0, 10).join(' ')}...
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <SubscriptionCellAction data={row.original} />,
  },
];