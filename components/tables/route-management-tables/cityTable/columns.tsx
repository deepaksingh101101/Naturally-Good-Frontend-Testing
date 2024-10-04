'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'CityName',
    header: 'City Name',
    cell: ({ row }) => row.original.CityName || 'N/A',
  },
  {
    accessorKey: 'SortOrder',
    header: () => (
      <div className="text-center">Sort Order</div> // Center-align Sort Order header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original?.SortOrder ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'RouteIncludedCount',
    header: () => (
      <div className="text-center">Route Count</div> // Center-align Route Count header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original?.RouteIncludedCount ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'ZoneIncludedCount',
    header: () => (
      <div className="text-center">Zone Count</div> // Center-align Zone Count header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original?.ZoneIncludedCount ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'Serviceable',
    header: () => (
      <div className="text-center">Serviceable</div> // Center-align Serviceable header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original?.Serviceable ? 'Yes' : 'No'}
      </div>
    )
  },
  {
    accessorKey: 'CreatedBy',
    header: 'Created By',
    cell: ({ row }) => {
      const createdBy = row.original?.CreatedBy;
      return createdBy
        ? `${createdBy?.FirstName} ${createdBy?.LastName} (${createdBy?.PhoneNumber})`
        : 'N/A';
    }
  },
  {
    accessorKey: 'UpdatedBy',
    header: 'Updated By',
    cell: ({ row }) => {
      const updatedBy = row.original?.UpdatedBy;
      return updatedBy
        ? `${updatedBy?.FirstName} ${updatedBy?.LastName} (${updatedBy?.PhoneNumber})`
        : 'N/A';
    }
  },
  {
    accessorKey: 'CreatedAt',
    header: () => (
      <div className="text-center">Created At</div> // Center-align Serviceable header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original?.CreatedAt }
      </div>
    )
  },
  {
    accessorKey: 'UpdatedAt',
    header: () => (
      <div className="text-center">Updated At</div> // Center-align Serviceable header
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original?.UpdatedAt}
      </div>
    )
  },
  {
    id: 'actions',
    header: () => (
      <div className="text-center">Action</div> // Center-align Action header
    ),
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
