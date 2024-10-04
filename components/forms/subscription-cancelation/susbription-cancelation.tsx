'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  reason: z.string().min(1, 'Reason for cancelation Name is required'),
  subscriptionType: z.string().min(1, 'Subscription Type is required'),
  subscriptionPrice: z.number().positive('Subscription Price must be greater than zero'),
  netPrice: z.number().positive('Net Price must be greater than zero'),
  orignalPrice: z.number().positive('Original Price must be greater than zero'),
  remainingDeliveries: z.number().positive('Remaining Deliveries must be greater than zero'),
  totalDeliveries: z.number().positive('Total Deliveries must be greater than zero'),  // Add this line
  remainingBags: z.number().positive('Remaining Bags must be greater than zero'),
  amountPaid: z.number().optional(),
  amountRemaining: z.number().optional(),
});


export const SubscriptionCancel: React.FC<OrderManagementFormType> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = 'Cancel Subscription';
  const description = 'Cancel the subscription and refund the remaining money.';
  const action = 'Cancel';

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues: {
      customerName: 'Deepak singh',
      reason: '',
      subscriptionType: 'Monthly Mini veggie',
      subscriptionPrice: 12000,
      netPrice: 0,
      orignalPrice: 0,
      remainingDeliveries: 3,
      totalDeliveries: 4,  // Add this line
      remainingBags: 3,
      amountPaid: 12000,
      amountRemaining: 9000,
    }
    
  });

  const { control, handleSubmit, setValue, formState: { errors } } = form;

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/orders/${initialData._id}`);
      // router.refresh();
      // router.push(`/dashboard/orders`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="w-full gap-8 md:grid md:grid-cols-3">
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
                      value={field.value || ''}
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
                      value={field.value || ''}
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
                      placeholder="Amount Paid"
                      value={field.value || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountRemaining"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Remaining</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Amount Remaining"
                      value={field.value || 0}
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
                      value={field.value || 0}
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
              name="remainingBags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remaining Bags</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Remaining Bags"
                      value={field.value || 0}
                      disabled
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : 0;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.remainingBags?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason For Cancelation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter reason for cancelation"
                      disabled={true}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage>{errors.reason?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
          <Button
            type="submit"
            className='bg-red-500 text-white justify-end hover:bg-red-600'
            disabled={loading}
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
