'use client';

import { updateLocalityServiceableStatus } from '@/app/redux/actions/localityActions';
import { AppDispatch } from '@/app/redux/store';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Locality } from '@/constants/locality';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Eye, ToggleLeft, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

interface CellActionProps {
  data: any; // Update data type to Locality
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggleModelOpen, setToggleModelOpen] = useState(false);
  const router = useRouter();

  const zoneFormSchema = z.object({
    Serviceable: z.string().min(1, 'Please Enter Status'),
  });

  // Initialize useForm hook with default values from data prop
  const methods = useForm({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      Serviceable: data?.Serviceable===true?"true":"false", // Pre-fill based on product availability
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = methods;


  useEffect(() => {
    // Set form values when the product changes
    if (data) {
      setValue('Serviceable',data?.Serviceable===true?"true":"false");
    }
  }, [data, setValue]);

const onConfirm = async () => {
  // Your confirm logic here

};

  const editLocality = () => {
    router.push(`/locality-management/editLocality/${data.id}`); // Update path to locality-management with ID
  };
  
  const viewLocality = () => {
    router.push(`/locality-management/viewLocality/${data.id}`); // Update path to locality-management with ID
  };

  const deleteLocality = () => {
    setOpen(true);
  };
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const updateStatus = async (formData: any) => {
    setLoading(true);
    const response = await dispatch(updateLocalityServiceableStatus({ id: data._id, Serviceable: formData.Serviceable==="true"?true:false }));
  
    if (response.type === "locality/serviceable/fulfilled") {
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Status updated!',
      });
    } else if (response.type === "locality/serviceable/rejected") {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to update locality status',
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
                <DialogTitle>Toggle Zone Status</DialogTitle>
                <DialogDescription>Changing status to no, cause product not listed anywhere</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit(updateStatus)}>
                  <div className="flex flex-row items-end justify-between">
                    <FormField
                      control={control}
                      name="Serviceable"
                      render={({ field }) => (
                        <FormItem className='w-full' >
                          <FormLabel>Zone Status</FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              onValueChange={field.onChange} // Handle the value change as a string
                              value={field.value} // Ensure this is a string ('true' or 'false')
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
      <div className="flex justify-center gap-2">
       
        <Button 
          variant="outline" 
          onClick={editLocality}
          className="text-white bg-green-500 hover:bg-green-600 hover:text-white"
        >
          <Edit className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          onClick={deleteLocality}
          className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
        >
          <Eye className="h-4 w-4" /> 
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setToggleModelOpen(true)}
          className="bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
        >
          <ToggleLeft className="h-4 w-4" /> 
        </Button>
      </div>
    </>
  );
};
