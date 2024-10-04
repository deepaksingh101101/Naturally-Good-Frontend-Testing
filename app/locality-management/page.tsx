import BreadCrumb from '@/components/breadcrumb';
import { LocalityForm } from '@/components/forms/loacality-stepper/create-locality';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Complaint', link: '/dashboard/complaint' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Create Complaint' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <LocalityForm/>
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
