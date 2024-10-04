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
import { Notification } from '@/constants/notification-management-data';
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Notification;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here, e.g., delete the notification
  };

  const viewNotificationDetails = () => {
    router.push(`/notifications/view/${data.id}`); 
  };

  const editNotificationDetails = () => {
    router.push(`/notifications/edit/${data.id}`); 
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
          <DropdownMenuItem onClick={viewNotificationDetails}>
            <Eye className="mr-2 h-4 w-4" /> View Details 
          </DropdownMenuItem>
         
          <DropdownMenuItem onClick={editNotificationDetails}>
            <Edit className="mr-2 h-4 w-4" /> Edit Notification
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Notification
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewNotificationDetails}>
            <Eye className="mr-2 h-4 w-4" /> Broadcast Now 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
