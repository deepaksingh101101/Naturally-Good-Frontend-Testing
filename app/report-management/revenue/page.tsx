
import { RenewalReport } from '@/components/analytics/RenewalReport';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { RevenueComponent } from '@/components/revenueReport/RevenueComponent';
import { SalesComponent } from '@/components/saleReport/SalesComponent';
import { ComplainClient } from '@/components/tables/complain-report-tables/client';
import { RenewalClient } from '@/components/tables/renewal-management-tables/client';
import { SaleClient } from '@/components/tables/sales-report-tables/client';
import { SkuClient } from '@/components/tables/sku-report-tables/client';

import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Revenue report', 
        link: '/report-management/renewal-report'},

    ];

export default function RevenueReportPage() {
  return (
    <MainLayout meta={{ title: 'Revenue report' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <RevenueComponent/>
      </div>
    </MainLayout>
  );
}