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
import { ReferralManagement } from '@/constants/referral-management-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: ReferralManagement;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const handleCreateNewReferral = () => {
    router.push('/referral-management/create'); 
  };

  const editReferral = () => {
    router.push(`/referral-management/edit/${data.id}`); 
  };

  const viewReferral = () => {
    router.push(`/referral-management/view/${data.id}`); 
  };

  const updateReferralStatus = () => {
    router.push(`/referral-management/update-status/${data.id}`); 
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

          {/* <DropdownMenuItem onClick={handleCreateNewReferral}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Referral
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={editReferral}>
            <Edit className="mr-2 h-4 w-4" /> Edit Coupon
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={viewReferral}>
            <Eye className="mr-2 h-4 w-4" /> View Referral
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={updateReferralStatus}>
            <UserCheck className="mr-2 h-4 w-4" /> Toggle Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Coupon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
