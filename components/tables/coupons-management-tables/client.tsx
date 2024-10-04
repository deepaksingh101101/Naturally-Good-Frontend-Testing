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
import { ProductManagement, ProductManagementData } from '@/constants/product-management-data';
import { CouponManagement, CouponManagementData } from '@/constants/coupons-management-data';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoupons } from '@/app/redux/actions/couponsActions';

export const CouponsManagementClient: React.FC = () => {
  const router = useRouter();
  const { coupons, loading, error, currentPage, totalPages ,totalCoupons} = useSelector((state: RootState) => state.coupon);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(2); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const fetchEmployees = async () => {
      await dispatch(getAllCoupons({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchEmployees();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (coupons) {
      setData(coupons);
    }
  }, [coupons]);


  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.code.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    // const sortedData = [...data].sort((a, b) => {
    //   if (sortOrder === 'asc') {
    //     return a.code.localeCompare(b.code);
    //   } else {
    //     return b.code.localeCompare(a.code);
    //   }
    // });
    // setData(sortedData);
  };
  const filters = [
    {
      label: 'Season ',
      subOptions: ['Winter', 'Autumn',],
    },
    {
      label: 'Priority',
      subOptions: ['High', 'Medium', 'Low'],
    },
  
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllCoupons({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllCoupons({ page: currentPage - 1, limit }));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Coupons (${totalCoupons})`}
          description="Manage Coupons (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/coupons-management`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKeys={["code"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}

        // onSort={handleSort} 
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
