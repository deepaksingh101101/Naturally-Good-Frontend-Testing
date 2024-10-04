'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash, CalendarIcon, Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { cn, debounce } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import ReactSelect from 'react-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay, isBefore, addDays, getDay } from 'date-fns';
import apiCall from '@/lib/axios';
import { createOrder, updateOrder } from '@/app/redux/actions/orderActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetAlert';

interface Coupon {
  id: string;
  code: string;
  discountPrice: number;
}


interface OrderManagementFormType {
  initialData: any ;
  isDisabled: boolean;
}

const orderFormSchema = z.object({
  UserId: z.string().min(1, 'Customer Name is required'),
  SubscriptionId: z.string().min(1, 'Subscription Type is required'),
  SubscriptionPrice: z.number().positive('Subscription Price must be greater than zero'),
  NetPrice: z.number().positive('Net Price must be greater than zero'),
  Coupons: z.any().optional(),
  ManualDiscountPercentage: z.number().min(0, 'Manual Discount cannot be negative').default(0),
  AmountReceived: z.number().min(0, 'Amount Received cannot be negative').default(0),
  AmountDue: z.number().min(0, 'Amount Due cannot be negative').default(0),
  DeliveryStartDate: z.date({
    required_error: "Delivery Date is required.",
  }),
  BookingDate: z.date({
    required_error: "Booking Date is required.",
  }),
  PaymentDate: z.date({
    required_error: "Payment Date is required.",
  }),
  PaymentStatus: z.string(),
  PaymentType: z.string(),
  SpecialInstruction: z.string().optional(),
  Status: z.string(),
  ManualDiscount: z.number(),
  DeliveryCharge: z.number().min(0, 'Delivery Charge cannot be negative').optional().default(0),
});


const getDayIndex = (day: string): number => {
  switch(day) {
    case 'SUNDAY': return 0;
    case 'MONDAY': return 1;
    case 'TUESDAY': return 2;
    case 'WEDNESDAY': return 3;
    case 'THURSDAY': return 4;
    case 'FRIDAY': return 5;
    case 'SATURDAY': return 6;
    default: return -1;
  }
};

