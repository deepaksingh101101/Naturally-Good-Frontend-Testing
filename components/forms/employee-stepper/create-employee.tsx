'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Edit, Eye, EyeOff, KeyRound } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { createEmployee, updateEmployee } from '@/app/redux/actions/employeeActions';
import apiCall from '@/lib/axios';
import { createRole, getAllRoleName } from '@/app/redux/actions/dropdownActions';
import { setLoading } from '@/app/redux/slices/authSlice';
import { ToastAtTopRight } from '@/lib/sweetAlert';

interface EmployeeFormType {
  initialData: any | null;
  isDisabled?:boolean
}

const employeeFormSchema = z.object({
  FirstName: z.string().min(1, 'First Name is required'),
  LastName: z.string().min(1, 'Last Name is required'),
  RoleId: z.string().min(1, 'Role is required'),
  // IsActive: z.string().min(1, 'Status is required'),
  IsActive: z.boolean().optional(),
  Email: z.string().email('Invalid email format').min(1, 'Email is required'),
  PhoneNumber: z.string().length(10, 'Phone number must be exactly 10 characters long'),
  Password: z.string().min(6, 'Password must be at least 6 characters long'),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  StreetAddress: z.string().min(1, 'Address is required'),
  Gender: z.string().min(1, 'Gender is required'),
  Dob: z.date({
    required_error: 'Date of Birth is required.',
  }),
});

interface Role {
  _id: string;
  roleName: string;
}

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export const CreateEmployeeForm: React.FC<EmployeeFormType> = ({ initialData ,isDisabled}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([]); // Specify the type here

const form = useForm({
  resolver: zodResolver(employeeFormSchema),
  defaultValues: initialData
  ? {
      ...initialData,
      RoleId: initialData.Role ? initialData.Role._id : '',
      Dob: new Date(initialData.Dob), // Convert the Dob string to a Date object
    }
  :{
        FirstName: '',
        LastName: '',
        RoleId: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        Dob: new Date(),
        City: '',
        State: '',
        StreetAddress: '',
        Gender: '',
        IsActive: true,
      },
});

  const { control, handleSubmit, formState: { errors } } = form;
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const { loading } = useSelector((state: RootState) => state.auth); // Access loading from employee slice

  useEffect(() => {
    const fetchRoles = async () => {
    const roles=  await dispatch(getAllRoleName());
    setFetchedRoles(roles.payload.data)
    dispatch(setLoading(false)); 
    };
    fetchRoles();

  }, []);

  // const onSubmit= async (data:EmployeeFormValues) => {
  //   try {
  //     if (initialData) {
  //       dispatch(setLoading(true)); 
  //       // Update existing employee
  //       console.log(data)
  //       await dispatch(updateEmployee({ id: initialData._id, employeeData: data }));
  //       ToastAtTopRight.fire({
  //         icon: 'success',
  //         title: 'Employee updated!',
  //       });
  //       } else {
  //     // Create new employee
  //    dispatch(setLoading(true)); 
  //    const response= await dispatch(createEmployee(data));
  //    if(response.type==="employees/create/rejected")
  //     ToastAtTopRight.fire({
  //       icon: 'error',
  //       title: response?.payload.message,
  //     });
  //    else if(response.type==="employees/create/fulfilled"){
  //     ToastAtTopRight.fire({
  //       icon: 'success',
  //       title: response?.payload.message,
  //     });
  //    dispatch(setLoading(false));
  //    form.reset(); // Clear all fields in the form only on successful creation 
  //   }
  //   }
    
  // // Optionally show success message or redirect
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //     ToastAtTopRight.fire({
  //       icon: 'error',
  //       title:'Internal server error',
  //     });
  //   }
  //   finally{
  //     dispatch(setLoading(false));
  //   }
  // };


  const onSubmit: SubmitHandler<typeof employeeFormSchema._type> = async (data) => {
    try {
      dispatch(setLoading(true)); 
      // Log data to see what is being submitted
      console.log('Submitting data:', data);
      
      if ((isDisabled===false && initialData)) {
        // Update existing employee
        await dispatch(updateEmployee({ id: initialData._id, employeeData: data }));
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Employee updated!',
        });
      } else {
        // Create new employee
        const response = await dispatch(createEmployee(data));
        if (response.type === "employees/create/rejected") {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response?.payload.message,
          });
        } else if (response.type === "employees/create/fulfilled") {
          ToastAtTopRight.fire({
            icon: 'success',
            title: response?.payload.message,
          });
          form.reset(); // Clear all fields in the form only on successful creation 
        }
      }
    } catch (error) {
      console.error('Submission error:', error); // Log the error for debugging
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Internal server error',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  
  const renderErrorMessage = (error: any) => {
    console.log(error)
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return null;
  };



  const [newRole, setNewRole] = useState('');


  const addRole = async () => {
    if (newRole.trim()) { // Check if the new role name is not empty
      try {
        dispatch(setLoading(true)); // Start loading state
        const response = await dispatch(createRole({ roleName: newRole })); // Call the createRole action

        if (response.type === 'role/create/fulfilled') {
          // Handle successful role creation
          setFetchedRoles((prevRoles) => [
            ...prevRoles,
            { _id: response?.payload?.data?._id, roleName: newRole }, // Assuming the response contains the new role's ID
          ]);
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'New role created!',
          });
          setNewRole(''); // Clear the input field
        } else {
          // Handle error in case of rejection
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add role',
          });
        }
      } catch (error: any) {
        console.error('Error adding role:', error);
        ToastAtTopRight.fire({
          icon: 'error',
          title: error?.response?.data?.message || 'Failed to add role',
        });
      } finally {
        dispatch(setLoading(false)); // Stop loading state
      }
    }
  };
  
  const deleteRole = (roleId: string) => {
    setFetchedRoles(prevRoles => prevRoles.filter(role => role._id !== roleId));
  };

  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    form.setValue('Password', generatedPassword);
  };

  return (
    <>

<Dialog open={roleModalOpen} onOpenChange={setRoleModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Roles</DialogTitle>
      <DialogDescription>Add or remove roles.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      {/* Input for new role */}
      <div className="flex justify-between">
        <Input
          placeholder="New Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <Button className='ms-3' onClick={addRole}>Add</Button>
      </div>

      {/* List of existing roles */}
      <div className="space-y-2">
        {fetchedRoles?.map((role,index) => (
          <div key={role._id} style={{border:"1px solid grey"}} className="  flex px-2 py-1 items-center bg-green-300 rounded-md ">
            {index+1} ) <span className='ms-2' >{role.roleName}</span> {/* Access roleName instead of label */}
            {/* <Button variant="destructive" onClick={() => deleteRole(role._id)}>
              Delete
            </Button> */}
          </div>
        ))}
      </div>
    </div>
    <DialogFooter>
      {/* <Button onClick={() => setRoleModalOpen(false)}>Close</Button> */}
    </DialogFooter>
  </DialogContent>
</Dialog>

      <div className="container mx-auto p-4">
        <Heading title={isDisabled && initialData ? 'View Employee' :(isDisabled===false && initialData)? 'Edit Employee':"Create Employee"} description={isDisabled && initialData ? 'Details of Employee' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below"} />
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
              <FormField
                control={control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isDisabled||loading} placeholder="Enter First Name" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.FirstName)}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled||loading} type="text"  placeholder="Enter Last Name" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.LastName)}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={isDisabled||loading} placeholder="Enter Phone" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.PhoneNumber)}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" disabled={isDisabled||loading} placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.Email)}</FormMessage>
                  </FormItem>
                )}
              />
           {!initialData &&   <FormField
                control={control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex justify-between items-center">
                    <FormControl>
                      <div className="relative w-full me-3">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          disabled={loading}
                          placeholder="Enter Password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <Button type="button" className="bg-green-500 hover:bg-green-600" onClick={generatePassword}>
                     <KeyRound height={16} width={16} className='me-2 animate-bounce mt-1' />  Generate
                    </Button>
                                          
                    </div>
                    <FormMessage>{renderErrorMessage(errors.Password)}</FormMessage>
                   
                  </FormItem>
                )}
              />}
              <FormField
                control={control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.Gender)}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="StreetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isDisabled||loading} placeholder="Enter Street Address" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.Address)}</FormMessage>
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
                      <Input type="text" disabled={isDisabled||loading} placeholder="Enter City" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.City)}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="State"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isDisabled||loading}placeholder="Enter State" {...field} />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.State)}</FormMessage>
                  </FormItem>
                )}
              />
{/* <FormField
  control={control}
  name="RoleId"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-center">
        <FormLabel>Role</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setRoleModalOpen(true)} />
}      </div>
      <FormControl>
        <ReactSelect
          isSearchable
          options={fetchedRoles?.map(role => ({
            value: role._id,   // Use the _id as the value
            label: role.roleName // Use the roleName as the label
          }))}
          isDisabled={isDisabled||loading}
          onChange={(selected) => field.onChange(selected ? selected.value : '')}
          value={fetchedRoles?.map(role => ({
            value: role._id,
            label: role.roleName
          })).find(option => option.value === field.value)} // Map to find the correct role
        />
      </FormControl>
      <FormMessage>{renderErrorMessage(errors.Role)}</FormMessage>
    </FormItem>
  )}
/> */}

