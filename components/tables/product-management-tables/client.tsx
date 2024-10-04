'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';  // Ensure you have defined the columns for the product table
import { ProductManagement, ProductManagementData } from '@/constants/product-management-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllProducts } from '@/app/redux/actions/productActions';

export const ProductManagementClient: React.FC = () => {
  const router = useRouter();
  // const initialData: ProductManagement[] = ProductManagementData;
  const { products, loading, error, currentPage, totalPages ,totalProducts} = useSelector((state: RootState) => state.products);


  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(2); // Fixed limit for items per page

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchEmployees = async () => {
      await dispatch(getAllProducts({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchEmployees();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);

  // Handle search functionality
  const handleSearch = (searchValue: string) => {
    // const filteredData = products.filter(item =>
    //   item.itemName.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  // Handle sorting functionality
  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.itemName.localeCompare(b.itemName);
      } else {
        return b.itemName.localeCompare(a.itemName);
      }
    });
    setData(sortedData);
  };

  // Define filters for the product data table
  const filters = [
    {
      label: 'Season',
      subOptions: ['Winter', 'Autumn'],
    },
    {
      label: 'Priority',
      subOptions: ['High', 'Medium', 'Low'],
    },
  ];
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllProducts({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllProducts({ page: currentPage - 1, limit }));
    }
  };


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Items (${totalProducts})`}
          description="Manage Items (Client-side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/product`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      
      {/* Data Table for displaying products */}
      <DataTable
        searchKeys={['itemName']}
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
