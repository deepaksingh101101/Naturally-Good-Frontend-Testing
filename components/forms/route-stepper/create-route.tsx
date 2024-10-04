'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import apiCall from '@/lib/axios';
import ReactSelect from 'react-select';
import { debounce } from '@/lib/utils';
import { CrossIcon, DeleteIcon, LucideDelete } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createRoute, updateRoute } from '@/app/redux/actions/RouteActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';

// Define schema for form validation
const routeFormSchema = z.object({
  Status: z.boolean(),
  RouteName: z.string().min(1, 'Route Name is required'),
  Days: z.array(z.string()),
  VehicleTagged: z.array(z.string()).min(1, 'At least one vehicle must be selected'),
  ZonesIncluded: z.string().optional(),
  City: z.string().min(1, 'City is required'),
});

// Define the interface for form data
const dayOptions = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

export const RouteForm: React.FC<{ initialData?: any, isDisabled?: boolean }> = ({ initialData, isDisabled }) => {
  const [loading, setLoading] = useState(false);
  const [fetchedCity, setFetchedCity] = useState<{ label: string; value: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedVehicle, setFetchedVehicle] = useState<any[]>([]);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<string[]>([]); // Track selected vehicle IDs
  const [searchVehicleTerm, setSearchVehicleTerm] = useState('');


  const [selectedZone, setSelectedZone] = useState<{ label: string; value: string } | null>(null);
  const [searchZoneTerm, setSearchZoneTerm] = useState('');
  const [fetchedZone, setFetchedZone] = useState<{ label: string; value: string }[]>([]);

  const form = useForm<any>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: initialData || {
      Status: true,
      RouteName: '',
      Days: [],
      VehicleTagged: [],
      ZonesIncluded: '',
      City: '',
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const Days = watch('Days');
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<any> = async (formData) => {
    try {
      setLoading(true);
  
      // Map selectedZones into the ZoneInfo format
      const formattedZonesIncluded = selectedZones.map(zone => ({
        ZoneId: zone.id,
        DeliverySequence: parseInt(zone.deliverySequence) // Ensure DeliverySequence is a number
      }));
  
      // Prepare the final data object for submission
      const finalData = {
        RouteName: formData.RouteName,
        Status: formData.Status,
        ZonesIncluded: formattedZonesIncluded,
        Days: formData.Days,
        VehicleTagged: formData.VehicleTagged,
        City: formData.City,
      };
  
      if (!isDisabled && initialData) {
        const response = await dispatch(updateRoute({ id: initialData.route._id, routeData: finalData }));
        if (response.type === 'route/update/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Route Updated' });
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update Route',
          });
        }
      } else {
        const response = await dispatch(createRoute(finalData));
        if (response.type === 'route/create/fulfilled') {
          ToastAtTopRight.fire({ icon: 'success', title: 'Route Created' });
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Something went wrong',
          });
        }
      }
      
      // Add success notification or redirect as needed
  
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (e.g., show notification)
    } finally {
      setLoading(false);
    }
  };

  


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
      setSelectedCity({
        label: initialData.city?.CityName,
        value: initialData.city?._id,
      });
    }
  }, [initialData]);

  // For vehicle
  const fetchVehicle = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        return;
      }
      try {
        const response = await apiCall('GET', `/route/vehicle/filter?VehicleName=${term}`);
        if (response.status && response.data?.vehicles.length > 0) {
          setFetchedVehicle(prevFetchedVehicles => {
            // Create a set of existing vehicle IDs to check for duplicates
            const existingIds = new Set(prevFetchedVehicles.map(vehicle => vehicle._id));
        
            // Combine previous vehicles and new vehicles, filtering out duplicates
            const newVehicles = response.data.vehicles.filter((vehicle: any) => !existingIds.has(vehicle._id));
        
            return [
              ...prevFetchedVehicles,
              ...newVehicles
            ];
          });
        }
        
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchVehicle(searchVehicleTerm);
  }, [searchVehicleTerm, fetchVehicle]);

  useEffect(() => {
    if (initialData) {
      // Prefill selected vehicle IDs based on initialData
      setSelectedVehicleIds(initialData.vehicle?.map((v: any) => v._id) || []);
    }
  }, [initialData]);

// Zone
  const fetchZone = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        setFetchedZone([]);
        return;
      }

      try {
        const response = await apiCall('GET', `/route/zone/route/filter?ZoneName=${term}`);
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
    []
  );

  useEffect(() => {
    fetchZone(searchZoneTerm);
  }, [searchZoneTerm, fetchZone]);

  const [selectedZones, setSelectedZones] = useState<{ id: string, name: string, deliverySequence: string }[]>([]);

