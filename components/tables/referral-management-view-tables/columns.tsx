'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ReferralManagementView } from '@/constants/referral-management-view-data';
import { Phone } from 'lucide-react';

export const columns: ColumnDef<ReferralManagementView>[] = [
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
  // {
  //   accessorKey: 'id',
  //   header: 'ID'
  // },
  {
    accessorKey: 'referredBy',
    header: 'Referred By',
    cell: ({ row }) => {
      const { name, number, couponCode, couponStatus, expired } = row.original.referredBy;
      
      return (
        <div className="p-2 border rounded-lg shadow-md bg-green-50">
          <table className="min-w-full bg-white border border-green-200">
            <tbody>
              <tr className="border-b border-green-200">
                <td className="p-2 font-semibold text-green-700">Name:</td>
                <td className="p-2 text-green-800">{name}</td>
              </tr>
              <tr className="border-b border-green-200">
                <td className="p-2 font-semibold text-green-700">Number:</td>
                <td className="p-2 text-green-800 flex items-center"><span>{number}</span></td>
              </tr>
              <tr className="border-b border-green-200">
                <td className="p-2 font-semibold text-green-700">Coupon Code:</td>
                <td className="p-2 text-green-800">{couponCode}</td>
              </tr>
              <tr className="border-b border-green-200">
                <td className="p-2 font-semibold text-green-700">Coupon Status:</td>
                <td className="p-2 font-semibold text-green-700"  >
 <span  className={`  py-1  px-2   text-white  ${couponStatus === 'Used' ? 'bg-red-500  ' : 'bg-green-500'}`} > {couponStatus}</span>
</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-green-700">Expired:</td>
                <td className={`p-2 text-green-800 ${expired ? 'font-bold' : 'text-gray-600'}`}>
                <span className={`  py-1  px-2   text-white ${expired === true ? 'bg-red-500  ' : 'bg-green-500'}`} >  {expired ? 'Yes' : 'No'}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
,  
{
  accessorKey: 'referredTo',
  header: 'Referred To',
  cell: ({ row }) => {
    const { name, number, couponCode, couponStatus, expired } = row.original.referredTo;
    
    return (
      <div className="p-2 border rounded-lg shadow-md bg-green-50">
        <table className="min-w-full bg-white border border-green-200">
          <tbody>
            <tr className="border-b border-green-200">
              <td className="p-2 font-semibold text-green-700">Name:</td>
              <td className="p-2 text-green-800">{name}</td>
            </tr>
            <tr className="border-b border-green-200">
              <td className="p-2 font-semibold text-green-700">Number:</td>
              <td className="p-2 text-green-800 flex items-center"><span>{number}</span></td>
            </tr>
            <tr className="border-b border-green-200">
              <td className="p-2 font-semibold text-green-700">Coupon Code:</td>
              <td className="p-2 text-green-800">{couponCode}</td>
            </tr>
            <tr className="border-b border-green-200">
              <td className="p-2 font-semibold text-green-700">Coupon Status:</td>
              <td className="p-2 font-semibold text-green-700"  >
<span  className={`  py-1  px-2   text-white  ${couponStatus === 'Used' ? 'bg-red-500  ' : 'bg-green-500'}`} > {couponStatus}</span>
</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold text-green-700">Expired:</td>
              <td className={`p-2 text-green-800 ${expired ? 'font-bold' : 'text-gray-600'}`}>
              <span className={`  py-1  px-2   text-white ${expired === true ? 'bg-red-500  ' : 'bg-green-500'}`} >  {expired ? 'Yes' : 'No'}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
,
  {
    accessorKey: 'referredDate',
    header: 'Referred Date',
    cell: ({ row }) => (
      <span>{row.original.referredDate}</span>
    )
  },
  {
    accessorKey: 'referredStatus',
    header: 'Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center justify-center px-2 py-1 ${
          row.original.referredStatus === 'Subscription Purchased' ? 'bg-green-400' :
          row.original.referredStatus === 'Not Purchased' ? 'bg-red-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black bold'>{row.original.referredStatus}</span>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
