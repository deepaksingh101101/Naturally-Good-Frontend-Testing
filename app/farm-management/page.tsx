import BreadCrumb from '@/components/breadcrumb';
import { CreateFarmForm } from '@/components/forms/farm-stepper/create-farm';
import { CreateOrder } from '@/components/forms/order-stepper/create-order';
import { CreateProductForm } from '@/components/forms/product-stepper/create-product';
import { CreateSubscriptionOne } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Farm', link: '/dashboard/farm' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Farm Management' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateFarmForm  initialData={null} isDisabled={false} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
