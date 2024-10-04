'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createVehicle, updateVehicle } from '@/app/redux/actions/vehicleActions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface VehicleFormData {
  _id?:string;
  VehicleName: string;
  Classification: string;
  VehicleNumber: string;
  DriverName: string;
  Status: string;
  DriverNumber: string;
  VehicleModelType: string;
}

const vehicleFormSchema = z.object({
  VehicleName: z.string().min(1, 'Vehicle name is required'),
  Classification: z.string().min(1, 'Classification is required'),
  VehicleNumber: z.string().min(1, 'Vehicle number is required'),
  DriverName: z.string().min(1, 'Driver name is required'),
  DriverNumber: z.string().length(10, 'Driver number must be exactly 10 characters long'),
  VehicleModelType: z.string().min(1, 'Vehicle model is required'),
  Status: z.string().min(1, 'Please Enter availability'),
});

export const VehicleForm: React.FC<{ initialData?: any ,isDisabled?:boolean}> = ({ initialData,isDisabled }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: initialData?{
      ...initialData,
      Status: initialData?.Status ? 'true' : 'false',
    } : {
      VehicleName: '',
      Classification: '',
      VehicleNumber: '',
      DriverName: '',
      DriverNumber: '',
      VehicleModelType: '',
      Status: "true",
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    try {
      setLoading(true);
      if ((isDisabled===false && initialData)) {
        // Update existing product
        const response = await dispatch(updateVehicle({ id: initialData._id, vehicleData: data }));
        if (response.type === 'vehicle/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Vehicle Updated", // 'Item updated.'
          });
          router.push('/route-management-tables/vehicle')
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update product',
          });
        }
      } else {
        // Create new product
        const response = await dispatch(createVehicle(data));
        if (response.type === 'vehicle/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Vehicle Created", // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/route-management-tables/vehicle')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || `Oop's Something went's wrong`,
          });
        }
      }
    } catch (error:any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message ||'An error occurred while submitting the form',
      });
    } finally {
      setLoading(false);
    }
  };
  const title = (isDisabled && initialData) ? 'View Vehicle' :(isDisabled===false && initialData)? 'Edit Vehicle':"Create Vehicle"
  const description=(isDisabled && initialData) ? 'Details of Vehicle' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;

  return (
    <div className="container mx-auto p-4">
      <Heading title={title} description={description} />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={control}
              name="VehicleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Vehicle Name"
                    />
                  </FormControl>
                  <FormMessage>{errors.VehicleName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="Classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classification</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Classification"
                    />
                  </FormControl>
                  <FormMessage>{errors.Classification?.message}</FormMessage>
                </FormItem>
              )}
            />
         
            <FormField
              control={control}
              name="VehicleNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Vehicle Number"
                    />
                  </FormControl>
                  <FormMessage>{errors.VehicleNumber?.message}</FormMessage>
                </FormItem>
              )}
            />
              <FormField
              control={control}
              name="VehicleModelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Vehicle Model"
                    />
                  </FormControl>
                  <FormMessage>{errors.VehicleModelType?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="DriverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Driver Name"
                    />
                  </FormControl>
                  <FormMessage>{errors.DriverName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="DriverNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Driver Number"
                    />
                  </FormControl>
                  <FormMessage>{errors.DriverNumber?.message}</FormMessage>
                </FormItem>
              )}
            />

<FormField
  control={form.control}
  name="Status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Vehicle Availability</FormLabel>
      <FormControl>
        <Select
          disabled={isDisabled || loading}
          onValueChange={field.onChange} // Handle the value change as string
          value={field.value} // Ensure this is a string ('true' or 'false')
        >
          <SelectTrigger  disabled={isDisabled||loading}
 >
            <SelectValue placeholder="Select Status" />
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


          
          </div>
          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Vehicle':"Create Vehicle"}     
            </Button>}
        </form>
      </Form>

      {
  isDisabled === true && initialData && (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Created By:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.CreatedBy?.FirstName} {initialData?.CreatedBy?.LastName}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
          {initialData?.CreatedBy?.PhoneNumber}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated By:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.UpdatedBy?.FirstName} {initialData?.UpdatedBy?.LastName}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
          {initialData?.UpdatedBy?.PhoneNumber}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Created At:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.CreatedAt} 
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated At:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.UpdatedAt} 
        </p>
      </div>
    </div>
  )
}
    </div>
  );
};
