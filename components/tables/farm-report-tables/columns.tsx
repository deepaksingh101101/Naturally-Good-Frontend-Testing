'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Briefcase, Calendar, CalendarCheck } from 'lucide-react';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <span className='flex items-center' ><CalendarCheck width={14} height={14} className='text-red-500 me-2' /><span>{row.original.date}</span></span>, // Displays Date
  },
  {
    accessorKey: 'totalComplaints',
    header: 'Total Complaints',
    cell: ({ row }) => (
      <div className="flex bg-red-500 py-1 text-white rounded-lg items-center justify-center">
        <span>{row.original.totalComplaints}</span>
      </div>
    ),
  },
  {
    accessorKey: 'high',
    header: 'High',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.high}</span>
      </div>
    ),
  },
  {
    accessorKey: 'medium',
    header: 'Medium',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.medium}</span>
      </div>
    ),
  },
  {
    accessorKey: 'low',
    header: 'Low',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.low}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalBags',
    header: 'Total Bags',
    cell: ({ row }) => (
      <div className="flex items-center  ">
        <span className='flex items-center' > <Briefcase height={14} width={14} className='text-blue-500 me-2' /> <span>{row.original.totalBags}</span></span>
      </div>
    ),
  },
  {
    accessorKey: 'totalPercentage',
    header: 'Total %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.totalPercentage}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalHighPercentage',
    header: 'Total High %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.totalHighPercentage}</span>
      </div>
    ),
  },
  {
    accessorKey: 'badQuality',
    header: 'Bad Quality',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.badQuality}</span>
      </div>
    ),
  },
  {
    accessorKey: 'badQualityPercentage',
    header: 'Bad Quality %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.badQualityPercentage}</span>
      </div>
    ),
  },
  {
    accessorKey: 'lateDelivery',
    header: 'Late Delivery',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.lateDelivery}</span>
      </div>
    ),
  },
  {
    accessorKey: 'lateDeliveryPercentage',
    header: 'Late Delivery %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.lateDeliveryPercentage}</span>
      </div>
    ),
  },
  {
    accessorKey: 'missingWrongItems',
    header: 'Missing/Wrong Items',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.missingWrongItems}</span>
      </div>
    ),
  },
  {
    accessorKey: 'missingWrongItemsPercentage',
    header: 'Missing/Wrong Items %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.missingWrongItemsPercentage}</span>
      </div>
    ),
  },
  {
    accessorKey: 'missingDelivery',
    header: 'Missing Delivery',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.missingDelivery}</span>
      </div>
    ),
  },
  {
    accessorKey: 'missingDeliveryPercentage',
    header: 'Missing Delivery %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.missingDeliveryPercentage}</span>
      </div>
    ),
  },
];
