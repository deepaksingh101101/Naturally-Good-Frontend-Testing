'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Download, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import YearPicker from '@/components/YearPicker'; // Adjust the import path as necessary
import { addDays, format } from 'date-fns';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserSnapshot, userSnapshotData } from '@/constants/user-snapshot-data';
import { OrderSnapshot, orderSnapshotData } from '@/constants/packing-snapshot-data';

export const PackingClient: React.FC = () => {
  const router = useRouter();

  const handleSearch = (searchQuery: string) => {
    // Add logic to filter data based on searchQuery
    console.log('Search:', searchQuery);
  };
  const [fetchedCity, setFetchedCity] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const FormSchema = z.object({
    Route: z.string().min(1, "Route is required"),
     });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = form;


  const processForm = (data: z.infer<typeof FormSchema>) => {
    // api call and reset
    // form.reset();
  };
  const initialData: OrderSnapshot[] = orderSnapshotData;
  const [data, setData] = useState<OrderSnapshot[]>(initialData);


  return (
    <>
          <Form {...form}>
              <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full space-y-8"
        >
      <div className="flex items-start justify-between mb-6">
        <Heading
          title="Packing/Delivery Report"
          description="View packing/renewal report for the selected time period."
        />
        
        <div className="flex space-x-2">
          <CalendarDateRangePicker/>
          <FormField
              control={form.control}
              name="Route"
              render={({ field }) => (
                <FormItem>
                  <Controller
                    control={control}
                    name="Route"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        placeholder="Select Route"
                        options={fetchedCity}
                        onInputChange={(inputValue) => setSearchTerm(inputValue)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={fetchedCity.find(option => option.id === field.value)}
                      />
                    )}
                  />
                  {/* <FormMessage>{errors.city?.message}</FormMessage> */}
                </FormItem>
              )}
            />
          <Button
            variant="outline"
            className="flex text-white bg-blue-500 hover:bg-blue-700 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            

            <Search height={16} className="mr-2" />
            Search
          </Button>

          <Button
            variant="outline"
            className="flex items-center bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>
        </div>
     
      </div>
      <Separator />
      <div className="flex justify-end"></div>
      </form>
      </Form>
      <DataTable
        searchKeys={["customerName"]}
        columns={columns}
        data={data}
        onSearch={handleSearch}
      />
    </>
  );
};
