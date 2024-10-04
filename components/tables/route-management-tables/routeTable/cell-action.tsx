'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Route } from '@/constants/route'; // Update the import path to match your project structure
import { Edit, Eye, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Route; // Update data type to Route
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
    setLoading(true);
    // Simulate deletion process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setOpen(false);
    // Perform deletion action here
    // For example, make an API call to delete the route
    // await fetch(`/api/routes/${data.id}`, { method: 'DELETE' });
  };

  const editRoute = () => {
    router.push(`/route-management/editRoute/${data.id}`); // Update path to route-management with ID
  };
  
  const viewRoute = () => {
    router.push(`/route-management/viewRoute`); // Update path to route-management with ID
  };

  const deleteRoute = () => {
    setOpen(true);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex justify-center gap-2">
        <Button 
          variant="outline" 
          onClick={viewRoute} // Updated to viewRoute
          className="text-white bg-blue-500 hover:bg-blue-600 hover:text-white"
        >
          <Eye className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          onClick={editRoute} // Updated to editRoute
          className="text-white bg-green-500 hover:bg-green-600 hover:text-white"
        >
          <Edit className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          onClick={deleteRoute} // Updated to deleteRoute
          className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
        >
          <Trash className="h-4 w-4" /> 
        </Button>
      </div>
    </>
  );
};
