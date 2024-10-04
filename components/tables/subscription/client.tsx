'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Subscription, SubscriptionData } from '@/constants/subscription-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllSubscriptions } from '@/app/redux/actions/subscriptionActions';

export const SubscriptionClient: React.FC = () => {
  const router = useRouter();
  const { subscriptions, loading, error, currentPage, totalPages ,totalSubscriptions} = useSelector((state: RootState) => state.subscriptions);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      await dispatch(getAllSubscriptions({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchSubscriptions();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (subscriptions) {
      setData(subscriptions);
    }
  }, [subscriptions]);


  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.subscriptionType.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  const handleSave = () => {
    // Save the data to the server or localStorage or any persistence storage
    console.log('Data saved:', data);
    // Implement the logic to save the data
  };
  const filters = [
    {
      label: 'Subscription Type',
      subOptions: ['Trial', 'Weekly', 'Monthly', 'Fortnightly', 'Bi Weekly'],
    },
  ];
    const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllSubscriptions({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllSubscriptions({ page: currentPage - 1, limit }));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Subscription (${totalSubscriptions})`}
          description="Manage Subscription (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/subscription-form`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={["subscriptionType"]}
        columns={columns}
        data={data}
        onSearch={handleSearch}
        filters={filters}
      />
           <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
