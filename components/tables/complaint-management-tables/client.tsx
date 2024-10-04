'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { UserManagement, userManagementData } from '@/constants/user-management-data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { SubscriptionManagement, SubscriptionManagementData } from '@/constants/subscription-management-data';
import { ComplaintManagement, ComplaintManagementData } from '@/constants/complaint-management-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllComplainType } from '@/app/redux/actions/complaintActions';

export const ComplaintManagementClient: React.FC = () => {
  const router = useRouter();
  const { complainTypes, loading, error, currentPage, totalPages ,totalComplaintTypes} = useSelector((state: RootState) => state.complainType);


  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(100); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchEmployees = async () => {
      await dispatch(getAllComplainType({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchEmployees();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (complainTypes) {
      setData(complainTypes);
    }
  }, [complainTypes]);

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.complaintType.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.complaintType.localeCompare(b.complaintType);
      } else {
        return b.complaintType.localeCompare(a.complaintType);
      }
    });
    setData(sortedData);
  };



  const filters = [
    {
      label: 'Status ',
      subOptions: ['Open', 'Closed',],
    },
    {
      label: 'Complain Type',
      subOptions: ['Delay', 'Bad Quality', 'Wrong Item', 'Not Reached'],
    },
  
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={` Create Complaint Type (${totalComplaintTypes})`}
          description="Complaint Subscription (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/complaint`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={["complaintType"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
        // onSort={handleSort} 
      />
    </>
  );
};
