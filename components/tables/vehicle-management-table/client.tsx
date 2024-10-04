'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ComplaintManagementUser, ComplaintManagementUserData } from '@/constants/complaint-management-data-user';
import { VehicleManagement, VehicleManagementData } from '@/constants/vehicle-management';

const VehicleManagementUserPage: React.FC = () => {
  const router = useRouter();
  const initialData: VehicleManagement[] = VehicleManagementData;
  const [data, setData] = useState<VehicleManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const lowercasedValue = searchValue.toLowerCase();
    const filteredData = initialData.filter(item =>
      Object.keys(item).some(key => 
        (item as any)[key].toString().toLowerCase().includes(lowercasedValue)
      )
    );
    setData(filteredData);
  };



  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Vehicle Management  (${data.length})`}
          description="Vehicle Management (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/vehicle-management`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={["phone","name", "description", "complaintType"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
      />
    </>
  );
};

export default VehicleManagementUserPage;