// Modify the onChange handler for the ZonesIncluded field to add the selected zone to the state
const handleZoneSelect = (selectedZone: { label: string, value: string } | null) => {
  if (selectedZone) {
    // Check if the zone is already in the selectedZones array to avoid duplicates
    if (!selectedZones.find(zone => zone.id === selectedZone.value)) {
      // Calculate the next delivery sequence
      const nextSequence =
        selectedZones.length > 0
          ? Math.max(...selectedZones.map(zone => Number(zone.deliverySequence))) + 1
          : 1;

      // Add the new zone with the next delivery sequence
      setSelectedZones(prevZones => [
        ...prevZones,
        { id: selectedZone.value, name: selectedZone.label, deliverySequence: nextSequence.toString() }
      ]);
    }
  }
};

// Function to update the delivery sequence for a specific zone
const handleDeliverySequenceChange = (zoneId: string, sequence: string) => {
  setSelectedZones(prevZones =>
    prevZones.map(zone =>
      zone.id === zoneId ? { ...zone, deliverySequence: sequence } : zone
    )
  );
};


const handleRemoveZone = (zoneId:any) => {
  setSelectedZones((prevZones) =>
    prevZones.filter((zone) => zone.id !== zoneId)
  );
};
  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Route' : 'Create Route'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={control}
              name="RouteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Route Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={control}
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={loading}
                      options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                      placeholder="Select Serviced Status"
                      value={field.value ? { label: 'Yes', value: 'yes' } : { label: 'No', value: 'no' }}
                      onChange={(selected) => {
                        field.onChange(selected?.value === 'yes');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
  control={control}
  name="Days"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Days</FormLabel>
      <FormControl>
        <Select
          isMulti
          isDisabled={loading}
          options={dayOptions}
          placeholder="Select Days"
          value={field.value.map((day:any) => ({ label: day, value: day }))} // Convert array of strings to array of objects for display
          onChange={(selected) => {
            const selectedValues = selected ? selected.map(option => option.value) : []; // Extract only the values
            field.onChange(selectedValues); // Pass the array of strings to the form state
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>



            <FormField
              control={control}
              name="VehicleTagged"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Tagged</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="VehicleTagged"
                      render={({ field: { onChange } }) => (
                        <ReactSelect
                          isClearable
                          isSearchable
                          isMulti
                          options={fetchedVehicle}
                          onInputChange={(inputValue) => setSearchVehicleTerm(inputValue)}
                          getOptionLabel={(option) => option?.VehicleName || ''} // Ensure no undefined values
                          getOptionValue={(option) => option._id}  // Correct value for form
                          onChange={(selected) => {
                            const ids = selected ? selected.map(item => item._id) : [];
                            onChange(ids);
                            setSelectedVehicleIds(ids); // Update selected vehicle IDs
                          }}
                          value={fetchedVehicle.filter(vehicle => selectedVehicleIds.includes(vehicle._id))} // Set selected vehicles
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
              {/* <FormField
              control={control}
              name="ZonesIncluded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zones</FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={loading}
                      options={fetchedZone}
                      placeholder="Select Zone"
                      value={selectedZone}
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
            /> */}

            <FormField
  control={control}
  name="ZonesIncluded"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Zones</FormLabel>
      <FormControl>
        <Select
          isDisabled={loading}
          options={fetchedZone}
          placeholder="Select Zone"
          value={selectedZone}
          onChange={(selected) => {
            setSelectedZone(selected);
            handleZoneSelect(selected); // Call the modified onChange handler
            field.onChange(selected ? selected.value : ''); // Update the form value
          }}
          onInputChange={(inputValue) => setSearchZoneTerm(inputValue)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update Route' : 'Create Route'}
          </Button>
        </form>
      </Form>

    <div className="mt-6">
  <h3 className="text-lg font-medium">Selected Zones</h3>
  <table className="min-w-full divide-y divide-gray-200 mt-2">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Sequence</th>
        <th className="px-6 py-3 bg-gray-50">Action</th>
      </tr>
    </thead>
    <tbody>
      {selectedZones.map((zone, index) => (
        <tr key={zone.id} className="bg-white">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input
              type="text"
              placeholder="Enter sequence"
              value={zone.deliverySequence}
              onChange={(e) => handleDeliverySequenceChange(zone.id, e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
            <button
              onClick={() => handleRemoveZone(zone.id)}
              className="text-red-500 hover:text-red-700"
            >
              <LucideDelete className="h-6 w-6 text-red-600" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};
