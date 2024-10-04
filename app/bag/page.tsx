import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { BagClient } from '@/components/tables/bag-table/client';

const breadcrumbItems = [{ title: 'Bag', link: '/dashboard/bag' }];

export default function BagPage() {
  return (
    <MainLayout meta={{ title: 'Bag' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BagClient />
      </div>
    </MainLayout>
  );
}
