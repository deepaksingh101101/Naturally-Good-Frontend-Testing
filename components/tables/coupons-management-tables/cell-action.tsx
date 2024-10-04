'use client';

import { updateCouponStatus } from '@/app/redux/actions/couponsActions';
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
import { CouponManagement } from '@/constants/coupons-management-data';
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

    // Accessing the product from Redux state (already received `data` prop)
    const couponId = data._id; // Product ID extracted from `data` prop

    const couponStatusFormSchema = z.object({
      Status: z.string().min(1, 'Please Enter Status'),
    });

    const methodsOfStatus = useForm({
      resolver: zodResolver(couponStatusFormSchema),
      defaultValues: {
        Status: data?.Status, // Pre-fill based on product availability
      },
    });
    const { control, handleSubmit, setValue, formState: { errors } } = methodsOfStatus;
    useEffect(() => {
      // Set form values when the product changes
      if (data) {
        setValue('Status', data.Available);
      }
    }, [data, setValue]);
  

  const onConfirm = async () => {
    // Logic for delete confirmation
  };

  const handleEditCoupon = () => {
    router.push(`/coupons-management/edit/${data._id}`); 
  };
  const handleViewCoupon = () => {
    router.push(`/coupons-management/view/${data._id}`); 
  };
  const handleViewStats = () => {
    router.push(`/coupons-management/stats/${data._id}`); 
  };

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const updateStatus = async (formData: any) => {
    setLoading(true);
    const response = await dispatch(updateCouponStatus({ id: data._id, Status: formData.Status }));
  
    if (response.type === "coupon/status/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Status updated!',
      });
    } else if (response.type === "coupon/status/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update status',
      });
    }
    
    setLoading(false);
    setToggleModelOpen(false); // Close the dialog after processing
  };



  return (
    <>
   <Form {...methodsOfStatus}>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
          <Dialog open={toggleModelOpen} onOpenChange={setToggleModelOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Toggle Coupon Status</DialogTitle>
                <DialogDescription>Changing Status to no, cause coupon not listed anywhere</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit(updateStatus)}>
                  <div className="flex flex-row items-end justify-between">
                    <FormField
                      control={control}
                      name="Status"
                      render={({ field }) => (
                        <FormItem className='w-full' >
                          <FormLabel>Coupon Status</FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              onValueChange={field.onChange} // Handle the value change as a string
                              value={field.value} // Ensure this is a string ('true' or 'false')
                            >
                              <SelectTrigger>
                                {field.value === 'Active' ? 'Active' : 'Inactive'}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage/>
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
          <DropdownMenuItem onClick={handleEditCoupon}>
            <Edit className="mr-2 h-4 w-4" /> Edit Coupon Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewCoupon}>
            <Edit className="mr-2 h-4 w-4" /> View Coupon
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setToggleModelOpen(true)}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Coupon Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewStats}>
            <Edit className="mr-2 h-4 w-4" /> View Coupons Stats
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditCoupon}>
            <Edit className="mr-2 h-4 w-4" /> Assign Customers
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
