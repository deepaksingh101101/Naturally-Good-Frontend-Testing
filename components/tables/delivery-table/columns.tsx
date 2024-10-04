'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Check, Edit, Mail, Phone, ToggleRight, TruckIcon, X } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Assuming the `columns` is used within a table that receives the data in the expected format.
export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'Sno',
    header: 'Sno',
    cell: ({ row }) => <span>{row.index + 1}</span>,
  }
,  
  {
    accessorKey: 'UserId',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original?.UserId?.FirstName?.charAt(0)}
        </div>
        <span>{row.original?.UserId?.FirstName} {row.original?.UserId?.LastName} </span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'UserId',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[15px]">{row.original?.UserId?.Email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[15px]">{row.original?.UserId?.Phone}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'Deliveries',
    header: 'Delivery',
    cell: ({ row }) => (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-red-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-10 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned Routes</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bags</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Special Instruction</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {row.original.Deliveries.map((deliveryItem: any, index: any) => (
  <tr key={index} className="bg-blue-100">
    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{deliveryItem.DeliveryDate}</td>
    <td className="ps-10 pe-8 py-2 whitespace-nowrap text-sm text-gray-900">{deliveryItem.DeliveryTimeSlot}</td>
    <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-900">
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center ps-3 pe-2 py-1 ${
          deliveryItem.DeliveryStatus.toLowerCase() === 'delivered' ? 'bg-green-400' :
          deliveryItem.DeliveryStatus.toLowerCase() === 'pending' ? 'bg-yellow-400' :
          deliveryItem.DeliveryStatus.toLowerCase() === 'skipped' ? 'bg-red-500' :
          'bg-red-400'
        }`}
      >
        <span className="text-black font-bold pe-7">{deliveryItem.DeliveryStatus}</span>
      </div>
    </td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{deliveryItem.AssignedRoutes?.RouteName}</td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
    <ul>
  <li>
    {`${deliveryItem.Bag.BagID.BagName} (${deliveryItem.Bag.BagID.BagMaxWeight}g)`}
  </li>
</ul>


    </td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{deliveryItem.SpecialInstruction || 'N/A'}</td>
    <td className="px-4 flex items-center  justify-between py-2 cursor-pointer whitespace-nowrap text-sm">
      <Link  className=' bg-red-200 p-1 text-red-600' href={`/order/assignOrder?DeliveryId=${deliveryItem?._id}`}>
        <Edit height="16" width="16" />
      </Link>
      <div >
        <TruckIcon className='mx-2 bg-yellow-200 p-1 text-yellow-800' height="24" width="24" />
      </div>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    ),
  },
  {
    accessorKey: 'AddonsPrice',
    header: 'Addons Price',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center'>{row.original.AddonsPrice}</span>
      </div>
    ),
  },
  {
    accessorKey: 'SpecialInstructions',
    header: 'Special Instructions',
    cell: ({ row }) => (
      <div className="flex">
        <span className=''>{row.original.SpecialInstructions}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
