import BreadCrumb from '@/components/breadcrumb';
import { CityForm } from '@/components/forms/city-stepper/create-city';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'City', link: '/dashboard/city' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Create City' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CityForm initialData={null} isDisabled={false} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
