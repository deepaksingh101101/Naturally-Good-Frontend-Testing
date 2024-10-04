'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from "lucide-react";
import { format } from 'date-fns';
import { debounce } from '@/lib/utils';
import apiCall from '@/lib/axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { createProduct, updateProduct } from '@/app/redux/actions/productActions';
import { createCoupon, updateCoupon } from '@/app/redux/actions/couponsActions';

interface CouponFormProps {
  initialData: any | null;
  isDisabled?: boolean;
}

// const couponFormSchema = z.object({
//   CouponType: z.enum(['Normal', 'Subscription']),
//   CouponCategory: z.enum(['Normal','FreeDelivery','CelebrityType','SeasonSpecial']),
//   Code: z.string().min(1, 'Coupon Code is required'),
//   DiscountType: z.enum(['Percentage', 'FixedAmount']),
//   DiscountPercentage: z.number().positive('Discount Percentage must be greater than zero'),
//   DiscountPrice: z.number().positive('Discount Price must be greater than zero'),
//   Status: z.enum(['Active', 'Inactive']),
//   ValidityType: z.enum(['DateRange', 'NoRange']),
//   StartDate: z.date().optional(),
//   EndDate: z.date(),
//   CouponVisibility: z.enum(['Admin', 'Public','Private']),
//   Description: z.string().optional(),
//   CouponsName: z.string().min(1,'Coupon Name is required'),
//   ImageUrl: z.any(),
//   Subscriptions: z.array(z.string()).optional(),
// });

// const couponFormSchema = z.object({
//   CouponType: z.enum(['Normal', 'Subscription']),
//   CouponCategory: z.enum(['Normal', 'FreeDelivery', 'CelebrityType', 'SeasonSpecial']),
//   Code: z.string().min(1, 'Coupon Code is required'),
//   DiscountType: z.enum(['Percentage', 'FixedAmount']),
//   DiscountPercentage: z.number().positive('Discount Percentage must be greater than zero').optional(),
//   DiscountPrice: z.number().positive('Discount Price must be greater than zero').optional(),
//   Status: z.enum(['Active', 'Inactive']),
//   ValidityType: z.enum(['DateRange', 'NoRange']),
//   StartDate: z.date().optional(),
//   EndDate: z.date().optional(),
//   CouponVisibility: z.enum(['Admin', 'Public', 'Private']),
//   Description: z.string().optional(),
//   CouponsName: z.string().optional(), // Keep it optional by default
//   ImageUrl: z.any(),
//   Subscriptions: z.array(z.string()).optional(),
// }).refine(data => {
//   // Ensure CouponsName is required only when CouponCategory is 'SeasonSpecial'
//   if (data.CouponCategory === 'SeasonSpecial' && (!data.CouponsName || data.CouponsName.trim() === '')) {
//     return false; // Validation fails
//   }
//   return true; // Validation passes
// }, {
//   message: 'Coupon Name is required when the category is Season Special',
//   path: ['CouponsName'], // Specify the path for the error message
// }).refine(data => {
//   // Ensure DiscountPrice is required when DiscountType is 'FixedAmount'
//   if (data.DiscountType === 'FixedAmount' && (!data.DiscountPrice || data.DiscountPrice <= 0)) {
//     return false; // Validation fails
//   }
//   return true; // Validation passes
// }, {
//   message: 'Discount Price is required when the discount type is Fixed Amount',
//   path: ['DiscountPrice'],
// }).refine(data => {
//   // Ensure DiscountPercentage is required when DiscountType is 'Percentage'
//   if (data.DiscountType === 'Percentage' && (!data.DiscountPercentage || data.DiscountPercentage <= 0)) {
//     return false; // Validation fails
//   }
//   return true; // Validation passes
// }, {
//   message: 'Discount Percentage is required when the discount type is Percentage',
//   path: ['DiscountPercentage'],
// }).refine(data => {
//   // Ensure EndDate is required when ValidityType is 'DateRange'
//   if (data.ValidityType === 'DateRange' && (!data.EndDate || isNaN(data.EndDate.getTime()))) {
//     return false; // Validation fails
//   }
//   return true; // Validation passes
// }, {
//   message: 'End Date is required when the validity type is Date Range',
//   path: ['EndDate'],
// });


