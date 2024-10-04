'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ReferralManagementView, ReferralManagementViewData } from '@/constants/referral-management-view-data';

export const ReferralManagementViewClient: React.FC = () => {
  const router = useRouter();
  const initialData: ReferralManagementView[] = ReferralManagementViewData;
  const [data, setData] = useState<ReferralManagementView[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.referredBy.couponCode.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.referredTo.couponCode.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.referredBy.couponCode.localeCompare(b.referredBy.couponCode);
      } else {
        return b.referredBy.couponCode.localeCompare(a.referredBy.couponCode);
      }
    });
    setData(sortedData);
  };

  const filters = [
    {
      label: 'Referred Status',
      subOptions: ['Subscription Purchased', 'Not Purchased'],
    },
    {
      label: 'Coupon Status',
      subOptions: ['Used', 'Unused'],
    },
    {
      label: 'Expired',
      subOptions: ['True', 'False'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Referrals (${data.length})`}
          description="Manage and view referrals (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable
        searchKeys={["referredBy.couponCode", "referredTo.couponCode"]}
        columns={columns}
        data={data}
        onSearch={handleSearch}
        filters={filters}
      />
    </>
  );
};
