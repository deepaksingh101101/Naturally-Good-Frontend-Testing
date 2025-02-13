import BreadCrumb from '@/components/breadcrumb';
import { CreateSubscriptionOne } from '@/components/forms/subscription-stepper/create-subscription';
import IsHavePermission from '@/components/IsHavePermission';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/layout/protected-route';
import { DeliveryClient } from '@/components/tables/delivery-table/client';
import { SubscriptionClient } from '@/components/tables/subscription/client';

const breadcrumbItems = [{ title: 'Delivery', link: '/dashboard/delivery-management' }];

export default function SubscriptionPage() {
  return (
    <ProtectedRoute>
    {/* <IsHavePermission requiredRoute="/delivery-management"> */}
    <MainLayout meta={{ title: 'Delivery' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <DeliveryClient />
      </div>
    </MainLayout>
    {/* </IsHavePermission> */}
    </ProtectedRoute>
  );
}
