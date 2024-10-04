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
import { ComplaintManagement } from '@/constants/complaint-management-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };



  const editComplaintMessage = () => {
    router.push(`/complaint/edit/${data._id}`); 
  };

  const viewComplaint = () => {
    router.push(`/complaint/view/${data._id}`); 
  };


  // const recordResolution = () => {
  //   router.push(`/complaint-management/recordResolution/${data.complaintId}`); 
  // };



  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={editComplaintMessage}>
            <Edit className="mr-2 h-4 w-4" /> Edit Complaint
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewComplaint}>
            <Eye className="mr-2 h-4 w-4" /> View Complaint 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
