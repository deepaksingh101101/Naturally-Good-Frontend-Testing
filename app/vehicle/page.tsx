// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ComplaintManagementClient } from '@/components/tables/complaint-management-tables/client';
import ComplaintManagementUserPage from '@/components/tables/user-complaint-management-tables/client';
import VehicleManagementUserPage from '@/components/tables/vehicle-management-table/client';

const breadcrumbItems = [{ title: 'Complaint Management', link: '/dashboard/complaint-management' }];

export default function VehicleManagementPage() {
  return (
    <MainLayout meta={{ title: 'Vehicle Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <VehicleManagementUserPage  />
      </div>
    </MainLayout>
  );
}

