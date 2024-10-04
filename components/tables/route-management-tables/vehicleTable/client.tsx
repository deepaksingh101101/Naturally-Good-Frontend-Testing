'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns'; // Adjust this import based on your actual columns for vehicles
import { Vehicle, VehicleManagementData } from '@/constants/vehicle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllVehicle } from '@/app/redux/actions/vehicleActions';

export const VehicleManagementClient: React.FC = () => {
  const router = useRouter();
  const { vehicles, loading, error, currentPage, totalPages ,totalVehicle} = useSelector((state: RootState) => state.vehicles);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.vehicleName.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      await dispatch(getAllVehicle({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchSubscriptions();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (vehicles) {
      setData(vehicles);
    }
  }, [vehicles]);

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
          title={`Vehicles (${totalVehicle})`}
          description="Manage Vehicles (Client-side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/vehicle-management`)} // Adjust the route if needed
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        searchKeys={['vehicleName','vehicleNumber','driverName','driverNumber','vehicleModel','classification']}
        data={data}
        filters={filters}
      />
    </>
  );
};
