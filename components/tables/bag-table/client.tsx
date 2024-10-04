'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Bag, BagData } from '@/constants/bag-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllBags } from '@/app/redux/actions/bagActions';

export const BagClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { bags, loading, error, currentPage,totalBags, totalPages } = useSelector((state: RootState) => state.bags);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page
  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    const fetchEmployees = async () => {
      await dispatch(getAllBags({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchEmployees();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (bags) {
      setData(bags);
    }
  }, [bags]);

  const handleSearch = (searchValue: string) => {
    const filteredData = bags?.filter(item =>
      item.bagName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllBags({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllBags({ page: currentPage - 1, limit }));
    }
  };


  const filters = [
    {
      label: 'Status',
      subOptions: ['Available', 'Out of Stock'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Bags (${totalBags})`}
          description="Manage Bags (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/bag-management`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={['bagName']}
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
