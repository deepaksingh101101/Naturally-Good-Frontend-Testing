// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { VehicleManagementClient } from '@/components/tables/route-management-tables/vehicleTable/client';

const breadcrumbItems = [{ title: 'Complaint Management', link: '/dashboard/complaint-management' }];

export default function VehiclePage() {
  return (
    <MainLayout meta={{ title: 'Vehicle Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <VehicleManagementClient  />
      </div>
    </MainLayout>
  );
}

