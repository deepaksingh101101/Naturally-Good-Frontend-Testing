'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import MainLayout from '@/components/layout/main-layout';
import BreadCrumb from '@/components/breadcrumb';
import { NotificationManagementClient } from '@/components/tables/notification-management-tables/client';


export const NotificationSettingForm: React.FC = () => {
  
  return (
<>
        <NotificationManagementClient  />
    
    </>
  );
};

export default NotificationSettingForm;
