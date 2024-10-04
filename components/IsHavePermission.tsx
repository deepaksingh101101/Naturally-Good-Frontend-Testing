// components/IsHavePermission.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionStorageItem } from '@/utils/localStorage';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/app/redux/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoute: string; // Pass the required route as a prop
}

// Define the structure of the permission object
interface PermissionDetail {
  href: string;
  isAllowed: boolean;
}

interface Permission {
  details: PermissionDetail[];
}

const useCheckPermission = (requiredRoute: string) => {
  // Retrieve permissions from session storage
  const permissions: Permission[] = getSessionStorageItem('permission') || []; // Default to an empty array

  // Check if the user has permission to access the required route
  const hasPermission = permissions.some((permission) =>
    permission.details.some((detail) => detail.href === requiredRoute && detail.isAllowed)
  );

  return hasPermission; // Return the permission status
};

export const IsHavePermission: React.FC<ProtectedRouteProps> = ({ children, requiredRoute }) => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router here
  // const hasPermission = useCheckPermission(requiredRoute); // Call the custom hook with the required route

  useEffect(() => {
    dispatch(setLoading(true)); // Set loading to true when the component mounts

    const permissions: Permission[] = getSessionStorageItem('permission') || []; // Default to an empty array

    // Check if the user has permission to access the required route
    const hasPermission = permissions.some((permission) =>
      permission.details.some((detail) => detail.href === requiredRoute && detail.isAllowed)
    );
console.log('hasPermission', hasPermission)
    if (!hasPermission) {
      dispatch(setLoading(false)); // Set loading to false if no permission and redirect
      router.push('/dashboard'); // Redirect to dashboard if no permission
    } else {
      dispatch(setLoading(false)); // Set loading to false if permission is granted
    }
  }, [dispatch, router]); // Run effect when dispatch, permission status, or router changes

  return <>{children}</>; // Render children if permission is granted
};

export default IsHavePermission;