'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { Notification } from '@/constants/notification-management-data';
import Image from 'next/image';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const Columns: ColumnDef<Notification>[] = [
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
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          src={row.original.image}
          alt="Notification Image"
          className="w-10 h-10 rounded-full mr-2 object-cover"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'heading',
    header: 'Heading',
  },
  {
    accessorKey: 'type',
    header: 'Category',
  },
  {
    accessorKey: 'notificationType',
    header: 'Notification Type',
    cell: ({ row }) => {
      const notificationType = row.original.notificationType;
      const bgColorClass = notificationType === 'Automatic' ? 'bg-green-200' : 'bg-red-200';
      const textColorClass = notificationType === 'Automatic' ? 'text-green-800' : 'text-red-800';
      
      return (
        <div className={`${bgColorClass} ${textColorClass} px-2 py-1 rounded`}>
          {notificationType}
        </div>
      );
    }
  }
,  
  
  {
    accessorKey: 'scheduleType',
    header: 'Schedule Type',
  },
  {
    accessorKey: 'scheduleTime',
    header: 'Scheduled Time',
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
