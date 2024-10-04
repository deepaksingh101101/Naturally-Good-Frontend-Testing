'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '@/app/redux/actions/employeeActions';
import { AppDispatch, RootState } from '@/app/redux/store';

export const EmployeeManagementClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error, currentPage,totalEmployees, totalPages } = useSelector((state: RootState) => state.employees);

  const [data, setData] = useState<any[]>([]);
  const [limit] = useState(5); // Fixed limit for items per page

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    const fetchEmployees = async () => {
      await dispatch(getAllEmployees({ page: currentPage, limit })); // Pass page and limit as parameters
    };
    fetchEmployees();
  }, [dispatch, currentPage, limit]);

  // Effect to update local state when employee data changes
  useEffect(() => {
    if (employees) {
      setData(employees);
    }
  }, [employees]);

  const handleSearch = (searchValue: string) => {
    const filteredData = employees.filter(item =>
      item.FirstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.LastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.PhoneNumber.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const filters = [
    {
      label: 'Role',
      subOptions: ['Manager', 'Support Staff', 'Technician', 'Customer Service'],
    },
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllEmployees({ page: currentPage + 1, limit }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllEmployees({ page: currentPage - 1, limit }));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Employee (${totalEmployees})`}
          description="Manage Employee (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/employee`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable
        searchKeys={['FirstName', 'LastName', 'PhoneNumber']}
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