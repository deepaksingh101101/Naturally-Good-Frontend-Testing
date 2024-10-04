'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash, CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import ReactSelect from 'react-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore, getDay } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Coupon {
  id: string;
  code: string;
  discountPrice: number;
}

interface SubscriptionType {
  id: string;
  name: string;
  subScriptionPrice: number;
  coupons: Coupon[];
  allowedDeliveryDays: string[];
  totalBags: number;
}

interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  assignedEmployee: {
    name: string;
    phoneNumber: string;
  };
}

interface OrderManagementFormType {
  initialData: any | null;
}

const orderFormSchema = z.object({
  customerName: z.string().min(1, 'Customer Name is required'),
  employeeName: z.string().min(1, 'Employee Name is required'),
  subscriptionType: z.string().min(1, 'Subscription Type is required'),
  subscriptionPrice: z.number().positive('Subscription Price must be greater than zero'),
  coupon: z.object({
    id: z.string(),
    code: z.string(),
    discountPrice: z.number()
  }).optional(),
  manualDiscount: z.number().min(0, 'Manual Discount cannot be negative').default(0),
  manualDiscountPercentage: z.number().default(0),
  netPrice: z.number().positive('Net Price must be greater than zero'),
  deliveryStartDate: z.date({
    required_error: "Delivery Date is required.",
  }),
  upgradationDate: z.date({
    required_error: "Upgradation Date is required.",
  }),
  paymentDate: z.date({
    required_error: "Payment Date is required.",
  }),
  deliveryStatus: z.string(),
  bagOrdered: z.array(z.string()).min(1, 'Products Ordered is required'),
  totalWeight: z.number().positive('Total Weight must be greater than zero'),
  paymentStatus: z.string(),
  paymentType: z.string(),
  totalDeliveries: z.number().positive('Total Deliveries must be greater than zero'),
  orignalPrice: z.number().positive('orignalPrice must be greater than zero'),
  remainingDeliveries: z.number().positive('Remaining Deliveries must be greater than zero'),
  specialInstructions: z.string().optional(),
  remainingAmount: z.number().optional(),
  amountPaid: z.number().optional(),
  remainingBags: z.number().positive('Remaining Bags must be greater than zero'),
  additionalBags: z.number().positive('Additional Bags must be greater than zero')
});

const dummyBags = [
  { value: 'Regular Veggie Bag', label: 'Regular Veggie Bag', weight: 4000 },
  { value: 'Mini Veggie Bag', label: 'Mini Veggie Bag', weight: 3000 },
  { value: 'Large Veggie Bag', label: 'Large Veggie Bag', weight: 5000 },
  { value: 'Veggie Bag', label: 'Veggie Bag', weight: 5000 }
];

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

function highlightDeliveryDate(date: Date, allowedDays: string[]) {
  const dayIndex = getDay(date);
  return allowedDays.some(day => getDayIndex(day) === dayIndex);
}

