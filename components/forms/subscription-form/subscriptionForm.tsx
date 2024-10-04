'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
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
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Edit, Trash } from 'lucide-react';
import ReactSelect from 'react-select';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { createFrequencyType, createSubscriptionType, deleteFrequencyType, deleteSubscriptionType, getAllFrequencyType, getAllProductType, getAllSubscriptionType } from '@/app/redux/actions/dropdownActions';
import { setLoading } from '@/app/redux/slices/authSlice';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import apiCall from '@/lib/axios';
import { debounce } from '@/lib/utils';
import { createSubscription, updateSubscription } from '@/app/redux/actions/subscriptionActions';

// Define the schema with mandatory fields for Bag and DeliveryDays
const subscriptionFormSchema = z.object({
  SubscriptionTypeId: z.object({
    id: z.string().min(1, 'Subscription Type ID is required'),
    value: z.number().positive('Subscription Type Value is required'),
  }),
  FrequencyId: z.object({
    id: z.string().min(1, 'Frequency ID is required'),
    Name: z.string().min(1, 'Frequency Name is required'),
    Value: z.number().positive('Frequency Value is required'),
    DayBasis: z.number().positive('Day Basis must be greater than zero'),
  }),
  TotalDeliveryNumber: z.number().positive('Total bags must be greater than zero'),
  Visibility: z.string().min(1, 'Visibility is required'),
  Status: z.boolean(),
  Bag: z.string().min(1, 'Bag Name is required'), // Ensure the Bag is mandatory
  DeliveryDays: z.array(z.string()).min(1, 'At least one Delivery Day is required'), // Ensure 
  OriginalPrice: z.number().positive('Price must be greater than zero'),
  Offer: z.number().min(0, 'Offer must be zero or greater'), // Changed to allow 0
  NetPrice: z.number().positive('Net Price must be greater than zero'),
  ImageUrl: z.string().optional(),
  Description: z.string().optional(),
});




const visibilityOption = [
  { id: '1', name: 'Admin' },
  { id: '2', name: 'Public' }
];
type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

interface SubscriptionFormType {
  initialData: any | null;
  isDisabled?:boolean;
}
const deliveryDaysOptions = [
  { id: '1', name: 'Monday' },
  { id: '2', name: 'Tuesday' },
  { id: '3', name: 'Wednesday' },
  { id: '4', name: 'Thursday' },
  { id: '5', name: 'Friday' },
  { id: '6', name: 'Saturday' },
  { id: '7', name: 'Sunday' }
];

export const CreateSubscriptionForm: React.FC<SubscriptionFormType> = ({
  initialData,
  isDisabled

}) => {
  const router = useRouter();
  const title = (isDisabled && initialData) ? 'View Subscription' :(isDisabled===false && initialData)? 'Edit Subscription':"Create Subscription"
  const description=(isDisabled && initialData) ? 'Details of Subscription' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;
  const action = initialData ? 'Save changes' : 'Create';
  const [bagList, setBagList] = useState<any[]>([]);



  // Function to transform initial data
  const transformInitialData = (data:any) => {
    if (!data) return {};
    console.log(data)
    return {
      SubscriptionTypeId: data.SubscriptionTypeId
        ? { id: data.SubscriptionTypeId._id, value: data.SubscriptionTypeId.Value }
        : undefined,
      FrequencyId: data.FrequencyId
        ? {
            id: data.FrequencyId._id,
            Name: data.FrequencyId.Name,
            Value: data.FrequencyId.Value,
            DayBasis: data.FrequencyId.DayBasis,
          }
        : undefined,
      TotalDeliveryNumber: data.TotalDeliveryNumber || undefined,
      Visibility: data.Visibility || '',
      Status: data.Status ?? true,
      Bag: data.Bag ? data.Bag._id : undefined, // Ensure Bag is a string (ID) or undefined
      DeliveryDays: data.DeliveryDays.map((day:any) => day.day) || [],
      OriginalPrice: data.OriginalPrice || undefined,
      Offer: data.Offer || undefined,
      NetPrice: data.NetPrice || undefined,
      ImageUrl: data.ImageUrl || '',
      Description: data.Description || '',
    };
  };


  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    mode: 'onChange',
    defaultValues: initialData ? transformInitialData(initialData) : {
      SubscriptionTypeId: undefined,
      FrequencyId: undefined,
      OriginalPrice: undefined,
      TotalDeliveryNumber: undefined,
      Offer: undefined,
      NetPrice: undefined,
      DeliveryDays: [],
      Bag: undefined, // Make sure Bag defaults to undefined
      Status: true,
    }
  });
  

  const { handleSubmit, control, watch, setValue, formState: { errors } } = form;

  interface SubscriptionTypeInterface {
    _id?: string;
    Name: string;
    Value:number;
  }
  interface FrequencyTypeInterface {
    _id?: string;
    Name: string;
    Value:number;
    DayBasis:number;
  }

  const [deleteFrequencyModalOpen, setDeleteFrequencyModalOpen] = useState(false);