const couponFormSchema = z.object({
  CouponType: z.enum(['Normal', 'Subscription']),
  CouponCategory: z.enum(['Normal', 'FreeDelivery', 'CelebrityType', 'SeasonSpecial']),
  Code: z.string().min(1, 'Coupon Code is required'),
  DiscountType: z.enum(['Percentage', 'FixedAmount']),
  DiscountPercentage: z.number().positive('Discount Percentage must be greater than zero').optional(),
  DiscountPrice: z.number().positive('Discount Price must be greater than zero').optional(),
  Status: z.enum(['Active', 'Inactive']),
  ValidityType: z.enum(['DateRange', 'NoRange']),
  StartDate: z.date().optional(),
  EndDate: z.date().optional(),
  CouponVisibility: z.enum(['Admin', 'Public', 'Private']),
  Description: z.string().optional(),
  CouponsName: z.string().optional(), // Keep it optional by default
  ImageUrl: z.any(),
  Subscriptions: z.array(z.string()).optional(),
}).refine(data => {
  // Ensure CouponsName is required only when CouponCategory is 'SeasonSpecial'
  if (data.CouponCategory === 'SeasonSpecial' && (!data.CouponsName || data.CouponsName.trim() === '')) {
    return false; // Validation fails
  }
  return true; // Validation passes
}, {
  message: 'Coupon Name is required when the category is Season Special',
  path: ['CouponsName'], // Specify the path for the error message
}).refine(data => {
  // Ensure DiscountPrice is required when DiscountType is 'FixedAmount'
  if (data.DiscountType === 'FixedAmount' && (!data.DiscountPrice || data.DiscountPrice <= 0)) {
    return false; // Validation fails
  }
  return true; // Validation passes
}, {
  message: 'Discount Price is required when the discount type is Fixed Amount',
  path: ['DiscountPrice'],
}).refine(data => {
  // Ensure DiscountPercentage is required when DiscountType is 'Percentage'
  if (data.DiscountType === 'Percentage' && (!data.DiscountPercentage || data.DiscountPercentage <= 0)) {
    return false; // Validation fails
  }
  return true; // Validation passes
}, {
  message: 'Discount Percentage is required when the discount type is Percentage',
  path: ['DiscountPercentage'],
}).refine(data => {
  // Ensure EndDate is required when ValidityType is 'DateRange'
  if (data.ValidityType === 'DateRange' && (!data.EndDate || isNaN(data.EndDate.getTime()))) {
    return false; // Validation fails
  }
  return true; // Validation passes
}, {
  message: 'End Date is required when the validity type is Date Range',
  path: ['EndDate'],
}).refine(data => {
  // Ensure Subscriptions is required when CouponType is 'Subscription'
  if (data.CouponType === 'Subscription' && (!data.Subscriptions || data.Subscriptions.length === 0)) {
    return false; // Validation fails
  }
  return true; // Validation passes
}, {
  message: 'At least one Subscription is required when the coupon type is Subscription',
  path: ['Subscriptions'],
});



type CouponFormSchema = z.infer<typeof couponFormSchema>;



