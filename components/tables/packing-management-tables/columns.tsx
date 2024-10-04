'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { OrderSnapshot } from '@/constants/packing-snapshot-data';
import { ColumnDef } from '@tanstack/react-table';
import { Calendar, Route } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<OrderSnapshot>[] = [
  {
    accessorKey: 'deliverySequence',
    header: 'Sequence',
    cell: ({ row }) => <span>{row.original.deliverySequence}</span>, // Displays Order Number
  },
  {
    accessorKey: 'route',
    header: 'Route',
    cell: ({ row }) => <span className='flex justify-center items-center' > <Route height={14} width={15} className='text-blue-500 me-2' /> <span>{row.original.route}</span></span>, // Displays Route
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ row }) => <span>{row.original.customerName}</span>, // Displays Customer Name
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <span>{row.original.address}</span>, // Displays Address
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile',
    cell: ({ row }) => <span>{row.original.mobile}</span>, // Displays Mobile Number
  },


  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => (
      <Accordion type="single" collapsible>
        <AccordionItem value="items-list">
          <AccordionTrigger className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">
            {row.original.items.length > 0 ? 'View Items' : 'No Items'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-2 bg-gray-100 rounded-lg shadow-md">
              <ul className="list-disc list-inside space-y-1">
                {row.original.items.length > 0 ? (
                  row.original.items.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))
                ) : (
                  <li className="text-gray-500">No items</li>
                )}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ), // Displays Items in an accordion with enhanced styling
  }
  ,
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date',
    cell: ({ row }) => <span>{row.original.deliveryDate}</span>, // Displays Mobile Number
  },

  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <span>{row.original.type}</span>, // Displays Type
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => <span>{row.original.note || 'N/A'}</span>, // Displays Note
  },
];
