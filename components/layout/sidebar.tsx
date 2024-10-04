'use client';
import React, { useState, useEffect } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { getSessionStorageItem } from '@/utils/localStorage';
import { NavItem } from '@/types'; // Adjust the import path as necessary
import { Icons } from '@/components/icons';

interface PermissionDetail {
  actionName: string;
  isAllowed: boolean;
  href: string;
  isInSidebar: boolean;
}

interface Permission {
  permissionId: string;
  moduleName: string;
  icon: keyof typeof Icons; // This should match your defined icon keys
  details: PermissionDetail[];
}

export default function Sidebar({ className }: { className?: string }) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  useEffect(() => {
    const permissions: Permission[] = getSessionStorageItem('permission') || [];

    const dynamicItems = permissions.flatMap((permission) =>
      permission.details
        .filter(detail => detail.isInSidebar)
        .map(detail => ({
          title: permission.moduleName,
          href: detail.href,
          icon: permission.icon as keyof typeof Icons,
          isAllowed: detail.isAllowed,
        }))
    );

    // Define static nav items
    const staticItems: NavItem[] = [
      { title: 'Dashboard', href: '/dashboard', icon: 'dashboard' }, // Example static item
      {
        title: 'Route Management',
        href: '/route-management',
        icon: 'settings',
        label: 'Route Management',
        subItems: [
          {
            title: 'City Master',
            href: '/route-management-tables/city',
            icon: 'paymentSetting',
            label: 'payment-settings'
          },
          {
            title: 'Vehicle Master',
            href: '/route-management-tables/vehicle',
            icon: 'paymentSetting',
            label: 'payment-settings'
          },
          {
            title: 'Zone Master',
            href: '/zone-management/zones',
            icon: 'paymentSetting',
            label: 'payment-settings'
          },
          {
            title: 'Locality Master',
            href: '/locality',
            icon: 'paymentSetting',
            label: 'payment-settings'
          },
          {
            title: 'Route Master',
            href: '/route-management',
            icon: 'paymentSetting',
            label: 'payment-settings'
          },
        ]
      },
      {
        title: 'Delivery Management',
        href: '/delivery-management',
        icon: 'order',
        label: 'Delivery Management'
      },
      {
        title: 'Coupons Management',
        href: '/coupons',
        icon: 'order',
        label: 'Coupon Management'
      },
      {
        title: 'Report And Analytics',
        href: '/report-management',
        icon: 'report',
        label: 'create-report',
        subItems: [
          {
            title: 'Renewal Report',
            href: '/report-management/renewal-report',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Customer Snapshot',
            href: '/report-management/snapshot-report',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Packing/Delivery Report',
            href: '/report-management/packing-report',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Complain Summary Report',
            href: '/report-management/complain-report',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'SKU Wise Order Report',
            href: '/report-management/sku',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Revenue Report',
            href: '/report-management/revenue',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Sale Report',
            href: '/report-management/sales',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          {
            title: 'Farm Report',
            href: '/report-management/farm-report',
            icon: 'accountStatement',
            label: 'account-statement'
          },
          // {
          //   title: 'Account Statement',
          //   href: '/report-management/account-statement',
          //   icon: 'accountStatement',
          //   label: 'account-statement'
          // },
          // {
          //   title: 'Invoice Summary',
          //   href: '/report-management/invoice-summary',
          //   icon: 'invoiceSummary',
          //   label: 'invoice-summary'
          // },
          // {
          //   title: 'Sales Report',
          //   href: '/report-management/sales-report',
          //   icon: 'salesReport',
          //   label: 'sales-report'
          // },
          // {
          //   title: 'Bill Summary',
          //   href: '/report-management/bill-summary',
          //   icon: 'billSummary',
          //   label: 'bill-summary'
          // },
          // {
          //   title: 'Product Stock',
          //   href: '/report-management/product-stock',
          //   icon: 'productStock',
          //   label: 'product-stock'
          // },
          // {
          //   title: 'Packwise Report',
          //   href: '/report-management/pack-wise',
          //   icon: 'productStock',
          //   label: 'product-stock'
          // },
          // {
          //   title: 'Routewise Report',
          //   href: '/report-management/route-wise',
          //   icon: 'productStock',
          //   label: 'product-stock'
          // },
          // {
          //   title: 'Transaction',
          //   href: '/report-management/transaction',
          //   icon: 'transaction',
          //   label: 'transaction'
          // },
          // {
          //   title: 'Income Summary',
          //   href: '/report-management/income-summary',
          //   icon: 'incomeSummary',
          //   label: 'income-summary'
          // },
          // {
          //   title: 'Tax Summary',
          //   href: '/report-management/tax-summary',
          //   icon: 'transaction',
          //   label: 'tax-summary'
          // }
        ]
      },
      { title: 'Farm Management', href: '/farm-management', icon: 'dashboard' }, // Example static item

    ];

    // Concatenate static and dynamic items
    const allNavItems = staticItems.concat(dynamicItems);

    setNavItems(allNavItems);
  }, []);

  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r pt-20 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}