'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Check, X } from 'lucide-react';

// Define columns for the table
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'VehicleName', // Matches data key
    header: 'Vehicle Name',
    cell: ({ row }) => <div className="">{row?.original?.VehicleName}</div>, // Adjust text alignment
  },
  {
    accessorKey: 'Classification', // Matches data key
    header: 'Classification',
    cell: ({ row }) => <div className="">{row?.original?.Classification}</div>, // Adjust text alignment
  },
  {
    accessorKey: 'Status',
    header: 'Availability',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 me-5 ${
          row?.original?.Status ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row?.original?.Status ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row?.original?.Status ? 'Available' : 'Unavailable'}</span>
      </div>
    )
  },
  {
    accessorKey: 'VehicleNumber', // Matches data key
    header: 'Vehicle Number',
    cell: ({ row }) => <div className="">{row?.original?.VehicleNumber}</div>, // Adjust text alignment
  },
  {
    accessorKey: 'VehicleModelType', // Matches data key
    header: 'Vehicle Model',
    cell: ({ row }) => <div className="">{row?.original?.VehicleModelType}</div>, // Adjust text alignment
  },
  {
    accessorKey: 'DriverName', // Matches data key
    header: 'Driver Name',
    cell: ({ row }) => <div className="">{row?.original?.DriverName}</div>, // Adjust text alignment
  },
  {
    accessorKey: 'DriverNumber', // Matches data key
    header: 'Driver Number',
    cell: ({ row }) => <div className="">{row?.original?.DriverNumber}</div>, // Adjust text alignment
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
