'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { City, CityManagementData } from '@/constants/city';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllCity } from '@/app/redux/actions/cityActions';

export const CityManagementClient: React.FC = () => {
  const router = useRouter();
  const { citys, loading, error, currentPage, totalPages ,totalCitys} = useSelector((state: RootState) => state.citys);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCitys = async () => {
      await dispatch(getAllCity({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchCitys();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (citys) {
      console.log(citys)
      setData(citys);
    }
  }, [citys]);


  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.name.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllCity({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllCity({ page: currentPage - 1, limit }));
    }
  };
  const filters = [
    {
      label: 'Sort By',
      subOptions: ['Ascending order', 'Descending order'],
    },
  ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`City (${totalCitys})`}
          description="Manage City (Client-side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/city-management`)} // Adjust the route if needed
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        searchKeys={['name']}
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
