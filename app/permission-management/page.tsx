// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import PermissionForm from '@/components/forms/permission-form/Permission';
import { SettingForm } from '@/components/forms/settingsForm/SettingForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Settings', 
        link: '/settings-management/general'},
        { title: 'General Settings', 
            link: '/settings-management/general' }
    ];

export default function PermissionSettings() {
  return (
    <MainLayout meta={{ title: 'Permissions Settings' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PermissionForm/>
      </div>
    </MainLayout>
  );
}