const [frequencyToDelete, setFrequencyToDelete] = useState<string | null>(null);
  const [fetchedSubscriptionType, setFetchedSubscriptionType] = useState<SubscriptionTypeInterface[]>([]); // Specify the type here
  const [fetchedFrequencyType, setFetchedFrequencyType] = useState<FrequencyTypeInterface[]>([]); // Specify the type here

  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  useEffect(() => {
    const fetchSubscriptionType = async () => {
    const subscriptionTypes=  await dispatch(getAllSubscriptionType());
    setFetchedSubscriptionType(subscriptionTypes.payload.data)
    };
    fetchSubscriptionType();
    dispatch(setLoading(false)); 

  }, []);




  useEffect(() => {
    const fetchFrequencyType = async () => {
    const frequencyTypes=  await dispatch(getAllFrequencyType());
    setFetchedFrequencyType(frequencyTypes.payload.data)
    };
    fetchFrequencyType();
    dispatch(setLoading(false)); 

  }, []);


  const fetchBags = async (query: string) => {
    try {
      const response = await apiCall('get', `/bag/filter?BagName=${query}`);
      setBagList(response.data.bags);
      console.log('Fetched Bags:', response.data.bags); // Log the fetched bags
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchBags = useCallback(debounce(fetchBags, 300), []);

  useEffect(() => {
    // Optionally, you can call debouncedFetchBags with an initial value if needed
    // debouncedFetchBags('');
    return () => {
      // Optional cleanup if needed
    };
  }, [debouncedFetchBags]);




  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    try {
      const transformedData = {
        SubscriptionTypeId: data.SubscriptionTypeId.id, // Use the ID from the selected subscription type
        FrequencyId: data.FrequencyId.id, // Use the ID from the selected frequency
        TotalDeliveryNumber: data.TotalDeliveryNumber,
        Visibility: data.Visibility,
        Status: data.Status,
        Bag: data.Bag, // Assuming you store Bag ID directly
        DeliveryDays: data.DeliveryDays.map(day => ({ day })), // Transform delivery days
        OriginalPrice: data.OriginalPrice,
        Offer: data.Offer,
        NetPrice: data.NetPrice,
        ImageUrl: data.ImageUrl || "https://example.com/subscription-image.jpg", // Assuming a default or uploaded image URL
        Description: data.Description || "This is a dummy subscription description."
      };

      setLoading(true);
      if (initialData) {

        const response = await dispatch(updateSubscription({ id: initialData._id, subscriptionData: transformedData }));
        if (response.type === 'subscriptions/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Subscription Updated!", // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/subscriptions')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update product',
          });
        }
        // Handle edit logic here
      } else {
        // Handle create logic here
    

        const response = await dispatch(createSubscription(transformedData));
        if (response.type === 'subscriptions/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Subscription Created!", // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/subscriptions')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to create product',
          });
        }



      }
    } catch (error: any) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const [isSubscriptionTypeModalOpen, setIsSubscriptionTypeModalOpen] = useState(false);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);

  const openSubscriptionTypeModal = () => {
    setIsSubscriptionTypeModalOpen(true);
  };

  const closeSubscriptionTypeModal = () => {
    setIsSubscriptionTypeModalOpen(false);
  };

  const openFrequencyModal = () => {
    setIsFrequencyModalOpen(true);
  };

  const closeFrequencyModal = () => {
    setIsFrequencyModalOpen(false);
  };


  const addFrequency = async () => {
    if (newFrequencyName.trim() && newFrequencyValue >= 0 && newFrequencyDayBasis >= 0) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(createFrequencyType({
          Name: newFrequencyName,
          Value: newFrequencyValue,
          DayBasis: newFrequencyDayBasis,
        }));
          if (response.type === 'frequencyType/create/fulfilled') {
          setFetchedFrequencyType((prev) => [...prev, response.payload.data]); // Update state with the new frequency
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'New frequency created!',
          });
          // Clear the input fields
          setNewFrequencyName('');
          setNewFrequencyValue(0);
          setNewFrequencyDayBasis(0);
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add frequency',
          });
        }
      } catch (error) {
      } finally {
        dispatch(setLoading(false));
      }
    }
  };


  const price = watch('OriginalPrice');
  const offers = watch('Offer')||0;

  // useEffect(() => {
  //   const netPrice = price - (price * (offers / 100));
  //   setValue('NetPrice', parseFloat(netPrice.toFixed(2)));
  // }, [price, offers, setValue]);


  const [deleteTypeModalOpen, setDeleteTypeModalOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<string | null>(null);

  const  deleteType = async (typeToDelete: string) => {
    if (typeToDelete) {
      const response=  await dispatch(deleteSubscriptionType(typeToDelete)); // Dispatch the delete action
      if (response.type === 'subscriptionType/delete/fulfilled') {
        setFetchedSubscriptionType((prev) => prev.filter(type => type._id !== typeToDelete));
         ToastAtTopRight.fire({
            icon: 'success',
            title: 'Subscription type deleted!',
        });
        // setNewType(''); // Clear the input field
        // setSortOrderForType(1); // Reset sort order to default
    } else {
        ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add product type',
        });
    }
    }
  };

  const confirmDeleteType = async () => {
    if (typeToDelete) {
      await deleteType(typeToDelete);
      setDeleteTypeModalOpen(false); // Close the modal
    }
  };

  const [newType, setNewType] = useState('');
  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState(1); // Default sort order

  const addType = async () => {
    if (newType.trim() && subscriptionTypeValue >= 0) { // Ensure sort order is non-negative
        try {
            dispatch(setLoading(true));
            const response = await dispatch(createSubscriptionType({ Name: newType, Value: subscriptionTypeValue })); // Include SortOrder

            if (response.type === 'subscriptionType/create/fulfilled') {
                const newSubscriptionType: any = {
                    _id: response.payload.data._id, // Ensure this is a string
                    Name: newType,
                    Value: subscriptionTypeValue, // Use the specified sort order
                };
                setFetchedSubscriptionType((prev: any) => [...prev, newSubscriptionType]); // Ensure prev is of the correct type
                ToastAtTopRight.fire({
                    icon: 'success',
                    title: 'New Subscription type created!',
                });
                setNewType(''); // Clear the input field
                setSubscriptionTypeValue(1); // Reset sort order to default
            } else {
                ToastAtTopRight.fire({
                    icon: 'error',
                    title: response.payload.message || 'Failed to add product type',
                });
            }
        } catch (error) {
        } finally {
            dispatch(setLoading(false));
        }
    }
};
const [newFrequencyName, setNewFrequencyName] = useState('');
const [newFrequencyValue, setNewFrequencyValue] = useState(0); // Default to 0 or appropriate starting value
const [newFrequencyDayBasis, setNewFrequencyDayBasis] = useState(0); // Default to 0
const deleteFrequency = async (frequencyId: string) => {
  try {
    dispatch(setLoading(true));
    const response = await dispatch(deleteFrequencyType(frequencyId)); // Call your delete action

    if (response.type === 'frequencyType/delete/fulfilled') {
      // Update state to remove the deleted frequency
      setFetchedFrequencyType((prev) => prev.filter(freq => freq._id !== frequencyId));
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Frequency deleted successfully!',
      });
    } else {
      ToastAtTopRight.fire({
        icon: 'error',
        title: response.payload.message || 'Failed to delete frequency',
      });
    }
  } catch (error) {
  } finally {
    dispatch(setLoading(false));
  }
};
useEffect(() => {
  if (initialData && initialData.Bag) {
    setBagList(Array.from(initialData.Bag));
  }
}, [initialData]);
  return (
    <>

<Dialog open={deleteTypeModalOpen} onOpenChange={setDeleteTypeModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this product type? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteType} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteTypeModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Dialog open={deleteFrequencyModalOpen} onOpenChange={setDeleteFrequencyModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this frequency? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => {
        if (frequencyToDelete) {
          deleteFrequency(frequencyToDelete); // Call the deletion function
        }
        setDeleteFrequencyModalOpen(false); // Close modal
      }} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteFrequencyModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Dialog open={isSubscriptionTypeModalOpen} onOpenChange={(open) => !open && closeSubscriptionTypeModal()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Subscription Types</DialogTitle>
            <DialogDescription>You can manage subscription types here.</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fetchedSubscriptionType?.map((type, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type?.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type?.Value}</td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash 
                       onClick={() => {
                        if (type._id) { // Ensure _id is defined
                          setTypeToDelete(type._id); // Set the type ID to delete
                          setDeleteTypeModalOpen(true); // Open the confirmation modal
                        }
                      }}
                      className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-4">
            <Input
              placeholder="Type Name"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="mb-2 me-2 "
            />
            <Input
              placeholder="Value"
              type="number" // Ensure this is a number input
              value={subscriptionTypeValue}
              onChange={(e) => setSubscriptionTypeValue(Number(e.target.value))}
              className="mb-4 ms-2"
            />
              <Button onClick={addType} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFrequencyModalOpen} onOpenChange={(open) => !open && closeFrequencyModal()}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Frequencies</DialogTitle>
      <DialogDescription>You can manage frequencies here.</DialogDescription>
    </DialogHeader>
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Basis</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fetchedFrequencyType?.map((freq) => (
            <tr key={freq._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{freq.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{freq.Value}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{freq.DayBasis}</td>
              <td className="px-6 py-4 flex justify-end whitespace-nowrap text-right text-sm font-medium">
              <Trash 
    onClick={() => {
      if (freq._id) { // Ensure _id is defined
        setFrequencyToDelete(freq._id); // Set the frequency ID to delete
        setDeleteFrequencyModalOpen(true); // Open the confirmation modal
      }
    }} 
    className="cursor-pointer text-red-500" 
  />
                 </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        <Input
          type="text"
          placeholder="Frequency Name"
          value={newFrequencyName}
          onChange={(e) => setNewFrequencyName(e.target.value)}
          className="mb-2 me-2"
        />
        <Input
          type="number"
          placeholder="Value"
          value={newFrequencyValue}
          onChange={(e) => setNewFrequencyValue(Number(e.target.value))}
          className="mb-2 me-2"
        />
        <Input
          type="number"
          placeholder="Day Basis"
          value={newFrequencyDayBasis}
          onChange={(e) => setNewFrequencyDayBasis(Number(e.target.value))}
          className="mb-2 me-2"
        />
        <Button onClick={addFrequency} className="ml-2">Add</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>


      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="gap-8 md:grid md:grid-cols-3">
          <FormField
  control={control}
  name="SubscriptionTypeId"
  render={({ field }) => (
    <FormItem>
      <div className="flex">
        <FormLabel>Subscription Type</FormLabel>
{  isDisabled===false &&  <Edit onClick={openSubscriptionTypeModal} className='ms-3 cursor-pointer text-red-500' height={15} width={15} />
}      </div>
      <Select
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value); // Parse the JSON string back to an object
          field.onChange(parsedValue); // Store the object in the form state
        }}
        value={JSON.stringify(field.value)} // Convert the object to a string for the select
        defaultValue={JSON.stringify(field.value)}
      >
        <FormControl>
          <SelectTrigger disabled={isDisabled||loading} >
            <SelectValue placeholder="Select Subscription Type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {fetchedSubscriptionType?.filter(type => type._id) // Ensure _id is defined
            .map((type) => {
              const itemValue = JSON.stringify({ id: type._id, value: type.Value }); // Create the object as a JSON string
              return (
                <SelectItem key={type._id} value={itemValue}> {/* Use JSON string as the value */}
                  {type.Name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="FrequencyId"
  render={({ field }) => (
    <FormItem>
      <div className="flex">
        <div className="flex items-center">
          <FormLabel>Frequency</FormLabel>
{isDisabled===false &&            <Edit onClick={openFrequencyModal} className='ms-3 cursor-pointer text-red-500' height={15} width={15} />
}        </div>
      </div>
      <Select
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value); // Parse the JSON string back to an object
          field.onChange(parsedValue); // Store the object in the form state
        }}
        value={ JSON.stringify(field.value)} // Convert the object to a string for the select
        defaultValue={JSON.stringify(field.value)}

      >
        <FormControl>
          <SelectTrigger disabled={isDisabled||loading} >
            <SelectValue placeholder="Select Frequency" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {fetchedFrequencyType?.map((freq) => {
            const itemValue = JSON.stringify({
              id: freq._id,
              Name: freq.Name,
              Value: freq.Value,
              DayBasis: freq.DayBasis
            }); // Create the object as a JSON string
            return (
              <SelectItem key={freq._id} value={itemValue}>{freq.Name}</SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
            <FormField
              control={form.control}
              name="TotalDeliveryNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Delivery</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Bags"
                      disabled={isDisabled||loading}
                      className='mt-0'
                      min={1}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
 
<Controller
  control={form.control}
  name="Bag"
  render={({ field }) => {
    const selectedOption = bagList.find(option => option._id === field.value);

    return (
      <FormItem>
        <FormLabel>Select Bag</FormLabel>
        <FormControl>
          <ReactSelect
           isDisabled={isDisabled||loading}
            isClearable
            isSearchable
            options={bagList?.map(bag => ({
              value: bag._id,
              label: `${bag.BagName} (${bag.BagMaxWeight}g)`
            }))}
            onInputChange={(inputValue) => {
              if (inputValue.trim() !== '') {
                debouncedFetchBags(inputValue);
              }
            }}
            onChange={(selected) => {
              field.onChange(selected ? selected.value : null);
            }}
            value={
              // Set initial value if initialData exists, else use selectedOption
              initialData
                ? { value: initialData.Bag._id, label: `${initialData.Bag.BagName} (${initialData.Bag.BagMaxWeight}g)` }
                : selectedOption
                ? { value: selectedOption._id, label: `${selectedOption.BagName} (${selectedOption.BagMaxWeight}g)` }
                : null
            }          />
        </FormControl>
        {errors.Bag && <FormMessage>{errors.Bag.message}</FormMessage>}
      </FormItem>
    );
  }}
/>

<Controller
  control={form.control}
  name="DeliveryDays"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Delivery Days</FormLabel>
      <FormControl>
        <MultiSelect
          value={field.value}
          onChange={(value) => field.onChange(value)}
          options={deliveryDaysOptions}
          disabled={isDisabled||loading}
          placeholder="Select Delivery Days"
        />
      </FormControl>
      {errors.DeliveryDays && <FormMessage>{errors.DeliveryDays.message}</FormMessage>}
    </FormItem>
  )}
/>
            <FormField
              control={control}
              name="OriginalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Price"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : '');
                      }}
                      disabled={isDisabled||loading}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="Offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offers (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Offer in Percentage"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : '');
                      }}
                      disabled={isDisabled||loading}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="NetPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Net Price"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : '');
                      }}
                      disabled={isDisabled||loading}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={control}
              name="Visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Visibility</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger disabled={isDisabled||loading} >
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        {visibilityOption.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.Visibility?.message}</FormMessage>
                </FormItem>
              )}
            />
       

            <FormField
              control={form.control}
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Status</FormLabel>
                  <Select
                  disabled={isDisabled||loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value.toString()}
                          placeholder="Select Subscription Status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
     
<Controller
          name="ImageUrl"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  // disabled={form.formState.isSubmitting}
                  disabled={isDisabled||loading}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              {errors.ImageUrl && <FormMessage>{errors.ImageUrl.message}</FormMessage>}
            </FormItem>
          )}
        />

          </div>
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isDisabled||loading}
                    rows={5}
                    
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Subscription':"Create Subscription"}     
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
    </>
  );
};
