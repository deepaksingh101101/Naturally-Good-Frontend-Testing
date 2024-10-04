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
import { VehicleManagement } from '@/constants/vehicle-management';
import { Edit, MoreHorizontal, Trash, Eye, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: VehicleManagement;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Logic to delete the vehicle goes here
  };

  const editVehicle = () => {
    router.push(`/vehicle-management/editVehicle`);
  };

  const viewVehicle = () => {
    router.push(`/vehicle-management/viewVehicle`);
  };

  const updateVehicleStatus = () => {
    router.push(`/vehicle-management/updateVehicleStatus`);
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
          <DropdownMenuItem onClick={editVehicle}>
            <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewVehicle}>
            <Eye className="mr-2 h-4 w-4" /> View Vehicle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={updateVehicleStatus}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Vehicle Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Vehicle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
