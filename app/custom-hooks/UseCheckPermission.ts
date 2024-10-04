"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionStorageItem } from '@/utils/localStorage';

export const useCheckPermission = (requiredRoute: string) => { // Use named export
  const router = useRouter();
  const permissions = JSON.parse(getSessionStorageItem('permission') || '[]');

  useEffect(() => {
    const hasPermission = permissions.some((permission: any) =>
      permission.details.some((detail: any) => detail.href === requiredRoute && detail.isAllowed)
    );

    if (!hasPermission) {
      router.push('/dashboard'); // Redirect to dashboard if no permission
    }
  }, [requiredRoute, permissions, router]);
};