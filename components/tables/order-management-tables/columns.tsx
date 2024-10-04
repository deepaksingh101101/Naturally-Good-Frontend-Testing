'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrderManagement } from '@/constants/order-management-data';
import { CellAction } from './cell-action';
import { Briefcase, Check, Edit, Mail, Phone, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust the import path as necessary
import upi from '@/public/assets/icons/upi.png';
import credit from '@/public/assets/icons/credit.png';
import net from '@/public/assets/icons/net.png';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
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
  accessorKey: 'SubscriptionId',
  header: 'Subscription',
  cell: ({ row }) => (
    <div className="flex flex-col me-5">
      <div className="flex items-center mt-1">
        <Briefcase className="text-blue-500 mr-2" width={15} height={15} />
        <span className="text-[15px]">{row.original?.SubscriptionId?.SubscriptionTypeId?.Name +" "+ row.original?.SubscriptionId?.FrequencyId?.Name}</span>
      </div>
      <div className="flex items-center mt-2">
        <Briefcase className="text-green-500 mr-2" width={15} height={15} />
        <span className="text-[15px]">{row.original?.SubscriptionId?.Bag?.BagName } </span><span className='ms-1 text-green-500' >{`( ${row.original?.SubscriptionId?.Bag?.BagMaxWeight})`}</span>
      </div>
    </div>
  ),
},
// {
//     accessorKey: 'Deliveries',
//     header: 'Deliveries Count',
//     cell: ({ row }) => <span>{row.original?.Deliveries?.length()}</span>,
// },
{
    accessorKey: 'NetPrice',
    header: 'Net Price',
    cell: ({ row }) => 
    
    <div className="flex justify-center">
      <span>₹{row.original?.NetPrice}</span>
      </div>
},
{
    accessorKey: 'AmountReceived',
    header: 'Amount Received',
    cell: ({ row }) => 
      <div className="flex justify-center">

    <span>₹{row.original?.AmountReceived}</span>
    </div>

},
{
    accessorKey: 'AmountDue',
    header: 'AmountDue',
    cell: ({ row }) =>
      <div className="flex justify-center">

      <span>₹{row.original?.NetPrice}</span>
      </div>
},
{
    accessorKey: 'DeliveryStartDate',
    header: 'Delivery Start Date',
    cell: ({ row }) => <span>{row.original?.DeliveryStartDate}</span>,

  },
{
    accessorKey: 'BookingDate',
    header: 'Booking Date',
    cell: ({ row }) => <span>{row.original?.BookingDate}</span>,
  },
  {
    accessorKey: 'PaymentDate',
    header: 'Payment Date',
    cell: ({ row }) => <span>{row.original?.PaymentDate}</span>,
  },

  {
    accessorKey: 'PaymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: '20px' }} 
        className={`flex items-center px-2 py-1 ${row.original?.PaymentStatus === 'paid' ? 'bg-green-400' : row.original?.paymentStatus === 'unpaid' ? 'bg-red-400' : 'bg-yellow-400'}`}
      >
        {row.original?.PaymentStatus === 'paid' ? (
          <Check width={16} height={16} className="text-green-800 mr-2" />
        ) : (
          <X width={16} height={16} className={row.original?.PaymentStatus === 'unpaid' ? 'text-red-800 mr-2' : 'text-yellow-800 mr-2'} />
        )}
        <span className="font-bold text-black">{row.original?.PaymentStatus}</span>
      </div>
    ),
  }
,  

