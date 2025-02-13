'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Zone, ZoneManagementData } from '@/constants/zones';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllZone } from '@/app/redux/actions/zoneActions';

export const ZoneManagementClient: React.FC = () => {
  const router = useRouter();
  const { zones, loading, error, currentPage, totalPages ,totalZones} = useSelector((state: RootState) => state.zones);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const fetchCitys = async () => {
      await dispatch(getAllZone({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchCitys();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (zones) {
      setData(zones);
    }
  }, [zones]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllZone({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllZone({ page: currentPage - 1, limit }));
    }
  };

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.zoneName.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
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
          title={`Zones (${totalZones})`}
          description="Manage Zones (Client-side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        searchKeys={['zoneName','city', 'serviced', 'deliverySequence', 'deliveryCost']}
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
