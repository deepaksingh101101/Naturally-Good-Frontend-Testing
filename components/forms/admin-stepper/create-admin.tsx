'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';


const adminFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  contactInformation: z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
  }),
  password: z.string().min(1, 'Password is required'),

});

export const CreateAdminForm: React.FC<{initialData:any}> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(adminFormSchema),
    defaultValues: initialData || {
      name: '',
      role: 'admin',
      contactInformation: {
        email: '',
        phone: '',
      },
      password:""
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof adminFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing employee
      } else {
        // Create new employee
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return null;
  };

  // const filterOption = (option: any, inputValue: string) => {
  //   const user = userOptions.find((user) => user.id === option.value);
  //   return (
  //     option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
  //     (user && user.phoneNo.includes(inputValue))
  //   );
  // };

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Admin' : 'Create Admin'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.name)}</FormMessage>
                </FormItem>
              )}
            />
          
               <FormField
              control={control}
              name="contactInformation.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Phone" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.contactInformation)}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contactInformation.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={loading} placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.contactInformation)}</FormMessage>
                </FormItem>
              )}
            />
         <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={loading} placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.password)}</FormMessage>
                </FormItem>
              )}
            />
           
          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create Employee'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
