'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EmployeeManagement } from '@/constants/employee-management-data'; // Make sure this type is correctly defined
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data:any; // Ensure EmployeeManagement type has necessary properties
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here (e.g., deleting an employee)
    setLoading(true);
    // Perform the delete action
    // On completion, close the modal
    setLoading(false);
    setOpen(false);
  };

  const editEmployeeDetails = () => {
    router.push(`/employee/edit/${data._id}`); // Use the unique identifier for routing
  };

  const viewEmployee = () => {
    router.push(`/employee/view/${data._id}`); // Use the unique identifier for routing
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Uncomment if needed
          <DropdownMenuItem onClick={handleRegisterNewSubscription}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Subscription
          </DropdownMenuItem>
          */}

          <DropdownMenuItem onClick={viewEmployee}>
            <Eye className="mr-2 h-4 w-4" /> View Employee 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={editEmployeeDetails}>
            <UserCheck className="mr-2 h-4 w-4" /> Edit Employee
          </DropdownMenuItem>
          {/* Uncomment if you want a delete option
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Employee
          </DropdownMenuItem>
          */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};