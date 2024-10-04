'use client';

import { updateSubscriptionsStatus } from '@/app/redux/actions/subscriptionActions';
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
import { Subscription } from '@/constants/subscription-data';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, MoreHorizontal, Trash, Eye, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

interface SubscriptionCellActionProps {
  data: any;
}

export const SubscriptionCellAction: React.FC<SubscriptionCellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggleModelOpen, setToggleModelOpen] = useState(false);
  const router = useRouter();

  // Accessing the product from Redux state (already received `data` prop)
  const subscriptionId = data._id; // Product ID extracted from `data` prop

  const subscriptionFormSchema = z.object({
    Status: z.string().min(1, 'Please Enter availability'),
  });

  const methods = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      Status: data?.Status ? 'true' : 'false', // Pre-fill based on product availability
    },
  });
  const { control, handleSubmit, setValue, formState: { errors } } = methods;
  useEffect(() => {
    // Set form values when the product changes
    if (data) {
      setValue('Status', data.Status ? 'true' : 'false');
    }
  }, [data, setValue]);

  
  const handleEditSubscription = () => {
    router.push(`/subscription-form//edit/${data._id}`);
  };
  const handleViewSubscription = () => {
    router.push(`/subscription-form//view/${data._id}`);
  };
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const updateStatus = async (formData: any) => {
    setLoading(true);
    const response = await dispatch(updateSubscriptionsStatus({ id: data._id, Status: formData.Status === 'true' }));
  
    if (response.type === "subscriptions/updateStatus/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Status updated!',
      });
    } else if (response.type === "subscriptions/updateStatus/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update bag status',
      });
    }
    
    setLoading(false);
    setToggleModelOpen(false); // Close the dialog after processing
  };
  const onConfirm = async () => {
    // Your confirm logic here
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
                <DialogTitle>Toggle Product Availability</DialogTitle>
                <DialogDescription>Changing availability to no, cause product not listed anywhere</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit(updateStatus)}>
                  <div className="flex flex-row items-end justify-between">
                    <FormField
                      control={control}
                      name="Status"
                      render={({ field }) => (
                        <FormItem className='w-full' >
                          <FormLabel>Item Availability</FormLabel>
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
                          <FormMessage>{errors.Status?.message}</FormMessage>
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
          <DropdownMenuItem onClick={handleEditSubscription}>
            <Edit className="mr-2 h-4 w-4" /> Edit 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewSubscription}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e)=>{setToggleModelOpen(true)}}>
            <Eye className="mr-2 h-4 w-4" /> Toggle Status
          </DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
