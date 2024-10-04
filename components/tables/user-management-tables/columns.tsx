'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Mail, Phone, MapPin } from 'lucide-react';
import { UserManagement, userManagementData } from '@/constants/user-management-data';
import { DataTable } from '@/components/ui/data-table';
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

export const columns: ColumnDef<any>[] = [

  {
    accessorKey: 'sno',
    header: 'SNo',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-red-600 font-bold px-1" style={{ borderRadius: '50%' }}>
          {row.index + 1} {/* Adding 1 to make the index start from 1 instead of 0 */}
        </span>
      </div>
    ),
  }
,  
  {
    accessorKey: 'FirstName',
    header: 'First Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.FirstName.charAt(0)}
        </div>
        <span>{row.original.FirstName}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'LastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'Phone',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.Email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.Phone}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'Address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.original.Address;
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-red-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">House Number</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Society Locality</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Zip Code</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.HouseNumber ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.SocietyLocality ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.Sector ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.City.CityName ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.State ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{address?.ZipCode ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    },
  }
  
  
  
,  
  {
    accessorKey: 'AccountStatus',
    header: 'Account Status',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center px-2 py-1 ${
          row.original.AccountStatus === true ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row.original.AccountStatus === true ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row.original.AccountStatus===true?"Active":"Inactive"}</span>
      </div>
    ),
  },

  {
    accessorKey: 'Allergies',
    header: 'Allergies',
  },
  {
    accessorKey: 'AlternateAddress',
    header: 'AlternateAddress',
  },
  {
    accessorKey: 'AlternateContactNumber',
    header: 'Alternate Contact Number',
  },
  {
    accessorKey: 'AlternateAddress',
    header: 'AlternateAddress',
  },
  {
    accessorKey: 'AssignedEmployee.Email',
    header: 'AssignedEmployee',
  },
  {
    accessorKey: 'CreatedAt',
    header: 'CreatedAt',
  },
  {
    accessorKey: 'UpdatedAt',
    header: 'UpdatedAt',
  },
  {
    accessorKey: 'CreatedBy.Email',
    header: 'CreatedBy',
  },
  {
    accessorKey: 'UpdatedBy.Email',
    header: 'UpdatedBy',
  },
  {
    accessorKey: 'CustomerType.Name',
    header: 'Customer Type',
  },
  {
    accessorKey: 'DOB',
    header: 'Date of Birth',
  },
  {
    accessorKey: 'ExtraNotes',
    header: 'Extra Notes',
  },
  {
    accessorKey: 'Gender',
    header: 'Gender',
  },
  {
    accessorKey: 'Height',
    header: 'Height',
  },
  {
    accessorKey: 'Weight',
    header: 'Weight',
  },
  {
    accessorKey: 'Preferences',
    header: 'Preferences',
  },
  {
    accessorKey: 'Source.Name',
    header: 'Source',
  },
  {
    accessorKey: 'WhatDoYouUsuallyCook',
    header: 'WhatDoYouUsuallyCook',
  },


  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