export const SubscriptionUpdate: React.FC<OrderManagementFormType> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualDiscountPercentage, setManualDiscountPercentage] = useState(0); // New state for manual discount percentage
  const title = initialData ? 'Edit Subscription' : 'Existing Subscription';
  const description = 'Edit the Subscription details.';
  const action = initialData ? 'Save changes' : 'Update';

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues: {
      customerName: '',
      employeeName: '',
      subscriptionType: '',
      subscriptionPrice: 0,
      coupon: undefined,
      manualDiscount: 0,
      manualDiscountPercentage: 0,
      netPrice: 0,
      deliveryStartDate: new Date(),
      upgradationDate: new Date(),
      paymentDate: new Date(),
      deliveryStatus: 'Pending',
      bagOrdered: [] as string[],
      totalWeight: 0,
      paymentStatus: 'Pending',
      paymentType: '',
      specialInstructions: '',
      remainingDeliveries: 0,
      totalDeliveries: 0,
      orignalPrice: 0,
      remainingAmount: 6000,
      amountPaid: 12000,
      remainingBags: 0,
      additionalBags: 0,
    }
  });

  const { control, trigger, watch, handleSubmit, setValue, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof orderFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/orders/edit-order/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/orders/create-order`, data);
        // console.log("order", res);
      }
      // router.refresh();
      // router.push(`/dashboard/orders`);
    } catch (error: any) {
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

  const orderedOptions = [
    { id: '1', name: 'Mini Veggie Bag' },
    { id: '2', name: 'Regular Veggie Bag' },
  ];

  const employeeOptions = [
    { id: '1', name: 'John Doe', phoneNumber: '123-456-7890' },
    { id: '2', name: 'Jane Smith', phoneNumber: '098-765-4321' },
  ];

  const customerOptions: Customer[] = [
    { id: '1', name: 'Alice Johnson', phoneNumber: '123-456-7890', assignedEmployee: { name: "John Doe", phoneNumber: '123-456-7890' } },
    { id: '2', name: 'Bob Brown', phoneNumber: '098-765-4321', assignedEmployee: { name: "Jane Smith", phoneNumber: '098-765-4321' } },
  ];

  const subscriptionTypes: SubscriptionType[] = [
    { id: '1', name: 'Monthly Veggies',totalBags:4, subScriptionPrice: 2000, allowedDeliveryDays: ['MONDAY', 'WEDNESDAY'], coupons: [{ id: '1', code: "TRYNEW200", discountPrice: 200 }, { id: '2', code: "TRYNEW100", discountPrice: 100 }, { id: '3', code: "NATGOOD800", discountPrice: 800 }] },
    { id: '2', name: 'Semi Annual Veggies',totalBags:24, subScriptionPrice: 12000, allowedDeliveryDays: ['THURSDAY', 'TUESDAY'], coupons: [{ id: '1', code: "TODAY200", discountPrice: 200 }, { id: '2', code: "TRY500", discountPrice: 500 }, { id: '3', code: "NATGOOD800", discountPrice: 800 }] }
  ];

  const selectedCustomer = watch('customerName');
  const selectedSubscriptionType = watch('subscriptionType');
  const selectedCoupon = watch('coupon') as Coupon | undefined;
  const subscriptionPrice = watch('subscriptionPrice');
  const manualDiscount = watch('manualDiscount');
  const netPrice = watch('netPrice');
  const remainingAmount = watch('remainingAmount');
  const remainingBags = watch('remainingBags');
  const additionalBags = watch('additionalBags');

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
    const customer = customerOptions.find(option => option.name === selectedCustomer);
    if (customer) {
      setValue('employeeName', customer.assignedEmployee.name);
    } else {
      setValue('employeeName', '');
    }
  }, [selectedCustomer, setValue]);

  useEffect(() => {
    const subscription = subscriptionTypes.find(option => option.name === selectedSubscriptionType);
    if (subscription) {
      setValue('subscriptionPrice', subscription.subScriptionPrice);
      setValue('orignalPrice', subscription.subScriptionPrice);
      setValue('coupon', undefined);
      setValue('manualDiscount', 0);
      let remaining = remainingAmount || 0;
      const r = 6000;
      let netPrice = subscription.subScriptionPrice - r;

      if (r > subscription.subScriptionPrice) {
        // setValue('remainingAmount',subscription.totalBags>6? r - subscription.subScriptionPrice:r);

        setValue('remainingAmount', r - subscription.subScriptionPrice);
        netPrice = 0;
      } else {
        setValue('remainingAmount', 0);
      }

      setValue('netPrice', netPrice);
      setValue('remainingBags', subscription.totalBags>6?subscription.totalBags-6:subscription.totalBags);//6 is the remaining bags
      setValue('additionalBags',subscription.totalBags>6?subscription.totalBags-12:0 );//12 is the taken bags

    } else {
      setValue('subscriptionPrice', 0);
      setValue('orignalPrice', 0);
      setValue('coupon', undefined);
      setValue('manualDiscount', 0);
      setValue('netPrice', 0);
      setValue('remainingAmount', 6000);
      setValue('remainingBags', 0);
    }
  }, [selectedSubscriptionType, setValue]);

  useEffect(() => {
    if (subscriptionPrice > 0) {
      const discountPercentage = ((subscriptionPrice - netPrice) / subscriptionPrice) * 100;
      setManualDiscountPercentage(discountPercentage);
    } else {
      setManualDiscountPercentage(0);
    }
  }, [netPrice, subscriptionPrice]);

  const allowedDeliveryDays = subscriptionTypes.find(option => option.name === selectedSubscriptionType)?.allowedDeliveryDays || [];

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
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Customer Name"
                        disabled={true}
                        value="Deepak singh"
                      />
                    </FormControl>
                    <FormMessage>{errors.customerName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subscriptionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subscription Type"
                        disabled={true}
                        value="Quaterly Veggie"
                      />
                    </FormControl>
                    <FormMessage>{errors.subscriptionType?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Paid</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Amount Paid "
                        value={12000}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalDeliveries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Deliveries</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total Deliveries"
                        value={12}
                        disabled
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{errors.totalDeliveries?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remainingDeliveries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remaining Deliveries</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Remaining Deliveries"
                        value={6}
                        disabled
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{errors.remainingDeliveries?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </>
          </div>
        </form>
      </Form>
      <div className="mt-8 pt-5 border-gray-200">
        <Heading
          title="Upgrade/Downgrade Subscription"
          description="Edit the Subscription details."
        />
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="w-full gap-8 md:grid md:grid-cols-3">
              <>
                <Controller
                  control={form.control}
                  name="subscriptionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Type</FormLabel>
                      <FormControl>
                        <ReactSelect
                          isClearable
                          isSearchable
                          options={subscriptionTypes}
                          getOptionLabel={(option) => `${option.name} - ${option.totalBags} bags`}
                          getOptionValue={(option) => option.id}
                          isDisabled={loading}
                          onChange={(selected) => field.onChange(selected ? selected.name : '')}
                          value={subscriptionTypes.find(option => option.name === field.value)}
                        />
                      </FormControl>
                      <FormMessage>{errors.subscriptionType?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orignalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Original Price"
                          value={watch('subscriptionPrice')}
                          disabled
                        />
                      </FormControl>
                      <FormMessage>{errors.orignalPrice?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="coupon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon</FormLabel>
                      <FormControl>
                        <ReactSelect
                          isClearable
                          isSearchable
                          options={subscriptionTypes.find(option => option.name === selectedSubscriptionType)?.coupons || []}
                          getOptionLabel={(option) => option?.code || ''}
                          getOptionValue={(option) => option?.id || ''}
                          isDisabled={loading}
                          onChange={(selected) => field.onChange(selected || undefined)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manualDiscountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manual Discount Percentage</FormLabel>
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

                {selectedSubscriptionType && (
                  <FormField
                    control={form.control}
                    name="netPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount To Be Paid</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Net Price"
                            value={netPrice || 0}
                            onChange={(e) => {
                              const value = e.target.value ? parseFloat(e.target.value) : 0;
                              setValue('netPrice', value);
                            }}
                          />
                        </FormControl>
                        <FormMessage>{errors.netPrice?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="remainingAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Remaining</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Remaining Amount"
                          onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryStartDate"
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

                <FormField
                  control={form.control}
                  name="upgradationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Upgradation Date</FormLabel>
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="paymentDate"
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="paymentStatus"
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
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Unpaid">Unpaid</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <Controller
                        control={control}
                        name="paymentType"
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            isSearchable
                            options={[
                              { id: 'Upi', name: 'UPI' },
                              { id: 'Netbanking', name: 'Net Banking' },
                              { id: 'Credit/Debit', name: 'Credit/Debit' }
                            ]}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            isDisabled={loading}
                            onChange={(selected) => field.onChange(selected ? selected.id : '')}
                            value={[
                              { id: 'Upi', name: 'UPI' },
                              { id: 'Netbanking', name: 'Net Banking' },
                              { id: 'Credit/Debit', name: 'Credit/Debit' }
                            ].find(option => option.id === field.value)}
                          />
                        )}
                      />
                      <FormMessage>{errors.paymentType?.message}</FormMessage>
                    </FormItem>
                  )}
                />
  <FormField
                  control={form.control}
                  name="additionalBags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Bags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Additional Bags"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage>{errors.additionalBags?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remainingBags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remaining Bags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Remaining Bags"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage>{errors.remainingBags?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              
              </>
            </div>

            <FormField
              control={form.control}
              name="specialInstructions"
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
      </div>
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
