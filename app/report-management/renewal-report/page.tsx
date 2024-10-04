
import { RenewalReport } from '@/components/analytics/RenewalReport';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { RenewalClient } from '@/components/tables/renewal-management-tables/client';

import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Renewal report', 
        link: '/report-management/renewal-report'},

    ];

export default function RenewalReportPage() {
  return (
    <MainLayout meta={{ title: 'Report And Analytics' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        {/* <RenewalReport/> */}
        <RenewalClient/>
      </div>
    </MainLayout>
  );
}