'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {  SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { debounce } from '@/lib/utils';
import apiCall from '@/lib/axios';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createLocality, updateLocality } from '@/app/redux/actions/localityActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';

export interface LocalityFormData {
  LocalityName: string;
  Pin: string;
  Serviceable: string;
  City: string; // Changed to match schema naming
  Zone: string; // Changed to match schema naming
}

const localityFormSchema = z.object({
  LocalityName: z.string().min(1, 'Sector/Locality is required'),
  Pin: z.string().min(1, 'Pin is required').length(6, 'Pin must be 6 digits'),
  Serviceable: z.string().min(1, 'Please select if serviced'),
  City: z.string().min(1, 'Please select City'),
  Zone: z.string().min(1, 'Please select Zone'),
});

export const LocalityForm: React.FC<{ initialData?: any, isDisabled?: boolean }> = ({ initialData, isDisabled }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<LocalityFormData>({
    resolver: zodResolver(localityFormSchema),
    defaultValues: initialData || {
      SectorLocality: '',
      Pin: '',
      // SortOrder: 1,
      Serviceable: 'true',
      City: '',
      Zone: '',
    },
  });

  const {reset, control,watch, handleSubmit, formState: { errors } } = form;
  const dispatch = useDispatch<AppDispatch>();

  const selectedWatchCity=watch('City')
  const onSubmit: SubmitHandler<LocalityFormData> = async (data) => {
    try {
      setLoading(true);
  
      const newData = {
        ...data,
        Serviceable: data.Serviceable === 'true' ? true : false, // Convert to boolean
      };
  
      if (!isDisabled && initialData) {
        const response = await dispatch(updateLocality({ id: initialData.locality._id, localityData: newData }));
        if (response.type === 'locality/update/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Locality Updated' });
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update Locality',
          });
        }
      } else {
        const response = await dispatch(createLocality(newData));
        if (response.type === 'locality/create/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Locality Created' });
  
          // Retain values of `city`, `zone`, and `Serviceable`
          reset({
            LocalityName: "",
            Pin: "",
            City: selectedCity?.value, // Retain the current value of the city
            Zone: selectedZone?.value, // Retain the current value of the zone
            Serviceable: servicedStatus?.value === 'yes' ? 'yes' : 'no', // Retain the serviced status
          });
          
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Something went wrong',
          });
        }
      }
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const [fetchedZone, setFetchedZone] = useState<{ label: string; value: string }[]>([]);
  const [searchZoneTerm, setSearchZoneTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<{ label: string; value: string } | null>(null);
  const [servicedZoneStatus, setServicedZoneStatus] = useState<{ label: string; value: string } | null>(null); // For the serviced field

  const fetchZone = useCallback(
    debounce(async (term: string) => {
      if (!term || !selectedWatchCity) {
        setFetchedZone([]);
        return;
      }
  
      try {
        const response = await apiCall('GET', `/route/zone/filter?CityId=${selectedWatchCity}&ZoneName=${term}`);
        if (response.status) {
          const zones = response.data.zones.map((zone: any) => ({
            label: zone.ZoneName,
            value: zone._id,
          }));
          setFetchedZone(zones);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    }, 500),
    [selectedWatchCity] // Add selectedWatchCity as a dependency
  );
  

  useEffect(() => {
    fetchZone(searchZoneTerm);
  }, [searchZoneTerm, fetchZone]);

  useEffect(() => {
    if (initialData) {
      // Prefill form fields with initialData
      setSelectedZone({
        label: initialData.zone?.ZoneName,
        value: initialData.zone?._id,
      });
      // You may need to adjust the zone prefill as well
      setServicedZoneStatus({
        label: initialData.zone?.Serviceable ? 'Yes' : 'No',
        value: initialData.zone?.Serviceable ? 'yes' : 'no',
      });
    }
  }, [initialData]);

  
  const [fetchedCity, setFetchedCity] = useState<{ label: string; value: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | null>(null);
  const [servicedStatus, setServicedStatus] = useState<{ label: string; value: string } | null>({
    label: 'Yes',
    value: 'true',
  });
  

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
      // You may need to adjust the zone prefill as well
      setServicedStatus({
        label: initialData.zone?.Serviceable ? 'Yes' : 'No',
        value: initialData.zone?.Serviceable ? 'yes' : 'no',
      });
    }
  }, [initialData]);
  
  const servicedOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];
  

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Locality' : 'Create Locality'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

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
          value={selectedCity} // Value handling
          onChange={(selected) => {
            setSelectedCity(selected);
            field.onChange(selected?.value); // Update form value correctly
          }}
          
          onInputChange={(inputValue) => setSearchTerm(inputValue)}

        />
       
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={control}
  name="Zone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Zone</FormLabel>
      <FormControl>
        <Select
        isDisabled={loading}
        options={fetchedZone}
          placeholder="Select Zone"
          value={selectedZone} // Value handling
          onChange={(selected) => {
            setSelectedZone(selected);
            field.onChange(selected?.value);
          }}
          onInputChange={(inputValue) => setSearchZoneTerm(inputValue)}

        />
       
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            
            <FormField
              control={control}
              name="LocalityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector/Locality</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Sector/Locality"
                    />
                  </FormControl>
                  <FormMessage>{errors.LocalityName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="Pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Pin"
                    />
                  </FormControl>
                  <FormMessage>{errors.Pin?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* <FormField
              control={control}
              name="SortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Enter Sort Order"
                    />
                  </FormControl>
                  <FormMessage>{errors.SortOrder?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
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
            field.onChange(selected?.value); // Keep it as a string ('yes' or 'no')
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create Locality'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
