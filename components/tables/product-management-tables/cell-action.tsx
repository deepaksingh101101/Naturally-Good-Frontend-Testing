'use client';

import { updateProductAvailability } from '@/app/redux/actions/productActions';
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
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, MoreHorizontal, Eye, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form'; // Import for form control
import { useDispatch } from 'react-redux';
import { z } from 'zod';

interface CellActionProps {
  data: any;  // Adjusted to receive full product data object
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggleModelOpen, setToggleModelOpen] = useState(false);
  const router = useRouter();

  // Accessing the product from Redux state (already received `data` prop)
  const productId = data._id; // Product ID extracted from `data` prop

  const productFormSchema = z.object({
    Available: z.string().min(1, 'Please Enter availability'),
  });

  // Initialize useForm hook with default values from data prop
  const methods = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      Available: data?.Available ? 'true' : 'false', // Pre-fill based on product availability
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = methods;

  useEffect(() => {
    // Set form values when the product changes
    if (data) {
      setValue('Available', data.Available ? 'true' : 'false');
    }
  }, [data, setValue]);

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const handleEditProduct = () => {
    router.push(`/product/edit/${productId}`);
  };

  const viewProduct = () => {
    router.push(`/product/view/${productId}`);
  };

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const updateAvailability = async (formData: any) => {
    setLoading(true);
    const response = await dispatch(updateProductAvailability({ id: data._id, available: formData.Available === 'true' }));
  
    if (response.type === "products/updateAvailability/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Availability updated!',
      });
    } else if (response.type === "products/updateAvailability/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update product availability',
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
                <DialogTitle>Toggle Product Availability</DialogTitle>
                <DialogDescription>Changing availability to no, cause product not listed anywhere</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit(updateAvailability)}>
                  <div className="flex flex-row items-end justify-between">
                    <FormField
                      control={control}
                      name="Available"
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
                                {field.value === 'true' ? 'Available' : 'Unavailable'}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Available</SelectItem>
                                <SelectItem value="false">Unavailable</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage>{errors.Available?.message}</FormMessage>
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
          <DropdownMenuItem onClick={handleEditProduct}>
            <Edit className="mr-2 h-4 w-4" /> Edit Product Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewProduct}>
            <Eye className="mr-2 h-4 w-4" /> View Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setToggleModelOpen(true)}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Product Availability
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
