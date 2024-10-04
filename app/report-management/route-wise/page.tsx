// app/dashboard/user-management/product-stock/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ProductStock } from '@/components/analytics/ProductStock';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PackWise } from '@/components/analytics/PackWise';
import { RouteReport } from '@/components/analytics/RouteStock';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/productStock'},
    { title: 'Product Stock', 
        link: '/report-management/productStock' }
];

export default function routeWisePage() {
  return (
    <MainLayout meta={{ title: 'Route Wise Report' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <RouteReport/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
