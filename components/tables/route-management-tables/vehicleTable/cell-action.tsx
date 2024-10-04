'use client';

import { updateVehicleServiceableStatus } from '@/app/redux/actions/vehicleActions';
import { AppDispatch } from '@/app/redux/store';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Eye, ToggleRightIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

interface CellActionProps {
  data: any; // Update data type to Vehicle
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggleModelOpen, setToggleModelOpen] = useState(false);

  const router = useRouter();

  const vehicleFormSchema = z.object({
    Status: z.string().min(1, 'Please Enter availability'),
  });

  const methods = useForm({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      Status: data?.Status ? 'true' : 'false', // Pre-fill based on product availability
    },
  });

  console.log(data)
  const { control, handleSubmit, setValue, formState: { errors } } = methods;
  useEffect(() => {
    if (data) {
      setValue('Status', data.Status ? 'true' : 'false'); // Update form value based on data
    }
  }, [data, setValue]);

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const updateStatus = async (formData: { Status: string }) => {
    setLoading(true);
    const response = await dispatch(updateVehicleServiceableStatus({ id: data._id, Status: formData.Status === 'true' }));

    if (response.type === "vehicle/serviceable/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Status updated!',
      });
    } else if (response.type === "vehicle/serviceable/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update status',
      });
    }

    setLoading(false);
    setToggleModelOpen(false); // Close the dialog after processing
  };
  const onConfirm = async () => {

  };

  const editVehicle = () => {
    router.push(`/vehicle-management/edit/${data._id}`); // Update path to vehicle-management
  };
  const viewVehicle = () => {
    router.push(`/vehicle-management/view/${data._id}`); // Update path to vehicle-management
  };

  const deleteVehicle = () => {
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
              <DialogTitle>Toggle Vehicle Availability</DialogTitle>
              <DialogDescription>Changing availability to no will cause the vehicle to not be listed anywhere.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(updateStatus)}>
                <div className="flex flex-row items-end justify-between">
                  <FormField
                    control={control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Vehicle Availability</FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value} // Use the string value directly
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
          onClick={editVehicle}
          className="text-white bg-green-500 hover:bg-green-600 hover:text-white"
        >
          <Edit className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          onClick={viewVehicle}
          className="text-white bg-blue-500 hover:bg-blue-600 hover:text-white"
        >
          <Eye className="h-4 w-4" /> 
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
