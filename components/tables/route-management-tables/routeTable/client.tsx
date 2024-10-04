'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns'; // Ensure columns are updated for route
import { Route, RouteData } from '@/constants/route';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllRoute } from '@/app/redux/actions/RouteActions';

export const RouteManagementClient: React.FC = () => {
  const router = useRouter();
  const { routes, loading, error, currentPage, totalPages ,totalRoutes} = useSelector((state: RootState) => state.route);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.routeName.toLowerCase().includes(searchValue.toLowerCase())
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
    const fetchSubscriptions = async () => {
      await dispatch(getAllRoute({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchSubscriptions();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (routes) {
      setData(routes);
    }
  }, [routes]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Routes (${totalRoutes})`}
          description="Manage Routes (Client-side table functionalities.)"
        />
    
      </div>
      <Separator />
      <DataTable
        columns={columns}
        searchKeys={['routeName', 'city', 'status', 'day', 'vehicleTagged', 'serviced']}
        data={data}
        filters={filters}
      />
    </>
  );
};
