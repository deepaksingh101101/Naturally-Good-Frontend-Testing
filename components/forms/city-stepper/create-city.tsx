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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createCity, updateCity } from '@/app/redux/actions/cityActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { useRouter } from 'next/navigation';

export interface CityFormData {
  CityName: string;
  SortOrder: number;
  Serviceable: boolean;
}

const cityFormSchema = z.object({
  CityName: z.string().min(1, 'City name is required'),
  SortOrder: z.number().nonnegative().int().min(1, 'Sort Order must be a positive integer'),
  Serviceable: z.boolean(),
});

export const CityForm: React.FC<{ initialData?: any | null,isDisabled?:boolean }> = ({ initialData,isDisabled }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<CityFormData>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: initialData || {
      CityName: '',
      SortOrder: undefined,
      Serviceable: true,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit: SubmitHandler<CityFormData> = async (data) => {
    try {
      setLoading(true);
      let response: any;
      if (initialData) {
        response = await dispatch(updateCity({ id: initialData._id, cityData: data }));
        if (response.type === 'city/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "City updated!",
          });
          router.push('/route-management-tables/city');
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload?.message || 'Failed to update city',
          });
        }
      } else {
        response = await dispatch(createCity(data));
        if (response.type === 'city/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "City created!",
          });
          form.reset();
          router.push('/route-management-tables/city');
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload?.message ,
          });
        }
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Internal server error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit City' : 'Create City'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={control}
              name="CityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      {...field}
                      placeholder="Enter City Name"
                    />
                  </FormControl>
                  <FormMessage>{errors.CityName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="SortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                      placeholder="Enter Sort Order"
                    />
                  </FormControl>
                  <FormMessage>{errors.SortOrder?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="Serviceable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviced</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isDisabled||loading}
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.Serviceable?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create City'}
          </Button>
        </form>
      </Form>
    </div>
  );
};