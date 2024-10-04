'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [ // Updated type to Route
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
    accessorKey: 'RouteName',
    header: 'Route Name',
  },
  {
    accessorKey: 'City',
    header: 'City',
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={`flex justify-center px-2 py-1 rounded ${row.original.Status ? 'bg-green-500' : 'bg-red-500'}`}
      >
        <span className="text-white">{row.original.Status ? 'Active' : 'Inactive'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Days',
    header: 'Days',
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.Days.length > 0 ? row.original.Days.join(', ') : 'No Days'}
      </div>
    ),
  },
  {
    accessorKey: 'VehicleTagged',
    header: 'Vehicles Tagged',
    cell: ({ row }) => (
      <div className="flex flex-col">
        {Array.isArray(row.original.VehicleTagged) && row.original.VehicleTagged.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-green-300">Vehicle Name</th>
                <th className="border p-2 bg-green-300">Driver Name</th>
                <th className="border p-2 bg-green-300">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {row.original.VehicleTagged.map((vehicle: any) => (
                <tr key={vehicle._id}>
                  <td className="border p-2">{vehicle.VehicleName}</td>
                  <td className="border p-2">{vehicle.DriverName}</td>
                  <td className="border p-2">{vehicle.DriverNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No vehicles tagged</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'serviced',
    header: 'Serviced',
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.serviced ? 'Yes' : 'No'}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction data={row.original} />, // Ensure CellAction handles Route
  }
];
