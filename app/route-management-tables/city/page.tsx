// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { CityManagementClient } from '@/components/tables/route-management-tables/cityTable/client';

const breadcrumbItems = [{ title: 'Complaint Management', link: '/dashboard/complaint-management' }];

export default function SubscriptionManagementPage() {
  return (
    <MainLayout meta={{ title: 'Route Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CityManagementClient  />
      </div>
    </MainLayout>
  );
}

