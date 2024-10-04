'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllDeliveryByDate } from '@/app/redux/actions/DeliveryActions';

// Helper function to convert dates to IST (Add 5 hours and 30 minutes)
const convertToIST = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 5, newDate.getMinutes() + 30);
  return newDate;
};

export const DeliveryClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Destructure the delivery state from the Redux store
  const { deliverys, loading, error, currentPage, totalDeliverys, totalPages } = useSelector(
    (state: RootState) => state.deliverys
  );

  // State to manage delivery data
  const [data, setData] = useState<any[]>([]);
  const [currentPageState, setCurrentPageState] = useState(currentPage || 1); // Local state for pagination
  // const [limit] = useState(5); // Fixed limit for items per page

  // State for managing date range
  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate?: Date }>({
    startDate: new Date(), // Default start date is today
    endDate: undefined, // Default end date is undefined
  });

  // Fetch deliveries when component mounts or on page changes
  useEffect(() => {
    const fetchDeliveries = async () => {
      await dispatch(
        getAllDeliveryByDate({
          page: currentPageState,
          // limit,
          startDate: convertToIST(dateRange.startDate), // Convert start date to IST
          endDate: dateRange.endDate ? convertToIST(dateRange.endDate) : undefined, // Convert end date to IST if available
        })
      );
    };
    fetchDeliveries();
  }, [dispatch, currentPageState]);

  // Effect to update local state when delivery data changes
  useEffect(() => {
    if (deliverys) {
      setData(deliverys);
    }
  }, [deliverys]);

  // Handler for date range picker changes
  const handleDateRangeChange = (startDate: Date, endDate?: Date) => {
    setDateRange({ startDate, endDate });
  };

  // Handler for search button click
  const handleSearch = () => {
    dispatch(
      getAllDeliveryByDate({
        page: 1,
        startDate: convertToIST(dateRange.startDate), // Convert start date to IST
        endDate: dateRange.endDate ? convertToIST(dateRange.endDate) : undefined, // Convert end date to IST if available
      })
    );
    setCurrentPageState(1); // Reset to first page on new search
  };

  // Handler for page change
  const handlePageChange = (newPage: number) => {
    setCurrentPageState(newPage);
    dispatch(
      getAllDeliveryByDate({
        page: newPage,
        startDate: convertToIST(dateRange.startDate), // Convert start date to IST
        endDate: dateRange.endDate ? convertToIST(dateRange.endDate) : undefined, // Convert end date to IST if available
      })
    );
  };

  // Filters for the DataTable
  const filters = [
    {
      label: 'Payment Status',
      subOptions: ['Paid', 'Unpaid'],
    },
    {
      label: 'Delivery Status',
      subOptions: ['Pending', 'Delivered', 'Cancelled'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Delivery (${totalDeliverys})`}
          description="Manage Delivery (Client side table functionalities.)"
        />
      </div>
      <Separator />

      <div className="flex justify-end items-center gap-2">
        <CalendarDateRangePicker
          onDateChange={handleDateRangeChange} // Update the state when date changes
          initialStartDate={dateRange.startDate} // Pass initial start date
          initialEndDate={dateRange.endDate} // Pass initial end date (optional)
        />
        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>
      <DataTable
        searchKeys={['customerName']}
        columns={columns}
        data={data}
        filters={filters}
        onSearch={handleSearch}
      />
    </>
  );
};
