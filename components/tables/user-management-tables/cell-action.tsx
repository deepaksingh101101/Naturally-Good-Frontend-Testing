'use client';

import { toggleAccountStatus } from '@/app/redux/actions/userActions';
import { AppDispatch } from '@/app/redux/store';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { UserManagement } from '@/constants/user-management-data';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggleModelOpen, setToggleModelOpen] = useState(false);
  const router = useRouter();
  const onConfirm = async () => {
    //  confirm logic here
  };


  const FormSchema = z.object({
    AccountStatus: z.string().min(1, 'Please Enter Status'),
  });

  // Initialize useForm hook with default values from data prop
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      AccountStatus: data?.AccountStatus ? 'true' : 'false', // Pre-fill based on product availability
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = methods;

  useEffect(() => {
    // Set form values when the product changes
    if (data) {
      setValue('AccountStatus', data.AccountStatus ? 'true' : 'false');
    }
  }, [data, setValue]);

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const handleEditUser = () => {
    router.push(`/profile/edit/${data._id}`); 
  };

  const handleViewUser = () => {
    router.push(`/profile/view/${data._id}`); 
  };

  const handleStatusChange = () => {

  };

  const updateAccountStatus= async (formData: any) => {
    setLoading(true);
    const response = await dispatch(toggleAccountStatus({ id: data._id, AccountStatus: formData.AccountStatus === 'true' }));
  console.log(response)
    if (response.type === "user/updateAccountStatus/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Account Status updated!',
      });
    } else if (response.type === "user/updateAccountStatus/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update Account Status',
      });
    }
    
    setLoading(false);
    setToggleModelOpen(false); // Close the dialog after processing
  };
  
  return (
    <>
     <Form {...methods}>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
          <Dialog open={toggleModelOpen} onOpenChange={setToggleModelOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Toggle User Status</DialogTitle>
                <DialogDescription>Changing availability to no, cause user not listed anywhere</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit(updateAccountStatus)}>
                  <div className="flex flex-row items-end justify-between">
                    <FormField
                      control={control}
                      name="AccountStatus"
                      render={({ field }) => (
                        <FormItem className='w-full' >
                          <FormLabel>User Status</FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              onValueChange={field.onChange} // Handle the value change as a string
                              value={field.value} // Ensure this is a string ('true' or 'false')
                            >
                              <SelectTrigger>
                                {field.value === 'true' ? 'Active' : 'Inactive'}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage>{errors.AccountStatus?.message}</FormMessage>
                        </FormItem>
                      )}
                    />
                  <Button className='ms-2' disabled={loading} type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
      </Form>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

         
          <DropdownMenuItem onClick={handleEditUser}>
            <Edit className="mr-2 h-4 w-4" /> Edit Customer Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewUser}>
            <Eye className="mr-2 h-4 w-4" /> View Customer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setToggleModelOpen(true)}>
            <UserCheck className="mr-2 h-4 w-4" /> Toggle Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
