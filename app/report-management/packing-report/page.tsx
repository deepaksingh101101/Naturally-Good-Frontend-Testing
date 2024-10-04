
import { RenewalReport } from '@/components/analytics/RenewalReport';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { PackingClient } from '@/components/tables/packing-management-tables/client';
import { RenewalClient } from '@/components/tables/renewal-management-tables/client';

import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Renewal report', 
        link: '/report-management/renewal-report'},

    ];

export default function PackingReportPage() {
  return (
    <MainLayout meta={{ title: 'Packing/Delivery Report' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PackingClient/>
      </div>
    </MainLayout>
  );
}