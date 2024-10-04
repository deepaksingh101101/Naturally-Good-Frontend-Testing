import BreadCrumb from '@/components/breadcrumb';
import { CreateAdminForm } from '@/components/forms/admin-stepper/create-admin';
import { ComplaintForm } from '@/components/forms/complaint-stepper/create-complaint';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComplaintManagementData } from '@/constants/complaint-management-data';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];
export default function page() {
  // Example structure of user options

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>

    <ScrollArea className="h-full">
      <div className="flex-1 min-h-screen space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateAdminForm  initialData={null} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
