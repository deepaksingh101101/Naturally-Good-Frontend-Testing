'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { UserManagement, userManagementData } from '@/constants/user-management-data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllUsers } from '@/app/redux/actions/userActions';

export const UserManagementClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, currentPage,totalUsers, totalPages } = useSelector((state: RootState) => state.users);


  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

    // Fetch data on component mount and when currentPage changes
    useEffect(() => {
      const fetchUsers = async () => {
        await dispatch(getAllUsers({ page: currentPage, limit })); // Pass page and limit as parameters
      };
      fetchUsers();
    }, [dispatch, currentPage, limit]);
  
    // Effect to update local state when employee data changes
    useEffect(() => {
      if (users) {
        setData(users);
      }
    }, [users]);
  

  const filters = [
    {
      label: 'Account Status',
      subOptions: ['Active', 'In Active', 'All Users'],
    },
    {
      label: 'Customer Type',
      subOptions: ['Lead', 'Prominent'],
    },
    {
      label: 'Payment Type',
      subOptions: ['Credit/Debit', 'UPI', 'Net Banking'],
    },
    {
      label: 'Subscription Type',
      subOptions: ['Trial', 'Weekly', 'Monthly', 'Fortnightly', 'Bi Weekly'],
    },
  ];

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.firstName.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };



  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.subscriptionType.localeCompare(b.subscriptionType);
      } else {
        return b.subscriptionType.localeCompare(a.subscriptionType);
      }
    });
    setData(sortedData);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllUsers({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllUsers({ page: currentPage - 1, limit }));
    }
  };


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Customers (${totalUsers})`}
          description="Manage Customers (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/profile`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={["firstName","lastName","phoneNumber"]}
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