export const CreateCoupons: React.FC<CouponFormProps> = ({ initialData,isDisabled }) => {
  
  const [fetchedSubscription, setFetchedSubscription] = useState<any[]>([]);


  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = (isDisabled && initialData) ? 'View Coupon' :(isDisabled===false && initialData)? 'Edit Coupon':"Create Coupon"
  const description=(isDisabled && initialData) ? 'Details of Coupon' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;
const action = initialData ? 'Save changes' : 'Create';

const form = useForm<CouponFormSchema>({
  resolver: zodResolver(couponFormSchema),
  mode: 'onChange',
  defaultValues: {
    CouponType: initialData?.CouponType || 'Normal',
    CouponCategory: initialData?.CouponCategory || 'Normal',
    Code: initialData?.Code || '',
    DiscountType: initialData?.DiscountType || 'FixedAmount',
    DiscountPercentage: initialData?.DiscountPercentage || undefined,
    DiscountPrice: initialData?.DiscountPrice || undefined,
    CouponsName: initialData?.CouponsName || '',
    Status: initialData?.Status || 'Active',
    ValidityType: initialData?.ValidityType || 'DateRange',
    StartDate: initialData?.StartDate ? new Date(initialData.StartDate) : new Date(),
    EndDate: initialData?.EndDate ? new Date(initialData.EndDate) : undefined,
    CouponVisibility: initialData?.CouponVisibility || 'Admin',
    Description: initialData?.Description || '',
    ImageUrl: undefined,
    Subscriptions: initialData?.Subscriptions?.map((subscription: any) => subscription._id) || [], // Using 'any' type
  }
});

  const { control, handleSubmit, setValue, watch, formState: { errors } } = form;

  const selectedCouponType = watch('CouponType');
  const selectedCouponCategory = watch('CouponCategory');
  const selectedDiscountType = watch('DiscountType');
  const selectedValidityType = watch('ValidityType');
  // const selectedSubscriptionType = watch('subscriptionType');
  // const discountPrice = watch('discountPrice');

  useEffect(() => {
    if (selectedCouponType === 'Normal') {
      setValue('Subscriptions', []);
    }
  }, [selectedCouponType, setValue]);

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      // dispatch(setLoading(true)); // Set loading state
      if ((isDisabled===false && initialData)) {
        // Update existing product
        const response = await dispatch(updateCoupon({ id: initialData._id, couponData: data }));
        if (response.type === 'coupon/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Coupon Updated", // 'Item updated.'
          });
          router.push('/coupons')
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update coupon',
          });
        }
      } else {
        // Create new product
        const response = await dispatch(createCoupon(data));
        if (response.type === 'coupon/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Coupon Created", // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/coupons')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to create coupon',
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
      // dispatch(setLoading(false)); // Reset loading state
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/coupons/${params.couponId}`);
      // router.refresh();
      // router.push(`/dashboard/coupons`);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
// Search subscription debouncing implementation
const [searchSubscriptionTerm, setSearchSubscriptionTerm] = useState('');


const fetchSubscription = useCallback(
  debounce(async (term: string) => {
    if (!term) {
      return;
    }

    try {
      const response = await apiCall('GET', `/subscription/search?term=${term}`);
      if (response.status) {
        console.log(response.data.subscriptions)
        setFetchedSubscription(response.data.subscriptions)
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  }, 500),
  []
);

useEffect(() => {
  if(initialData){
    // setFetchedSubscription(initialData.Subscriptions);
  }
  fetchSubscription(searchSubscriptionTerm);
}, [searchSubscriptionTerm, fetchSubscription]);


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
       
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="w-full gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="CouponType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Type</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Coupon Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal Discount</SelectItem>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        {/* <SelectItem value="freeDelivery">Free Delivery</SelectItem>
                        <SelectItem value="celebrity">Celebrity Type</SelectItem>
                        <SelectItem value="seasonSpecial">Season Special</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.CouponType?.message}</FormMessage>
                </FormItem>
              )}
            />


<FormField
              control={form.control}
              name="CouponCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Category</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Coupon Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FreeDelivery">Free Delivery</SelectItem>
                        <SelectItem value="CelebrityType">Celebrity Type</SelectItem>
                        <SelectItem value="SeasonSpecial">Season Special</SelectItem>
                        <SelectItem value="Normal">Normal Category</SelectItem>

                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.CouponCategory?.message}</FormMessage>
                </FormItem>
              )}
            />
            

          {selectedCouponCategory==="SeasonSpecial"  &&  <FormField
              control={form.control}
              name="CouponsName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coupon Name"
                      {...field}
                      disabled={isDisabled||loading}
                    />
                  </FormControl>
                  <FormMessage>{errors.CouponsName?.message}</FormMessage>
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="Code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coupon Code"
                      {...field}
                      disabled={isDisabled||loading}
                    />
                  </FormControl>
                  <FormMessage>{errors.Code?.message}</FormMessage>
                </FormItem>
              )}
            />

{selectedCouponCategory !== 'FreeDelivery' && <FormField
              control={form.control}
              name="DiscountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Discount Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FixedAmount">Flat Price</SelectItem>
                        <SelectItem value="Percentage">Flat Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.DiscountType?.message}</FormMessage>
                </FormItem>
              )}
            />}

      {selectedCouponCategory !== 'FreeDelivery' &&    
      <>
       {selectedDiscountType ==='FixedAmount' && <FormField
              control={form.control}
              name="DiscountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Discount Price"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                      disabled={isDisabled||loading}
                    />
                  </FormControl>
                  <FormMessage>{errors.DiscountPrice?.message}</FormMessage>
                </FormItem>
              )}
            />}

     {selectedDiscountType==="Percentage" &&   <FormField
              control={form.control}
              name="DiscountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Discount Percentage"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                      disabled={isDisabled||loading}
                    />
                  </FormControl>
                  <FormMessage>{errors.DiscountPercentage?.message}</FormMessage>
                </FormItem>
              )}
            />}
            </>
            }




{<FormField
              control={form.control}
              name="ValidityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validity Type</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Validity Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DateRange">Date Range</SelectItem>
                        <SelectItem value="NoRange">No Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.ValidityType?.message}</FormMessage>
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="StartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          disabled={isDisabled||loading}
                          className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                        >
                          {field.value ? format(field.value, 'dd MMM yyyy') : <span>Pick a date</span>}
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
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage>{errors.StartDate?.message}</FormMessage>
                </FormItem>
              )}
            />

      {selectedValidityType==="DateRange" &&      <FormField
              control={form.control}
              name="EndDate"
              disabled={isDisabled||loading}
                            render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          disabled={isDisabled||loading}
                          className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                        >
                          {field.value ? format(field.value, 'dd MMM yyyy') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage>{errors.EndDate?.message}</FormMessage>
                </FormItem>
              )}
            />}

           {selectedCouponCategory!=='CelebrityType' && 
           <FormField
              control={form.control}
              name="CouponVisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupons Visibility</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin Only</SelectItem>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">User Specific</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.CouponVisibility?.message}</FormMessage>
                </FormItem>
              )}
            />}

<FormField
              control={form.control}
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupons Status</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.Status?.message}</FormMessage>
                </FormItem>
              )}
            />
             {/* <FormField
              control={form.control}
              name="times"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of times can be applied</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Enter No of times can be applied"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      {...field}
                      disabled={isDisabled||loading}
                    />
                  </FormControl>
                  <FormMessage>{errors.Description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="ImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isDisabled||loading}
                      // disabled={form.formState.isSubmitting}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            

          </div>
          {selectedCouponType === 'Subscription' && (
             <FormField
             control={form.control}
             name="Subscriptions"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Subscription Type</FormLabel>
                 <FormControl>
                   <Controller
                     control={form.control}
                     name="Subscriptions"
                     disabled={isDisabled||loading}
                     render={({ field: { onChange, value } }) => (
                       <ReactSelect
                         isClearable
                         isSearchable
                         isMulti
                         options={fetchedSubscription}
                         onInputChange={(inputValue) => setSearchSubscriptionTerm(inputValue)}
                         getOptionLabel={(option) => 
                           `${option.subscriptionType[0]?.Name || ''} ${option.frequencyType[0]?.Name || ''} ${option.TotalDeliveryNumber || ''} ${option.bag[0]?.BagName || ''}` // Ensure no undefined values
                         }
                         getOptionValue={(option) => option._id}  // Correct value for form
                         onChange={(selected) => {
                           // If selected is an array, map to their ids
                           onChange(selected ? selected.map(item => item._id) : []);
                         }}
                         value={fetchedSubscription.filter(option => value?.includes(option._id))} // Filter options based on selected values
                       />
                     )}
                   />
                 </FormControl>
                 <FormMessage>{errors.Subscriptions?.message}</FormMessage>
               </FormItem>
             )}
           />
     
            )}

            
          <div className="mt-8 flex justify-between">
          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Coupon':"Create Coupon"}     
            </Button>}
          </div>
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
