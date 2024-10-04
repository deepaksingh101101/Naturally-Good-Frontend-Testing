'use client'; // This ensures the component is rendered on the client side

import BreadCrumb from '@/components/breadcrumb';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { getEmployeeById } from '@/app/redux/actions/employeeActions';
import { RootState, AppDispatch } from '@/app/redux/store';
import { BagForm } from '@/components/forms/bag-stepper/create-bag';
import { getBagById } from '@/app/redux/actions/bagActions';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams(); // Use useParams to get the route parameters
  const id = params.id; // Access the ID directly

  // Retrieve employee data from the Redux store
  const bags:any = useSelector((state: RootState) => state.bags.selectedBag);
  const loading = useSelector((state: RootState) => state.bags.loading); // Assuming you have a loading state
  const isDisabled=false;
  useEffect(() => {
    // Check if the ID is present before dispatching the action
    if (id) {
      dispatch(getBagById(id as string)); // Dispatch the action to fetch employee by ID
    }
  }, [id, dispatch]);

  return (
    <MainLayout meta={{ title: 'Bag Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 min-h-screen space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          {loading ? ( // Show loading state if data is being fetched
            <p>Loading Bag data...</p>
          ) : (
            <BagForm initialData={bags} isDisabled={isDisabled}/>
          )}
        </div>
      </ScrollArea>
    </MainLayout>
  );
}