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
import { useEffect, useRef, useState } from 'react';
import ReactSelect from 'react-select';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import apiCall from '@/lib/axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { createBag, updateBag } from '@/app/redux/actions/bagActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';

export interface Bag {
  _id:string,
  BagName: string;
  AllowedItems: AllowedItem[];
  Status: Boolean;
  BagVisibility?: string;
  BagImageUrl?: string;
  BagDescription: string;
  BagMaxWeight: number;
}

interface AllowedItem {
  itemName: string;
  itemPrice: number;
  UnitQuantity: number;
  UnitType: string;
  maximumQuantity: number;
  minimumQuantity: number;
}

const bagFormSchema = z.object({
  BagName: z.string().min(1, 'Bag name is required'),
  BagVisibility: z.string().min(1, 'Visibility is required'),
  BagImageUrl: z.string().optional(),
  BagDescription: z.string().optional(),
  AllowedItems: z.array(z.string()).min(1, 'At least one item is required'),
  Status: z.boolean().default(true),
  BagMaxWeight: z.number().min(1, 'Maximum bag weight is required'), // Ensure this is present and clear
  });

export const BagForm: React.FC<{ initialData?: any,isDisabled?:boolean }> = ({ initialData,isDisabled }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bagItems, setBagItems] = useState<AllowedItem[]>(initialData?.AllowedItems || []);
  const [productList, setProductList] = useState<any[]>([]);
  const [rowSearchTerms, setRowSearchTerms] = useState<string[]>(Array(bagItems.length).fill(''));
  const [selectedProducts, setSelectedProducts] = useState<any[]>(Array(bagItems.length).fill(null));
  const router = useRouter();
  interface AllowedItemInterface {
    _id: string;
    ProductName: string;
    UnitQuantity: number;
    UnitType: string;
    Price: number;
    MinimumUnits: number;
    MaximumUnits: number;
    // Add any other fields that are relevant to the AllowedItem
  }
  const runUseEffectForEditValues = () => {
    if (initialData) {
      // Map initial allowed items into the form structure
      const initialAllowedItems = initialData.AllowedItems.map((item: AllowedItemInterface) => ({
        itemName: item.ProductName,
        itemPrice: item.Price,
        UnitQuantity: item.UnitQuantity,
        UnitType: item.UnitType,
        maximumQuantity: item.MaximumUnits,
        minimumQuantity: item.MinimumUnits,
      }));
      setBagItems(initialAllowedItems);
  
      // Set the selectedProducts state based on the initial data
      const initialSelectedProducts = initialData.AllowedItems.map((product: AllowedItemInterface) => ({
        value: product._id,
        label: product.ProductName,
      }));
      setSelectedProducts(initialSelectedProducts);
  
      // Reset form with initial data
      form.reset({
        BagName: initialData.BagName,
        BagVisibility: initialData.BagVisibility,
        BagDescription: initialData.BagDescription,
        AllowedItems: initialData.AllowedItems.map((item: AllowedItemInterface) => item._id), // Specify type for item here
        Status: initialData.Status,
        BagMaxWeight: initialData.BagMaxWeight,
        BagImageUrl: initialData.BagImageUrl,
      });
    }
  };
 

  useEffect(() => {
    if (initialData) {
      runUseEffectForEditValues()
    }
    else{
      return
    }
  }, []);


  const form = useForm<Bag>({
    resolver: zodResolver(bagFormSchema),
    defaultValues: initialData || {
      BagName: '',
      BagVisibility: 'Admin',
      BagDescription: '',
      AllowedItems: [],
      Status: true,
      BagMaxWeight: undefined,
      BagImageUrl: '',
    },
  });
  
  // Use effect to monitor form state
  useEffect(() => {
    const subscription = form.watch((values) => {
      console.log("Current form values:", values);
    });
  
    return () => subscription.unsubscribe(); // Clean up the subscription on unmount
  }, [form]);

  const getProduct = async (query: string) => {
    try {
      const response = await apiCall('get', `/product/filter?ProductName=${query}`);
      setProductList(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };


  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
 
  const onSubmit: SubmitHandler<Bag> = async (data) => {
    setLoading(true); // Start loading state
    try {
      const allowedItems = data.AllowedItems.map(item => ({ itemId: item }));
      const updatedBagData = { ...data, AllowedItems: allowedItems };
  
      if (initialData) {
        const response: any = await dispatch(updateBag({ id: initialData._id, bagData: updatedBagData })).unwrap();
        
        // Log the response
        console.log('Update Bag Response:', response); 
  
        // Since the state update is handled in the slice, you don't need to check response type here
        ToastAtTopRight.fire({
          icon: 'success',
          title: "Bag Updated Successfully!",
        });
        router.push('/bag');
      } else {
        // Handle creation of a new bag
        let response: any = await dispatch(createBag(updatedBagData)).unwrap();
        console.log('Create Bag Response:', response); // Log the response for creation
  
        ToastAtTopRight.fire({
          icon: 'success',
          title: "Bag created Successfully",
        });
        form.reset(); // Clear all fields in the form only on successful creation 
        router.push('/bag');
      }
    } catch (error) {
      console.error('Error occurred while submitting the bag:', error);
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to update bag',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const steps: { id: string; name: string; fields: (keyof Bag)[] }[] = [
    {
      id: 'Step 1',
      name: 'Bag Details',
      fields: ['BagName', 'Status', 'BagDescription', 'BagImageUrl'],
    },
    {
      id: 'Step 2',
      name: 'Bag Items',
      fields: ['AllowedItems'],
    },
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;
    // Include 'BagMaxWeight' in the fields to be validated when moving to the next step
    const output = await form.trigger([...fields, 'BagMaxWeight'], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
};

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleAddItem = () => {
    setBagItems([...bagItems, { itemName: '', itemPrice: 0, UnitQuantity: 0,UnitType:"", maximumQuantity: 0, minimumQuantity: 0 }]);
    setRowSearchTerms([...rowSearchTerms, '']); // Add a new entry for the new row
    setSelectedProducts([...selectedProducts, null]); // Add a new entry for the new row
  };

  const handleRemoveItem = (index: number) => {
    const updatedBagItems = bagItems.filter((_, i) => i !== index);
    setBagItems(updatedBagItems);
  
    // Update the form to remove the corresponding AllowedItem
    const updatedAllowedItems = form.getValues("AllowedItems").filter((_, i) => i !== index);
    form.setValue("AllowedItems", updatedAllowedItems); // Update the form state
  };

  const handleItemChanges = (index: number, changes: Partial<AllowedItem>) => {
    const updatedBagItems = [...bagItems];
    updatedBagItems[index] = { ...updatedBagItems[index], ...changes };
    setBagItems(updatedBagItems);
  };

  const getFilteredProducts = (currentIndex: number) => {
    const selectedProductIds = selectedProducts.map((product) => product?.value);
    return productList.filter(product => !selectedProductIds.includes(product._id) || selectedProductIds[currentIndex] === product._id);
  };

  const { handleSubmit, control, formState: { errors } } = form;

  // Debouncing logic
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (inputValue: string, index: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setRowSearchTerms(prev => {
        const updated = [...prev];
        updated[index] = inputValue;
        return updated;
      });
      getProduct(inputValue);
    }, 300); // Adjust the debounce delay as needed
  };

  return (
    <div className="container mx-auto p-4">
        <Heading title={isDisabled && initialData ? 'View Bag' :(isDisabled===false && initialData)? 'Edit Bag':"Create Bag"} description={isDisabled && initialData ? 'Details of Bag' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below"} />
        <Separator />
      <div className="mt-2">
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  'group flex w-full flex-col py-2 pl-4 md:pb-0 md:pl-0 md:pt-4',
                  currentStep > index ? 'border-e-4 border-[green] ' :
                  currentStep === index ? 'border-[green]' :
                  'border-l-4 border-[green] '
                )}
                aria-current={currentStep === index ? 'step' : undefined}
              >
                <span className={cn('text-sm ps-2 font-medium', currentStep > index ? 'text-[#04894D]' : 'text-gray-500')}>
                  {step.id}
                </span>
                <span className="text-sm ps-2 font-medium my-2">{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className={cn(currentStep === 1 ? 'w-full mt-5' : 'gap-8 md:grid md:grid-cols-2 mt-5')}>
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="BagName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Name</FormLabel>
                      <FormControl>
                        <Input
                          name="BagName"
                          type="text"
                          disabled={isDisabled||loading}
                          placeholder="Enter Bag Name"
                          onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.BagName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
            <FormField
  control={form.control}
  name="BagMaxWeight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Total Maximum Weight (gms)</FormLabel>
      <FormControl>
        <Input
          name="BagMaxWeight"
          type="number"
          disabled={isDisabled||loading}
          placeholder="Enter Total Weight"
          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)} // Allow undefined if empty
          value={field.value || ''}
        />
      </FormControl>
      <FormMessage>{form.formState.errors.BagMaxWeight?.message}</FormMessage>
    </FormItem>
  )}
