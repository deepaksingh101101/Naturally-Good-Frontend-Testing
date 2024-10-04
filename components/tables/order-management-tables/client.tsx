'use client';
import React from 'react'; // Add this line at the top of your file



import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllOrders } from '@/app/redux/actions/orderActions';

export const OrderManagementClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { orders, loading, error, currentPage, totalOrders } = useSelector(
    (state: RootState) => state.order
  );

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filteredData = orders.filter(item =>
      item.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllOrders({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchOrders();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when orders data changes
  useEffect(() => {
    if (orders) {
      setData(orders);
    }
  }, [orders]);

  const filters = [
    {
      label: 'Payment Status',
      subOptions: ['Paid', 'Unpaid'],
    },
    {
      label: 'Delivery Status',
      subOptions: ['Pending', 'Delivered', 'Canceled'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Order (${totalOrders})`}
          description="Manage Orders (Client-side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="flex justify-end">
        <CalendarDateRangePicker />
      </div>
      {loading ? ( // Show loading state while fetching data
        <div className="flex justify-center py-4">Loading...</div>
      ) : (
        <DataTable
          searchKeys={["customerName"]}
          columns={columns}
          data={data}
          filters={filters}
          onSearch={handleSearch}
        />
      )}
      {error && ( // Display error if there's an issue
        <div className="text-red-500">{error}</div>
      )}
    </>
  );
};
