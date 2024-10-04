'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { UserSnapshot } from '@/constants/user-snapshot-data';
import { Mail, Phone } from 'lucide-react';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const columns: ColumnDef<UserSnapshot>[] = [
  // {
  //   accessorKey: 'sno',
  //   header: 'SNo',
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //       <span className="" style={{ borderRadius: '50%' }}>
  //         {row.original.sno}
  //       </span>
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.firstName.charAt(0)}
        </div>
        <span>{row.original.firstName} {row.original.lastName}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.phoneNumber}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'totalSubscriptions',
    header: 'Total Subscriptions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.totalSubscriptions}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'activeSubscriptions',
    header: 'Active Subscriptions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.activeSubscriptions}
        </span>
      </div>
    ),
  },
  
  {
    accessorKey: 'lastSubscription',
    header: 'Last Subscription',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.lastSubscription}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'totalDeliveries',
    header: 'Total Deliveries',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.totalDeliveries}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'remainingDeliveries',
    header: 'Remaining Deliveries',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.remainingDeliveries}
        </span>
      </div>
    ),
  },

  {
    accessorKey: 'lastDelivery',
    header: 'Last Delivery',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.lastDelivery}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'nextDelivery',
    header: 'Next Delivery',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.nextDelivery}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'additionalDays',
    header: 'Additional Days',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.additionalDays}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'activeWeeks',
    header: 'Active Weeks',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.activeWeeks}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'subscribedSince',
    header: 'Subscribed Since',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.subscribedSince}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'totalRevenue',
    header: 'Total Revenue',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.totalRevenue}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'moneySaved',
    header: 'Money Saved',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="" style={{ borderRadius: '50%' }}>
          {row.original.moneySaved}
        </span>
      </div>
    ),
  },
];
