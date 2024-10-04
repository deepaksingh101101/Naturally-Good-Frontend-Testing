// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import CouponsStatsComp from '@/components/forms/couponsStats/CouponsStats';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Order', 
        link: '/order-management'},
    ];

export default function CouponsStats() {
  return (
    <MainLayout meta={{ title: 'Coupons Stats' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CouponsStatsComp/>
      </div>
    </MainLayout>
  );
}