export const CreateOrder: React.FC<OrderManagementFormType> = ({ initialData,isDisabled }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualDiscountPercentage, setManualDiscountPercentage] = useState(0); // New state for manual discount percentage
  const title = initialData ? 'Edit Order' : 'Create New Order';
  const description = initialData ? 'Edit the Order details.' : 'To create a new Order, fill in the required information.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues: {
      UserId: '',
      SubscriptionId: '',
      SubscriptionPrice: 0,
      NetPrice: 0,
      Coupons: undefined,
      ManualDiscountPercentage: 0,
      AmountReceived: 0,
      AmountDue: 0,
      DeliveryStartDate: undefined,
      BookingDate: new Date(),
      PaymentDate: new Date(), 
      PaymentStatus: 'Pending',
      PaymentType: '',
      SpecialInstruction: '',
      Status: 'Active',  // New default value for order status
      ManualDiscount:0,
      DeliveryCharge:0
    }
  });

  const { control, trigger, watch, handleSubmit, setValue, formState: { errors } } = form;

  const selectedPaymentType=watch('PaymentType');
  const selectedBookingDate=watch('BookingDate');
  const selectedPaymentDate=watch('PaymentDate');

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      setLoading(true);
      const addISTOffset = (date:any) => {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + 5, newDate.getMinutes() + 30); // Add 5 hours and 30 minutes
        return newDate;
      };
      
      const newData = {
        ...data, // Copy all original data fields
        Coupons: data?.Coupons?._id, // Replace Coupons with the couponId
        ManualDiscountPercentage: manualDiscountPercentage,
        BookingDate: addISTOffset(selectedBookingDate), // Adjusted for IST
        PaymentDate: addISTOffset(selectedPaymentDate),  // Adjusted for IST
        DeliveryStartDate: addISTOffset(selectedDeliveryStartDate),  // Adjusted for IST
      };
  
      if (isDisabled === false && initialData) {
        const response = await dispatch(updateOrder({ id: initialData._id, orderData: newData }));
        if (response.type === 'order/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Order Updated",
          });
          router.push('/order-management');
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload?.message || 'Failed to update order',
          });
        }
      } else {
        // Creating a new order
        const response = await dispatch(createOrder(newData));
        if (response.type === 'order/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: "Order Created",
          });
          form.reset(); // Clear all fields in the form only on successful creation
          router.push('/order-management');
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload?.message || 'Failed to create order',
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
      setLoading(false);
    }
  };
  

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storemployeeName}/orders/${params.orderId}`);
      // router.refresh();
      // router.push(`/${params.storemployeeName}/orders`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

// Search use debouncing implementation
  const [fetchedUser, setFetchedUser] = useState<{ id: string; name: string,phone:string,email:string }[]>([]);
  const [searchUserTerm, setSearchUserTerm] = useState('');

  
  const fetchUser = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        setFetchedUser([]);
        return;
      }

      try {
        const response = await apiCall('GET', `/admin/user/filter?term=${term}`);
        if (response.status) {
          setFetchedUser(response.data.users.map((user: any) => ({ name: user.FirstName + user.LastName, id: user._id,phone:user.PhoneNumber,email:user.Email  })))
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchUser(searchUserTerm);
  }, [searchUserTerm, fetchUser]);

 

// Search subscription debouncing implementation
const [fetchedSubscription, setFetchedSubscription] = useState<any[]>([]);
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
  fetchSubscription(searchSubscriptionTerm);
}, [searchSubscriptionTerm, fetchSubscription]);


// Coupons
// Search subscription debouncing implementation
const [fetchedCoupons, setFetchedCoupons] = useState<any[]>([]);
const [searchCouponTerm, setSearchCouponTerm] = useState('');


const fetchCoupon = useCallback(
  debounce(async (term: string) => {
    if (!term) {
      return;
    }

    try {
      const response = await apiCall('GET', `/coupons/searchInOrder/?term=${term}`,{userId:selectedCustomer});
      if (response.status) {
        setFetchedCoupons(response.data.coupons)
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  }, 500),
  []
);

useEffect(() => {
  fetchCoupon(searchCouponTerm);
}, [searchCouponTerm, fetchCoupon]);




  const selectedSubscriptionType = watch('SubscriptionId');
  const selectedDeliveryStartDate = watch('DeliveryStartDate');
  const selectedCustomer:any = watch('UserId');
  const selectedCoupon = watch('Coupons') as any | undefined;
  const subscriptionPrice = watch('SubscriptionPrice');
  const manualDiscount = watch('ManualDiscount');
  const netPrice = watch('NetPrice'); // Watch netPrice
  const amountReceived = watch('AmountReceived'); // Watch netPrice
  const amountDue = watch('AmountDue'); // Watch netPrice
  const selectedDeliveryCharge = watch('DeliveryCharge'); // Watch netPrice




  const isAllowedDeliveryDate = (date: Date, allowedDays: string[]) => {
    const today = new Date();
    if (isBefore(date, today)) {
      return false;
    }
    const dayIndex = getDay(date);
    return allowedDays.some(day => getDayIndex(day) === dayIndex);
  };

  const highlightDeliveryDate = (date: Date, allowedDays: string[]) => {
    const dayIndex = getDay(date);
    return allowedDays.some(day => getDayIndex(day) === dayIndex);
  };





  useEffect(() => {
    const subscription = fetchedSubscription.find(option => option._id === selectedSubscriptionType);
    if (subscription) {
      setValue('SubscriptionPrice', subscription?.NetPrice);
      setValue('Coupons', undefined); // Reset coupon when subscription type changes
      setValue('ManualDiscount', 0); // Reset manual discount when subscription type changes
      setValue('NetPrice', subscription.NetPrice); // Reset net price
      setValue('AmountDue', subscription.NetPrice+selectedDeliveryCharge-amountReceived); // Reset net price
      setValue('AmountReceived', 0); // Reset net price

    } else {
      setValue('SubscriptionPrice', 0);
      setValue('Coupons', undefined);
      setValue('ManualDiscount', 0);
      setValue('NetPrice', 0);
    }
  }, [selectedSubscriptionType, setValue]);

  useEffect(() => {
    let netPrice = subscriptionPrice;
    if (selectedCoupon && selectedCoupon.DiscountPrice) {
      netPrice -= selectedCoupon?.DiscountPrice;
    }
    else if(selectedCoupon && selectedCoupon.DiscountPercentage){
      netPrice -= selectedCoupon?.DiscountPercentage;
    }
    if (manualDiscount) {
      netPrice -= manualDiscount;
    }
    setValue('NetPrice', netPrice);
    setValue('AmountDue',netPrice-amountReceived+selectedDeliveryCharge);

  }, [selectedCoupon, manualDiscount, setValue,selectedPaymentType]);


  useEffect(() => {
    setValue('AmountDue',netPrice-amountReceived+selectedDeliveryCharge);


  }, [netPrice,selectedDeliveryStartDate,setValue,amountReceived,selectedDeliveryCharge]);



  // Update manual discount percentage when net price or subscription price changes
  useEffect(() => {
    if (subscriptionPrice > 0) {
      const discountPercentage = ((subscriptionPrice - netPrice) / subscriptionPrice) * 100;
      setManualDiscountPercentage(discountPercentage);
    } else {
      setManualDiscountPercentage(0);
    }
  }, [netPrice, subscriptionPrice,selectedPaymentType]);

  interface DeliveryDay {
    day: string;
    _id: string;
  }
  const allowedDeliveryDays: string[] = fetchedSubscription
  .find(option => option._id === selectedSubscriptionType)
  ?.DeliveryDays.map((dayObj: DeliveryDay) => dayObj.day.toUpperCase()) || [];
  
  // const allowedDeliveryDays: string[] = ['MONDAY', 'TUESDAY']


  const getDeliveryDayFromDate = (date: Date): string => {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return daysOfWeek[date.getDay()]; // Use getDay() instead of getUTCDay()
  };
  
  const [isDeliveryChargeVisible, setIsDeliveryChargeVisible] = useState(false);

  useEffect(() => {  
     setValue('DeliveryCharge', 0);
    if(!selectedDeliveryStartDate){
      return;
    }
    const selectedDay = getDeliveryDayFromDate(new Date(selectedDeliveryStartDate)); // Get day from selected date
    const isDayAllowed = allowedDeliveryDays.includes(selectedDay); // Check if it's in allowed days
    if (!isDayAllowed) {
      setIsDeliveryChargeVisible(true); // Show delivery charge field if not allowed
      fetchDeliveryCharge(); // Fetch the delivery charge
    } else {
      setIsDeliveryChargeVisible(false); // Hide delivery charge field if allowed
    }
  }, [selectedDeliveryStartDate]);

  console.log(fetchedSubscription)
  const fetchDeliveryCharge = async () => {
    // Fetch delivery charge logic here (API call or calculation)
    const response=await apiCall('GET', `/order/deliveryCharge/${selectedCustomer}`);
    const foundSubscription = fetchedSubscription?.find(
      (subscription) => subscription._id === selectedSubscriptionType
  );
    // Get the total delivery number
  const totalDeliveryNumber = foundSubscription ? foundSubscription.TotalDeliveryNumber : null;
 
   setValue('DeliveryCharge', response?.data*totalDeliveryNumber);
   console.log(amountDue)
  //  setValue('AmountDue',amountDue+ selectedDeliveryCharge);
    // Update the form with the fetched value (if needed)
    console.log("Fetching delivery charge...");
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="w-full gap-8 md:grid md:grid-cols-3">
            <>
              <Controller
                control={form.control}
                name="UserId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedUser}
                        onInputChange={(inputValue) => setSearchUserTerm(inputValue)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={fetchedUser.find(option => option.id === field.value)}
                       
                      />
                    </FormControl>
                    <FormMessage>{errors.UserId?.message}</FormMessage>
                  </FormItem>
                )}
              />

<Controller
  control={form.control}
  name="SubscriptionId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Subscription Type</FormLabel>
      <FormControl>
        <ReactSelect
          isClearable
          isSearchable
          options={fetchedSubscription}
          getOptionLabel={(option) => option.subscriptionType[0]?.Name + " "+option.frequencyType[0]?.Name +" "+option.TotalDeliveryNumber+" "+option.bag[0]?.BagName}  // Correct label for display
          getOptionValue={(option) => option._id}  // Correct value for form
          onInputChange={(inputValue) => setSearchSubscriptionTerm(inputValue)}
          isDisabled={loading}
          onChange={(selected) => field.onChange(selected ? selected._id : '')}
          value={fetchedSubscription.find(option => option._id === field.value)}
        />
      </FormControl>
      <FormMessage>{errors.SubscriptionId?.message}</FormMessage>
    </FormItem>
  )}
/>



              <FormField
                control={form.control}
                name="SubscriptionPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Subscription Price"
                        value={field.value} // Corrected
                        onChange={field.onChange} // Corrected
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             

              <FormField
                control={form.control}
                name="NetPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Net Price"
                        value={field.value || ''} // Corrected
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{errors.NetPrice?.message}</FormMessage>
                  </FormItem>
                )}
              />
 <Controller
                control={form.control}
                name="Coupons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedCoupons}
getOptionLabel={(option) => 
    option?.Code.toUpperCase() + " " + 
    (option?.DiscountPrice ? ` ₹${option.DiscountPrice}` : `${option?.DiscountPercentage}%`) || ''
}
                        getOptionValue={(option) => option?._id || ''}
                        onInputChange={(inputValue) => setSearchCouponTerm(inputValue)}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected || undefined)}
                        // value={field.value}
                        value={fetchedCoupons.find(option => option?._id === field.value)}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ManualDiscountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manual Discount</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        value={manualDiscountPercentage.toFixed(2) + '%'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           <FormField
  control={form.control}
  name="AmountReceived"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Amount Received</FormLabel>
      <FormControl>
        <Input
          type="number"
          disabled={loading||selectedPaymentType==="Cod"}
          placeholder="Enter Amount Received"
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === '' ? '' : Number(value));
          }}
          value={field.value
            //  === undefined ? '' :selectedPaymentType==="Cod"?0: field.value
            }
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>



<FormField
  control={form.control}
  name="AmountDue"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Amount Dues</FormLabel>
      <FormControl>
        <Input
          type="number"
          disabled
          placeholder="Enter Amount Dues"
          onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          value={
            field.value 
            // ||
            // selectedPaymentType === "Cod"
            //   ? netPrice - (selectedCoupon?.discountPrice ?? 0)
            //   : netPrice - amountReceived
          }
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <FormField
                control={form.control}
                name="BookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Booking Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date < new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />


<FormField
                control={form.control}
                name="DeliveryStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                            isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))
                          }
                          modifiers={{
                            highlight: (date) => highlightDeliveryDate(date, allowedDeliveryDays)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

{isDeliveryChargeVisible && (
        <FormField
          control={form.control}
          name="DeliveryCharge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Charge</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Delivery Charge"
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage>{errors.DeliveryCharge?.message}</FormMessage>
            </FormItem>
          )}
        />
      )}
  

              <FormField
                control={form.control}
                name="PaymentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date < new Date(new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PaymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Payment Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PaymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <Controller
                      control={control}
                      name="PaymentType"
                      render={({ field }) => (
                        <ReactSelect
                          isClearable
                          isSearchable
                          options={[
                            { id: 'upi', name: 'UPI' },
                            { id: 'netbanking', name: 'Net Banking' },
                            { id: 'card', name: 'Credit/Debit' },
                            { id: 'cash', name: 'Cash On Delivery' }
                          ]}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          isDisabled={loading}
                          onChange={(selected) => field.onChange(selected ? selected.id : '')}
                          value={[
                            { id: 'Upi', name: 'UPI' },
                            { id: 'Netbanking', name: 'Net Banking' },
                            { id: 'Credit/Debit', name: 'Credit/Debit' },
                            { id: 'Cod', name: 'Cash On Delivery' }

                          ].find(option => option.id === field.value)}
                        />
                      )}
                    />
                    <FormMessage>{errors.PaymentType?.message}</FormMessage>
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="Status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Status</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Order Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            </>
          </div>

          <FormField
            control={form.control}
            name="SpecialInstruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    rows={5}
                    placeholder="Enter Special Instructions"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 flex justify-between">
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
      {initialData && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-between">
            <Heading
              title="Delete Order"
              description="This action cannot be undone."
            />
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              Delete Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