/>
                <FormField
                  control={form.control}
                  name="BagVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Visibility</FormLabel>
                      <FormControl>
                        <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Public">Public</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{form.formState.errors.BagVisibility?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              <FormField
  control={form.control}
  name="Status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status</FormLabel>
      <FormControl>
        <Select disabled={isDisabled||loading} onValueChange={(value) => field.onChange(value === 'true')} value={String(field.value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage>{form.formState.errors.Status?.message}</FormMessage>
    </FormItem>
  )}
/>
                <Controller
                  name="BagImageUrl"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          disabled={isDisabled||loading}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              field.onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.BagImageUrl?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="BagDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Description</FormLabel>
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
              </>
            )}
            {currentStep === 1 && (
              <div className="mt-4 flex justify-between">
                <Button type="button" onClick={handleAddItem} disabled={loading} className="mt-2">
                  Add Item
                </Button>
              </div>
            )}
          </div>
          <div className="mt-8">
            {bagItems.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Price
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maximum Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bagItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Controller
                          control={form.control}
                          name={`AllowedItems.${index}` as const}
                          render={({ field }) => {
                            const selectedProduct = selectedProducts[index]; // Use state for selected product
                            return (
                              <ReactSelect
                                isClearable
                                isSearchable
                                options={getFilteredProducts(index).map(product => ({
                                  value: product._id,
                                  label: product.ProductName,
                                  price: product.Price,
                                  unitQuantity: product.UnitQuantity,
                                  maximumQuantity: product.MaximumUnits,
                                  minimumQuantity: product.MinimumUnits,
                                }))}
                                onChange={(selected) => {
                                  field.onChange(selected ? selected.value : null);
                                  setSelectedProducts(prev => {
                                    const newSelected = [...prev];
                                    newSelected[index] = selected; // Update selected product for this row
                                    return newSelected;
                                  });
                                  const selectedItem = productList.find(product => product._id === selected?.value);
                                  if (selectedItem) {
                                    handleItemChanges(index, {
                                      itemName: selectedItem.ProductName,
                                      itemPrice: selectedItem.Price,
                                      UnitQuantity: selectedItem.UnitQuantity,
                                      UnitType: selectedItem.UnitType,
                                      maximumQuantity: selectedItem.MaximumUnits,
                                      minimumQuantity: selectedItem.MinimumUnits,
                                    });
                                  }
                                }}
                                isDisabled={isDisabled||loading}

                                onInputChange={(inputValue) => handleInputChange(inputValue, index)} // Use the debounced input change
                                value={selectedProduct} // Maintain selected product
                              />
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.itemPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {((item?.UnitType === 'grams')||(item?.UnitType ==='liter')) 
    ? `${item?.UnitQuantity} ${item?.UnitType}` 
    : '-'}

</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.minimumQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.maximumQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button type="button" disabled={isDisabled||loading} onClick={() => handleRemoveItem(index)} className="text-red-600 hover:text-red-900">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-8 pt-5">
            <div className="flex justify-between">
             {(isDisabled===false)&& <Button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Button>}
              {currentStep !== 1 && (isDisabled===false) && (
                <Button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>

          
          {currentStep === 1 && (
            <div className="mt-4">
             {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Bag':"Create Bag"}     
            </Button>}
            </div>
          )}
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