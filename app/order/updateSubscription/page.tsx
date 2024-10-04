// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ModifyDelivery } from '@/components/forms/modifyDelivery/ModifyDelivery';
import OrderView from '@/components/forms/orderForm/OrderForms';
import { SubscriptionUpdate } from '@/components/forms/subscription-updation/susbription-updation';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [{ title: 'Upgrade/Downgrade Subscription', link: '/dashboard/order-management' }];

export default function UpdateSubscriptionPage() {
  return (
    <MainLayout meta={{ title: 'Upgrade/Downgrade Subscription' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SubscriptionUpdate initialData={null}/>
      </div>
    </MainLayout>
  );
}

