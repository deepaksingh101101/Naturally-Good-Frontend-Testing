'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CellAction } from './cell-action';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const columns: ColumnDef<any>[] = [ // Adjust type if you have a specific Employee type
  {
    id: 'sno', // Unique id for the serial number column
    header: 'S.No',
    cell: ({ row }) => (
      <span>{row.index + 1}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'FirstName', // Updated to match API response
    header: 'First Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row?.original?.FirstName?.charAt(0)}
        </div>
        <span>{row?.original?.FirstName}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'LastName', // Updated to match API response
    header: 'Last Name',
    cell: ({ row }) => (
      <span>{row?.original?.LastName}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'PhoneNumber', // Updated to match API response
    header: 'Phone',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Phone className="text-green-500 mr-2" width={10} height={10} />
        <span>{row?.original?.PhoneNumber}</span>
      </div>
    )
  },
  {
    accessorKey: 'Email', // Updated to match API response
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Mail className="text-blue-500 mr-2" width={10} height={10} />
        <span>{row?.original?.Email}</span>
      </div>
    )
  },
  {
    accessorKey: 'Dob', // Updated to match API response
    header: 'Date of Birth',
    cell: ({ row }) => (
      <span>{row?.original?.Dob}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'Gender', // Updated to match API response
    header: 'Gender',
    cell: ({ row }) => (
      <span>{row?.original?.Gender}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'StreetAddress', // Assuming this is a direct property
    header: 'Street Address',
    cell: ({ row }) => (
      <span>{row?.original?.StreetAddress}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'City', // Updated to match API response
    header: 'City',
    cell: ({ row }) => (
      <span>{row?.original?.City}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'State', // Updated to match API response
    header: 'State',
    cell: ({ row }) => (
      <span>{row?.original?.State}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'Role.roleName', // Updated to match API response
    header: 'Role',
    cell: ({ row }) => (
      <span>{row?.original?.Role.roleName}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];