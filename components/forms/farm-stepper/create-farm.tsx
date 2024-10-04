'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash, Edit, CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { createProductType, createRosterType, createSeasonType, deleteProductType, deleteRosterType, deleteSeasonType, getAllProductType, getAllRosterType, getAllSeasonType } from '@/app/redux/actions/dropdownActions';
import { setLoading } from '@/app/redux/slices/authSlice';
import { ProductType } from '@/types/Dropdown';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { createProduct, updateProduct } from '@/app/redux/actions/productActions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface ProductFormType {
  initialData: any | null;
  isDisabled?:boolean;
}

const productFormSchema = z.object({
  InputDate: z.date({
    required_error: 'Date of Birth is required.',
  }),  
  InKgs: z.number().min(1, 'InKgs Quantity is required'),
  FarmKgs: z.number().min(1, 'FarmKgs Quantity is required'),
  OutKgs: z.string().min(1, 'Please Enter OutKgs'), 
  Description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const CreateFarmForm: React.FC<ProductFormType> = ({ initialData,isDisabled }) => {
  const params = useParams();
  const router = useRouter();
  const [seasonModalOpen, setSeasonModalOpen] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);

const [deleteSeasonModalOpen, setDeleteSeasonModalOpen] = useState(false);
const [seasonToDelete, setSeasonToDelete] = useState<string | null>(null);


  // Define the ProductTypeInterface with expected types
  interface SeasonType {
    _id: string;
    Name: string;
  }



  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch



useEffect(() => {
  const fetchSeasons = async () => {
    dispatch(setLoading(true)); // Set loading state
      const response = await dispatch(getAllSeasonType());
      if (response.type === 'seasonType/getAll/fulfilled') {
        // Ensure the response payload is correctly typed
        const fetchedSeasons: SeasonType[] = response.payload.data;

        // Map the seasons to the desired format
        setSeasons(fetchedSeasons.map((season: SeasonType) => ({
          value: season._id, // Use the _id for the value
          label: season.Name // Use the Name for the label
        })));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to fetch seasons',
        });
      }
      dispatch(setLoading(false));
  };

  fetchSeasons(); // Call the fetch function
}, [dispatch]); // Include dispatch in the dependency array



  const [seasons, setSeasons] = useState([
    { value: 'Summer', label: 'Summer' },
  ]);

  const [newSeason, setNewSeason] = useState('');

  const title = (isDisabled && initialData) ? 'View Farms' :(isDisabled===false && initialData)? 'Edit Farms':"Create Farm Entry"
  const description=(isDisabled && initialData) ? 'Details of Farm Entry' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;

  const toastMessage = initialData ? 'Farm Entry updated.' : 'Farm Entry created.';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues:initialData
    || {
          InputDate: new Date(),
          Description: '',
          InKgs: undefined,
          OutKgs: undefined,
          FarmKgs: undefined,
          // Season: '',
        },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = form;

  // const selectedUnitType=watch('unitType')

  const onSubmit = async (data:any) => {
    try {
      dispatch(setLoading(true)); // Set loading state
      if ((isDisabled===false && initialData)) {
        // Update existing product
        // const response = await dispatch(updateProduct({ id: initialData._id, productData: data }));
        // if (response.type === 'products/update/fulfilled') {
        //   ToastAtTopRight.fire({
        //     icon: 'success',
        //     title: toastMessage, // 'Item updated.'
        //   });
        //   router.push('/product')
        // } else {
        //   ToastAtTopRight.fire({
        //     icon: 'error',
        //     title: response.payload.message || 'Failed to update product',
        //   });
        // }
      } else {
        // Create new product
        // const response = await dispatch(createProduct(data));
        // if (response.type === 'products/create/fulfilled') {
        //   ToastAtTopRight.fire({
        //     icon: 'success',
        //     title: toastMessage, // 'Item created.'
        //   });
        //   form.reset(); // Clear all fields in the form only on successful creation 
        //   router.push('/product')

        // } else {
        //   ToastAtTopRight.fire({
        //     icon: 'error',
        //     title: response.payload.message || 'Failed to create product',
        //   });
        // }
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



  const addSeason = async () => {
    if (newSeason.trim()) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(createSeasonType({ Name: newSeason }));
        if (response.type === 'seasonType/create/fulfilled') {
          setSeasons([...seasons, { value: response.payload.data._id, label: newSeason }]);
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Season added!',
          });
          setNewSeason(''); // Clear the input field
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add season',
          });
        }
      } catch (error) {
        console.error('Error adding season:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };



  const confirmDeleteSeason = async () => {
    if (seasonToDelete) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(deleteSeasonType(seasonToDelete));
        if (response.type === 'seasonType/delete/fulfilled') {
          setSeasons(seasons.filter(season => season.value !== seasonToDelete)); // Update the seasons state
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Season deleted!',
          });
          setSeasonToDelete(null); // Clear the selected season to delete
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete season',
          });
        }
      } catch (error) {
        console.error('Error deleting season:', error);
      } finally {
        dispatch(setLoading(false));
        setDeleteSeasonModalOpen(false); // Close the confirmation modal
      }
    }
  };



  return (
    <>

      <Dialog open={seasonModalOpen} onOpenChange={setSeasonModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Seasons</DialogTitle>
      <DialogDescription>Add or remove product seasons.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="New Season"
          value={newSeason}
          onChange={(e) => setNewSeason(e.target.value)}
        />
        <Button className="ms-2" onClick={addSeason}>Add</Button>
      </div>
      <div className="space-y-2">
        {seasons.map((season) => (
          <div key={season.value} className="flex justify-between items-center">
            <span>{season.label}</span>
            <Button variant="destructive" onClick={() => {
              setSeasonToDelete(season.value); // Set the season to delete
              setDeleteSeasonModalOpen(true); // Open the confirmation modal
            }}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

{/* Confirmation Modal for Deleting Season */}
<Dialog open={deleteSeasonModalOpen} onOpenChange={setDeleteSeasonModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this season? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteSeason} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteSeasonModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >

          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">

            {/* <FormField
              control={form.control}
              name="ProductName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isDisabled||loading}
                      placeholder="Enter Item Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

             {/* <FormField
              control={form.control}
              name="Season"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Season</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setSeasonModalOpen(true)}/>
}                  </div>
                  <FormControl>
                    <ReactSelect
                      isSearchable
                      options={seasons}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={isDisabled||loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      value={seasons.find(option => option.value === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

<FormField
  control={control}
  name="InputDate"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              disabled={isDisabled || loading} // Add disabled condition here
            >
              {field.value ? format(field.value, "dd MMM yyyy") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage/>
    </FormItem>
  )}
/>

<FormField
              control={form.control}
              name="InKgs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>InKgs (gms)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter InKgs Quantity"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

 <FormField
              control={form.control}
              name="FarmKgs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Kgs (gms)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Farm Kgs"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="OutKgs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Out Kgs</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Out Kgs "
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        
          
          </div>
       
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Note</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isDisabled||loading}
                    rows={5}
                    placeholder="Enter nay Note"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
            { initialData? 'Save':"Create"}     
            </Button>}
        </form>
      </Form>
     
    </>
  );
};