<FormField
  control={control}
  name="RoleId"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-center">

      <FormLabel>Role</FormLabel>
      {!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setRoleModalOpen(true)} />
}</div>
      <FormControl>
        <Controller
          name="RoleId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ReactSelect<Role>
              value={fetchedRoles.find(role => role._id === value) || null} // Setting value as Role type
              onChange={(selectedOption) => onChange(selectedOption ? selectedOption._id : '')}
              options={fetchedRoles} // Passing Role objects directly
              getOptionLabel={(role) => role.roleName} // How to display the option label
              getOptionValue={(role) => role._id} // The unique value for each option
              isDisabled={isDisabled || loading}
              placeholder="Select Role"
            />
          )}
        />
      </FormControl>
      <FormMessage>{renderErrorMessage(errors.RoleId)}</FormMessage>
    </FormItem>
  )}
/>


<FormField
  control={control}
  name="Dob"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date of Birth</FormLabel>
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
      <FormMessage>{renderErrorMessage(errors.Dob)}</FormMessage>
    </FormItem>
  )}
/>

{initialData && (
  <FormField
    control={control}
    name="IsActive"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Status</FormLabel>
        <FormControl>
          <Select
            disabled={isDisabled || loading}
            onValueChange={(value) => field.onChange(value === "true")} // Convert string to boolean
            value={field.value !== undefined ? (field.value ? "true" : "false") : (initialData.IsActive ? "true" : "false")} // Convert boolean to string
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage>{renderErrorMessage(errors.IsActive)}</FormMessage>
      </FormItem>
    )}
  />
)}
            </div>
          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Employee':"Create Employee"}     
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
          {initialData?.createdAt} 
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated At:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.updatedAt} 
        </p>
      </div>
    </div>
  )
}
      </div>
    </>
  );
};
