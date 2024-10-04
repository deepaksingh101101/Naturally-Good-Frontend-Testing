'use client'; // This ensures the component is rendered on the client side

import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { RootState, AppDispatch } from '@/app/redux/store';
import { getProductById } from '@/app/redux/actions/productActions';
import { CreateProductForm } from '@/components/forms/product-stepper/create-product';
import { getSubscriptionById } from '@/app/redux/actions/subscriptionActions';
import { CreateSubscriptionForm } from '@/components/forms/subscription-form/subscriptionForm';

const breadcrumbItems = [{ title: 'Subscription', link: '/subscriptions' }];

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams(); // Use useParams to get the route parameters
  const id = params.id; // Access the ID directly

  // Retrieve employee data from the Redux store
  const subscriptions = useSelector((state: RootState) => state.subscriptions?.selectedSubscription);

  const loading = useSelector((state: RootState) => state.subscriptions.loading); // Assuming you have a loading state
  const isDisabled = true; // Disable the form while loading

  useEffect(() => {
    // Check if the ID is present before dispatching the action
    if (id) {
      dispatch(getSubscriptionById(id as string)); // Dispatch the action to fetch employee by ID
    }
  }, [id, dispatch]);

  return (
    <MainLayout meta={{ title: 'Edit Subscription' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 min-h-screen space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          {loading ? ( // Show loading state if data is being fetched
            <p>Loading subscription data...</p>
          ) : (
            <CreateSubscriptionForm initialData={subscriptions} isDisabled={isDisabled} />
          )}
        </div>
      </ScrollArea>
    </MainLayout>
  );
}