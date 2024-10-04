import BreadCrumb from '@/components/breadcrumb';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];
export default function page() {
  const isDisabled=false;

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 min-h-screen space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEmployeeForm  initialData={null} isDisabled={isDisabled} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
