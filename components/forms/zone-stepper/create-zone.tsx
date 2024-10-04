'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import apiCall from '@/lib/axios';
import { debounce } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createZone, updateZone } from '@/app/redux/actions/zoneActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { useRouter } from 'next/navigation';

// Define the schema for form validation
const zoneFormSchema = z.object({
  ZoneName: z.string().min(1, 'Zone Name is required'),
  Serviceable: z.boolean(),
  DeliveryCost: z.number().positive().min(0, 'Delivery Cost must be a positive number'),
  City: z.string().min(1, 'City is required'),
});

const servicedOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const ZoneForm: React.FC<{ initialData?: any; isDisabled?: boolean }> = ({ initialData, isDisabled }) => {
  const [loading, setLoading] = useState(false);
  const [fetchedCity, setFetchedCity] = useState<{ label: string; value: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | null>(null);
  const [servicedStatus, setServicedStatus] = useState<{ label: string; value: string } | null>(null); // For the serviced field
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCity = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        setFetchedCity([]);
        return;
      }

      try {
        const response = await apiCall('GET', `/route/city/filter?CityName=${term}`);
        if (response.status) {
          const cities = response.data.cities.map((city: any) => ({
            label: city.CityName,
            value: city._id,
          }));
          setFetchedCity(cities);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchCity(searchTerm);
  }, [searchTerm, fetchCity]);

  useEffect(() => {
    if (initialData) {
      // Prefill form fields with initialData
      setSelectedCity({
        label: initialData.city?.CityName,
        value: initialData.city?._id,
      });
      setServicedStatus({
        label: initialData.zone?.Serviceable ? 'Yes' : 'No',
        value: initialData.zone?.Serviceable ? 'yes' : 'no',
      });
    }
  }, [initialData]);

  const form = useForm<any>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: initialData ? {
      ZoneName: initialData.zone?.ZoneName,
      Serviceable: initialData.zone?.Serviceable,
      DeliveryCost: initialData.zone?.DeliveryCost,
      City: initialData.city?._id
    } : {
      ZoneName: '',
      Serviceable: true,
      DeliveryCost: undefined,
      City: undefined,
    },
  });

  const { control, handleSubmit, reset } = form;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    try {
      if (!isDisabled && initialData) {
        const response = await dispatch(updateZone({ id: initialData.zone._id, zoneData: data }));
        if (response.type === 'zone/update/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Zone Updated' });
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update zone',
          });
        }
      } else {
        const response = await dispatch(createZone(data));
        if (response.type === 'zone/create/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Zone Created' });
          reset({
            ZoneName: '',
            Serviceable: true,
            DeliveryCost: undefined,
            City: undefined
          }); // Reset the form
          setSelectedCity(null);
          setServicedStatus(null);
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Something went wrong',
          });
        }
      }
    } catch (error: any) {
      ToastAtTopRight.fire({ icon: 'error', title: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Zone' : 'Create Zone'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* City Field */}
            <FormField
              control={control}
              name="City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={loading}
                      options={fetchedCity}
                      placeholder="Select City"
                      value={selectedCity}
                      onChange={(selected) => {
                        setSelectedCity(selected);
                        field.onChange(selected?.value);
                      }}
                      onInputChange={(inputValue) => setSearchTerm(inputValue)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zone Name Field */}
            <FormField
              control={control}
              name="ZoneName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Zone Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Serviced Field */}
            <FormField
              control={control}
              name="Serviceable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviced</FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={loading}
                      options={servicedOptions}
                      placeholder="Select Serviced Status"
                      value={servicedStatus}
                      onChange={(selected) => {
                        setServicedStatus(selected);
                        field.onChange(selected?.value === 'yes');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Cost Field */}
            <FormField
              control={control}
              name="DeliveryCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Enter Delivery Cost"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create Zone'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
