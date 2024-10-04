// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ModifyDelivery } from '@/components/forms/modifyDelivery/ModifyDelivery';
import OrderView from '@/components/forms/orderForm/OrderForms';
import { SubscriptionCancel } from '@/components/forms/subscription-cancelation/susbription-cancelation';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [{ title: 'Cancel Subscription', link: '/dashboard' }];

export default function CancelSubscriptionPage() {
  return (
    <MainLayout meta={{ title: 'Cancelation and Refund' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SubscriptionCancel initialData={null}/>
      </div>
    </MainLayout>
  );
}