{
  accessorKey: 'PaymentType',
  header: 'Payment Type',
  cell: ({ row }) => (
    <div className="flex items-center justify-center  me-9">
      {row.original?.PaymentType === 'upi' && <Image src={upi.src} alt="UPI" width={20} height={20} />}
      {row.original?.PaymentType === 'card' && <Image src={credit.src} alt="Credit Card" width={20} height={20} />}
      {row.original?.PaymentType === 'netbanking' && <Image src={net.src} alt="Net Banking" width={20} height={20} />}
      {row.original?.PaymentType === 'cash' && <Image src={net.src} alt="Net Banking" width={20} height={20} />}
      <span className="ml-2">{row.original?.PaymentType}</span>
    </div>
  ),
},


  {
    accessorKey: 'Coupons',
    header: 'Coupons Code',
    cell: ({ row }) => {
      const coupon = row.original?.Coupons;
      return coupon ? (
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1 text-left font-semibold">Code</th>
                <th className="px-2 py-1 text-left font-semibold">Type</th>
                <th className="px-2 py-1 text-left font-semibold">Status</th>
                <th className="px-2 py-1 text-left font-semibold">Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1 border">{coupon.Code}</td>
                <td className="px-2 py-1 border">{coupon.DiscountType}</td>
                <td className={`px-2 py-1 border ${coupon.Status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{coupon.Status}</td>
                <td className="px-2 py-1 border">{coupon.DiscountPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <span>No Coupon</span>
      );
    }
  }
,  

{
  accessorKey: 'ManualDiscountPercentage',
  header: 'Manual Discount Percentage',
  cell: ({ row }) => {
    const percentage = row.original?.ManualDiscountPercentage;
    const roundedPercentage = percentage !== undefined ? Math.round(percentage) : 0; // Default to 0 if undefined

    return (
      <div className="flex justify-center">
        <span className='text-center'>{roundedPercentage} %</span>
      </div>
    );
  },
}
,
{
  accessorKey: 'IsCurrentOrder',
  header: 'Is Current Order',
  cell: ({ row }) => (
    <div className="flex justify-center">
      <span 
        className={`text-center font-bold ${row.original?.IsCurrentOrder ? 'text-green-500' : 'text-red-500'}`}
      >
        {row.original?.IsCurrentOrder ? 'Yes' : 'No'}
      </span>
    </div>
  ),
}
, 
  {
    accessorKey: 'Deliveries',
    header: 'Deliveries',
    cell: ({ row }) => (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className='bg-red-100'>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-10 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned Employee</th> */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned Route</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {row.original?.Deliveries?.slice(0, 1).map((delivery:any, index:any) => (
              <tr key={index} className='bg-blue-100'>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{delivery?.DeliveryDate}</td>
                <td className="ps-10 pe-8 py-2 whitespace-nowrap text-sm text-gray-900">{delivery?.DeliveryTime}</td>
                <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-900">
                  <div 
                    style={{ borderRadius: "20px" }}
                    className={`flex items-center  justify-center  me-2 pe-2 py-1 ${
                      delivery.Status === 'delivered' ? 'bg-green-400' :
                      delivery.Status === 'pending' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                  >
                    <span className='text-black bold px-8 '>{delivery.Status}</span>
                  </div>
                </td>
                <td className="ps-12 pe-4 py-2 whitespace-nowrap text-end text-sm text-gray-900">{delivery.AssignedRoute?.RouteName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {row.original?.Deliveries?.length > 1 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="more-deliveries">
              <AccordionTrigger>View All</AccordionTrigger>
              <AccordionContent>
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {row.original?.Deliveries.slice(1).map((delivery:any, index:any) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                        <td className="ps-2 py-2 whitespace-nowrap text-sm text-gray-900">{delivery?.DeliveryDate}</td>
                        <td className="ps-0 py-2 whitespace-nowrap text-sm text-gray-900">{delivery?.DeliveryTime}</td>
                        <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-900">
                          <div 
                            style={{ borderRadius: "20px" }}
                            className={`flex items-center justify-center px-2 py-1 ${
                              delivery.Status === 'delivered' ? 'bg-green-400' :
                              delivery.Status === 'pending' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                          >
                            <span className='text-black bold'>{delivery.Status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-end  whitespace-nowrap text-sm text-gray-900">{delivery?.AssignedRoute?.RouteName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    ),
  }
,  
  
{
  accessorKey: 'SpecialInstruction',
  header: 'Special Instructions',
  cell: ({ row }) => {
    const instruction = row.original?.SpecialInstruction;
    const trimmedInstruction = instruction?.length > 30 ? `${instruction.slice(0, 30)}...` : instruction;

    return (
      <div className="flex">
        <span>{trimmedInstruction}</span>
      </div>
    );
  },
}
,
  {
    accessorKey: 'UserId',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original?.UserId?.Email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original?.UserId?.Phone}</span>
        </div>
      </div>
    ),
  },
  {
  accessorKey: 'CreatedBy',
  header: 'Created By',
  cell: ({ row }) => (
    <div className="flex flex-col me-5">
      <div className="flex items-center mt-1">
        <Mail className="text-blue-500 mr-2" width={10} height={10} />
        <span className="text-[12px]">{row.original?.CreatedBy?.FirstName +" "+row.original?.CreatedBy?.LastName}</span>
      </div>
      <div className="flex items-center mt-2">
        <Phone className="text-green-500 mr-2" width={10} height={10} />
        <span className="text-[12px]">{row.original?.CreatedBy?.Email}</span>
      </div>
    </div>
  ),
},
{
  accessorKey: 'UpdatedBy',
  header: 'Updated By',
  cell: ({ row }) => (
    <div className="flex flex-col me-5">
      <div className="flex items-center mt-1">
        <Mail className="text-blue-500 mr-2" width={10} height={10} />
        <span className="text-[12px]">{row.original?.UpdatedBy?.FirstName +" "+row.original?.UpdatedBy?.LastName}</span>
      </div>
      <div className="flex items-center mt-2">
        <Phone className="text-green-500 mr-2" width={10} height={10} />
        <span className="text-[12px]">{row.original?.UpdatedBy?.Email}</span>
      </div>
    </div>
  ),
},
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
