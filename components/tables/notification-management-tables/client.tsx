'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Notification, NotificationData } from '@/constants/notification-management-data';
import { Columns } from './columns';

export const NotificationManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: Notification[] = NotificationData;
  const [data, setData] = useState<Notification[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.heading.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const filters = [
    {
      label: 'Type',
      subOptions: ['System', 'Feature', 'Reminder', 'Alert'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Notifications (${data.length})`}
          description="Manage Notifications (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/settings-management/notifications/createNotification`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={['heading', 'description']}
        columns={Columns}
        data={data}
        onSearch={handleSearch}
        filters={filters}
      />
    </>
  );
};
