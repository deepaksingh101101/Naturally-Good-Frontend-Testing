'use client';

import { updateCityServiceableStatus } from '@/app/redux/actions/cityActions';
import { AppDispatch } from '@/app/redux/store';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { City } from '@/constants/city';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Trash, Eye, ToggleRightIcon } from 'lucide-react';
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

  const cityFormSchema = z.object({
    Status: z.string().min(1, 'Please Enter availability'),
  });

  const methods = useForm({
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      Status: data?.Serviceable ? 'true' : 'false', // Pre-fill based on product availability
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = methods;
  useEffect(() => {
    if (data) {
      setValue('Status', data.Serviceable ? 'true' : 'false'); // Update form value based on data
    }
  }, [data, setValue]);

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const updateStatus = async (formData: { Status: string }) => {
    setLoading(true);
    const response = await dispatch(updateCityServiceableStatus({ id: data._id, Serviceable: formData.Status === 'true' }));

    if (response.type === "city/serviceable/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Status updated!',
      });
    } else if (response.type === "city/serviceable/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update status',
      });
    }

    setLoading(false);
    setToggleModelOpen(false); // Close the dialog after processing
  };

  const onConfirm = async () => {
    // Perform deletion action here
  };

  const editCity = () => {
    router.push(`/city-management/edit/${data._id}`);
  };

  const toggleStatus = () => {
    setOpen(true);
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
              <DialogTitle>Toggle City Availability</DialogTitle>
              <DialogDescription>Changing availability to no will cause the city to not be listed anywhere.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(updateStatus)}>
                <div className="flex flex-row items-end justify-between">
                  <FormField
                    control={control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>City Serviceable</FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value} // Use the string value directly
                          >
                            <SelectTrigger>
                              {field.value === 'true' ? 'Yes' : 'No'}
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
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
      <div className="flex justify-center gap-2">
        <Button 
          variant="outline" 
          color="green"
          onClick={editCity}
          className="text-white bg-green-500 hover:bg-green-600 hover:text-white"
        >
          <Edit className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          color="red"
          onClick={() => setToggleModelOpen(true)}
          className="bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
        >
          <ToggleRightIcon className="h-4 w-4" /> 
        </Button>
      </div>
    </>
  );
};
