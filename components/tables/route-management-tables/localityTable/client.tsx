'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns'; // Ensure columns are updated for locality
import { Locality, LocalityData } from '@/constants/locality';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllLocality } from '@/app/redux/actions/localityActions';

export const LocalityManagementClient: React.FC = () => {
  const router = useRouter();
  const { localitys, loading, error, currentPage, totalPages ,totalLocalitys} = useSelector((state: RootState) => state.locality);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.sector.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  const filters = [
    {
      label: 'Sort By',
      subOptions: ['Ascending order', 'Descending order'],
    },
  ];

  
  useEffect(() => {
    const fetchCitys = async () => {
      await dispatch(getAllLocality({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchCitys();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (localitys) {
      setData(localitys);
    }
  }, [localitys]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllLocality({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllLocality({ page: currentPage - 1, limit }));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Localities (${totalLocalitys})`}
          description="Manage Localities (Client-side table functionalities.)"
        />
          <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/locality-management`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      
      </div>
      <Separator />
     
      <DataTable
        columns={columns}
        searchKeys={['sector', 'pincode']}
        data={data}
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
