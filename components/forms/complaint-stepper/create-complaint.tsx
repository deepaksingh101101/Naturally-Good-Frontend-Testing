'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { createComplainType, updateComplainType } from '@/app/redux/actions/complaintActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/app/redux/slices/authSlice';

const complaintFormSchema = z.object({
  ComplaintType: z.string().min(1, 'Complaint Type is required'),
  Description: z.string().min(1, 'Description is required'),
  Status: z.boolean(), // Expecting a boolean value here
});

interface ComplaintFormType {
  initialData: any | null;
  isDisabled?: boolean;
}

export type ComplaintTypeFormValues = z.infer<typeof complaintFormSchema>;

export const ComplaintForm: React.FC<ComplaintFormType> = ({ initialData, isDisabled }) => {

  const form = useForm<ComplaintTypeFormValues>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: initialData || {
      ComplaintType: '',
      Description: '',
      Status: true, // Default to true as boolean
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.complainType);

  const onSubmit = async (data:any) => {
    try {
      if ((isDisabled===false && initialData)) {
        // Update existing product
        const response = await dispatch(updateComplainType({ id: initialData._id, complainTypeData: data }));
        if (response.type === 'complainType/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Complain Type Updated!", // 'Item updated.'
          });
          router.push('/complaint-management')
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update product',
          });
        }
      } else {
        // Create new product
        const response = await dispatch(createComplainType(data));
        if (response.type === 'complainType/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Complain Created!", // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/complaint-management')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to create product',
          });
        }
      }
    } catch (error: any) {
      console.error('Submit Error:', error);
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'An error occurred while submitting the form',
      });
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };
  const title = (isDisabled && initialData) ? 'View Complain Types' :(isDisabled===false && initialData)? 'Edit Complain Type':"Create Complain Type"
  const description=(isDisabled && initialData) ? 'Details of Complain Type' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;

  return (
    <div className="container mx-auto p-4">
        <Heading title={title} description={description} />
        <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={control}
              name="ComplaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complaint Type</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isDisabled||loading} 
                      onChange={field.onChange} 
                      value={field.value} 
                      placeholder="Enter Complaint Type" 
                    />
                  </FormControl>
                  <FormMessage>{errors.ComplaintType?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select 
                      disabled={isDisabled||loading} 
                      onValueChange={(value) => field.onChange(value === 'true')} // Convert string to boolean
                      value={field.value ? 'true' : 'false'} // Ensure proper boolean mapping
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
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
          </div>

          <FormField
            control={control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isDisabled||loading} placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage>{errors.Description?.message}</FormMessage>
              </FormItem>
            )}
          />

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

          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Product':"Create Product"}     
            </Button>}
        </form>
      </Form>
    </div>
  );
};
