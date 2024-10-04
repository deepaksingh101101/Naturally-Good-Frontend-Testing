'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit, Trash, Trash2Icon, TrashIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReactSelect from 'react-select';

import { cn, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiCall from "@/lib/axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { createCustomerType, createSourceType, deleteCustomerTypeFromState, deleteSourceType, getAllCustomerType, getAllSourceType } from "@/app/redux/actions/dropdownActions";
import { ToastAtTopRight } from "@/lib/sweetAlert";
import { createUser, updateUser } from "@/app/redux/actions/userActions";

interface ProfileFormType {
  initialData: any | null;
  isDisabled?:boolean
}
export interface family {
  name: string;
  gender: string;
  dob: string;
  height: string;
  weight: string;
  allergies: string;
  contactNumber: number;
}

const FormSchema = z.object({
  FirstName: z.string().min(1, "First Name is required"),
  LastName: z.string().min(1, "Last Name is required"),
  Phone: z.string()
  .min(1, "Contact Number is required")
  .regex(/^[6-9]\d{9}$/, "Phone number must be a 10-digit number starting with 6, 7, 8, or 9"),

  Address: z.object(
    {
      HouseNumber: z.string().min(1, "House Number is required"),
      SocietyLocality: z.string().min(1, "Society/Locality is required"),
      Sector: z.string().min(1, "Sector is required"),
      City: z.string().min(1, "City is required"),
      State: z.string().min(1, "State is required"),
      ZipCode: z.string().min(1, "Zipcode is required"),
    }
  ),
  Email: z.string().email("Invalid email format").optional(),
  AlternateContactNumber: z.string()
  .min(1, "Contact Number is required")
  .regex(/^[6-9]\d{9}$/, "Phone number must be a 10-digit number starting with 6, 7, 8, or 9").optional(),

  Allergies: z.string().optional(),
  DOB: z.date().optional(),
  Weight: z.number().optional(),
  Height: z.number().optional(),
  Preferences: z.string().optional(),
  Gender: z.string().optional(),
  HowOftenYouCookedAtHome: z.string().optional(),
  WhatDoYouUsuallyCook: z.string().optional(),
  AlternateAddress: z.string().optional(),
  FamilyMembers:z
  .array(z.object(
    {
      Name: z.string().optional(),
      Height: z.number().optional(),
      Weight: z.number().optional(),
      Dob: z.string().optional(),
      Gender: z.string().optional(),
      Allergies: z.string().optional(),
    }
  )).optional(),
  ExtraNotes: z.string().optional(),
  AssignedEmployee: z.string().min(1, "Assigned Employee is required"),
  Source: z.string().min(1, "Source of customer is required"),
  CustomerType: z.string().min(1, "Type of Customer is required"),
});

export type UserFormValues = z.infer<typeof FormSchema>;


export const CreateProfileOne: React.FC<ProfileFormType> = ({
  initialData,
  isDisabled,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 
  const form = useForm<UserFormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues:initialData
    ? {
      ...initialData,
      Address: {
        ...initialData.Address,
        City:initialData.Address.City._id // Pre-fill city value
      },
      AssignedEmployee: 
       initialData.AssignedEmployee._id// Pre-fill city value
      ,
      Source:initialData?.Source._id,
      CustomerType:initialData?.CustomerType._id,
      Phone:initialData.Phone.toString(),
      AlternateContactNumber:initialData.AlternateContactNumber.toString(),
      DOB:new Date (initialData.DOB)


    }
    : {
          FirstName: undefined,
          LastName: undefined,
          Phone: undefined,
          Address: undefined,
          Email: undefined,
          AlternateContactNumber: undefined,
          Allergies: undefined,
          DOB: undefined,
          Weight: undefined,
          Height: undefined,
          Preferences: undefined,
          Gender: undefined,
          HowOftenYouCookedAtHome:undefined,
          WhatDoYouUsuallyCook:undefined,
          AlternateAddress:undefined,
          FamilyMembers:undefined,
          ExtraNotes:undefined,
          AssignedEmployee:undefined,
          Source:undefined,
          CustomerType:undefined,
        },
  });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = form;



  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        let user={...data,FamilyMembers:familyMembers,Phone:undefined,Email:undefined}
        let response=await dispatch(updateUser({ id: initialData._id, userData: user }));
        if (response.type === "user/update/rejected") {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response?.payload.message,
          });
        } else if (response.type === "user/update/fulfilled") {
          ToastAtTopRight.fire({
            icon: 'success',
            title: response?.payload.message,
          });
          form.reset({
            FirstName: "",
            LastName: "",
            Phone: "",
            Address: {
              HouseNumber: "",
              SocietyLocality: "",
              Sector: "",
              City: "",
              State: "",
              ZipCode: "",
            },
            Email: "",
            AlternateContactNumber: "",
            Allergies: "",
            DOB: undefined,
            Weight: undefined,
            Height: undefined,
            Preferences: "",
            Gender: "",
            HowOftenYouCookedAtHome: "",
            WhatDoYouUsuallyCook: "",
            AlternateAddress: "",
            FamilyMembers: [], // Reset array to an empty array
            ExtraNotes: "",
            AssignedEmployee: "",
            Source: "",
            CustomerType: "",
          });
          setFamilyMembers([])
          router.push(`/user-management`);

           // Clear all fields in the form only on successful creation 
        }
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        let user={...data,FamilyMembers:familyMembers}
          let response=await dispatch(createUser(user));
          if (response.type === "user/create/rejected") {
            ToastAtTopRight.fire({
              icon: 'error',
              title: response?.payload.message,
            });
          } else if (response.type === "user/create/fulfilled") {
            ToastAtTopRight.fire({
              icon: 'success',
              title: response?.payload.message,
            });
            form.reset({
              FirstName: "",
              LastName: "",
              Phone: "",
              Address: {
                HouseNumber: "",
                SocietyLocality: "",
                Sector: "",
                City: "",
                State: "",
                ZipCode: "",
              },
              Email: "",
              AlternateContactNumber: "",
              Allergies: "",
              DOB: undefined,
              Weight: undefined,
              Height: undefined,
              Preferences: "",
              Gender: "",
              HowOftenYouCookedAtHome: "",
              WhatDoYouUsuallyCook: "",
              AlternateAddress: "",
              FamilyMembers: [], // Reset array to an empty array
              ExtraNotes: "",
              AssignedEmployee: "",
              Source: "",
              CustomerType: "",
            });
            setFamilyMembers([])
            router.push(`/user-management`);

             // Clear all fields in the form only on successful creation 
          }
      }
      // router.refresh();
      // router.push(`/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };





  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [newSource, setNewSource] = useState('');

  const [customerTypeModalOpen, setCustomerTypeModalOpen] = useState(false);
  const [newCustomerType, setNewCustomerType] = useState('');


  const [familyMembers, setFamilyMembers] = useState<any[]>(initialData?.FamilyMembers || []);

  const handleAddMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { 
        Name: "", 
        Gender: "", 
        Dob: null, 
        Height: "", 
        Weight: "", 
        Allergies: "" 
      }
    ]);
  };

  const handleRemoveMember = (index: number) => {
    const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleMemberChange = (index: number, field: string, value: any) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index][field] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const openSourceModal = () => {
    setIsSourceModalOpen(true);
  };

  const closeSourceModal = () => {
    setIsSourceModalOpen(false);
  };
  const openCustomerTypeModal = () => {
    setCustomerTypeModalOpen(true);
  };

  const closeCustomerTypeModal = () => {
    setCustomerTypeModalOpen(false);
  };


  const addSource =async () => {
    if (newSource.trim()) { // Ensure sort order is non-negative
      try {
          const response = await dispatch(createSourceType({ Name: newSource})); // Include SortOrder

          if (response.type === 'sourceType/create/fulfilled') {
              const newSourceType:any = {
                  _id: response.payload.data._id, // Ensure this is a string
                  Name: newSource
              };
              setFetchedSourceType((prev: any[]) => [...prev, newSourceType]); // Ensure prev is of the correct type
              ToastAtTopRight.fire({
                  icon: 'success',
                  title: 'New source type created!',
              });
              setNewSource(''); // Clear the input field
          } else {
              ToastAtTopRight.fire({
                  icon: 'error',
                  title: response.payload.message || 'Failed to add product type',
              });
          }
      } catch (error) {
          console.error('Error adding product type:', error);
      } finally {
      }
  }
  };



  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedCity, setFetchedCity] = useState<{ id: string; name: string }[]>([]);

  const fetchCity = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        // setFetchedCity([]);
        return;
      }

      try {
        const response = await apiCall('GET', `/route/city/filter?CityName=${term}`);
        if (response.status) {
          console.log()
          setFetchedCity(response.data.cities.map((city: any) => ({ name: city.CityName, id: city._id })))
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchCity(searchTerm);
  }, [searchTerm, fetchCity]);

  // Source of customer
  const [fetchedSourceType, setFetchedSourceType] = useState<any[]>([]); // Specify the type here

  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  useEffect(() => {
    const fetchSourceType = async () => {
    const sourceTypes=  await dispatch(getAllSourceType());
    setFetchedSourceType(sourceTypes.payload.data)
    };
    fetchSourceType();
  }, []);
 
  const [deleteSourceTypeModalOpen, setDeleteSourceTypeModalOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState<string | null>(null);

  const confirmDeleteSourceType = async () => {
    if (sourceToDelete) {
      await deleteSourceTypeTemp(sourceToDelete);
      setDeleteSourceTypeModalOpen(false); // Close the modal
    }
  };

  const  deleteSourceTypeTemp = async (sourceToDelete: string) => {
    if (sourceToDelete) {
      const response=  await dispatch(deleteSourceType(sourceToDelete)); // Dispatch the delete action
      if (response.type === 'sourceType/delete/fulfilled') {
        setFetchedSourceType((prev) => prev.filter(type => type._id !== sourceToDelete));
         ToastAtTopRight.fire({
            icon: 'success',
            title: 'Source type deleted!',
        });
        setNewSource(''); // Clear the input field
    } else {
        ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete source type',
        });
    }
    }
  };


  // Type of customer
  const [fetchedCustomerType, setFetchedCustomerType] = useState<any[]>([]); // Specify the type here

  useEffect(() => {
    const fetchCustomerType = async () => {
    const customerTypes=  await dispatch(getAllCustomerType());
    setFetchedCustomerType(customerTypes.payload.data)
    };
    fetchCustomerType();
  }, []);
 
  const [deleteCustomerTypeModalOpen, setDeleteCustomerTypeModalOpen] = useState(false);
  const [customerTypeToDelete, setCustomerTypeToDelete] = useState<string | null>(null);

  const confirmDeleteCustomerType = async () => {
    if (customerTypeToDelete) {
      await deleteCustomerTypeTemp(customerTypeToDelete);
      setDeleteCustomerTypeModalOpen(false); // Close the modal
    }
  };

  const  deleteCustomerTypeTemp = async (customerTypeToDelete: string) => {
    if (customerTypeToDelete) {
      const response=  await dispatch(deleteCustomerTypeFromState(customerTypeToDelete)); // Dispatch the delete action
      if (response.type === 'customerType/delete/fulfilled') {
        setFetchedCustomerType((prev) => prev.filter(type => type._id !== customerTypeToDelete));
         ToastAtTopRight.fire({
            icon: 'success',
            title: 'Customer type deleted!',
        });
        setNewCustomerType(''); // Clear the input field
    } else {
        ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete customer type',
        });
    }
    }
  };

  const addCustomerType =async () => {
    if (newCustomerType.trim()) { // Ensure sort order is non-negative
      try {
          const response = await dispatch(createCustomerType({ Name: newCustomerType})); // Include SortOrder
          if (response.type === 'customerType/create/fulfilled') {
              const newType:any = {
                  _id: response.payload.data._id, // Ensure this is a string
                  Name: newCustomerType
              };
              setFetchedCustomerType((prev: any[]) => [...prev, newType]); // Ensure prev is of the correct type
              ToastAtTopRight.fire({
                  icon: 'success',
                  title: 'New customer type created!',
              });
              setNewCustomerType(''); // Clear the input field
          } else {
              ToastAtTopRight.fire({
                  icon: 'error',
                  title: response.payload.message || 'Failed to add customer type',
              });
          }
      } catch (error) {
          console.error('Error adding product type:', error);
      } finally {
      }
  }
  };


  const [searchEmployeeTerm, setSearchEmployeeTerm] = useState('');
  const [fetchedEmployee, setFetchedEmployee] = useState<{ id: string; name: string,phone:string }[]>([]);

  const fetchEmployee = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        // setFetchedEmployee([]);
        return;
      }

      try {
        const response = await apiCall('GET', `/admin/employee/filter?term=${term}`);
        if (response.status) {
          console.log()
          setFetchedEmployee(response.data.employees.map((employee: any) => ({ name: employee.FirstName + employee.LastName, id: employee._id,phone:employee.PhoneNumber })))
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchEmployee(searchEmployeeTerm);
  }, [searchEmployeeTerm, fetchEmployee]);


  return (
    <>
      <div className="flex items-center justify-between">
      <Heading title={isDisabled && initialData ? 'View User' :(isDisabled===false && initialData)? 'Edit User':"Create User"} description={isDisabled && initialData ? 'Details of User' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below"} />
     
      </div>
      <Separator />
      <Dialog open={deleteSourceTypeModalOpen} onOpenChange={setDeleteSourceTypeModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this source type? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteSourceType} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteSourceTypeModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Dialog open={deleteCustomerTypeModalOpen} onOpenChange={setDeleteCustomerTypeModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this source type? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteCustomerType} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteCustomerTypeModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      <Dialog open={isSourceModalOpen} onOpenChange={(open) => !open && closeSourceModal()}>
        <DialogContent className="max-w-lg" >
          <DialogHeader>
            <DialogTitle>Manage Sources</DialogTitle>
            <DialogDescription>You can manage customer source.</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Source
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {fetchedSourceType?.map((source, sourceIndex) => (
                  <tr key={sourceIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {source.Name}
                    </td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash 
                       onClick={() => {
                        if (source._id) { // Ensure _id is defined
                          setSourceToDelete(source._id); // Set the type ID to delete
                          setDeleteSourceTypeModalOpen(true); // Open the confirmation modal
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
                type="text"
                placeholder="Add new source"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
              />
              <Button onClick={addSource} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal for customer type */}


      <Dialog open={customerTypeModalOpen} onOpenChange={(open) => !open && closeCustomerTypeModal()}>
        <DialogContent className="max-w-lg" >
          <DialogHeader>
            <DialogTitle>Manage Customer Type</DialogTitle>
            <DialogDescription>You can manage customer Type.</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Customer Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {fetchedCustomerType?.map((type, typeIndex) => (
                  <tr key={typeIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {type.Name}
                    </td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash
                       onClick={() => {
                        if (type._id) { // Ensure _id is defined
                          setCustomerTypeToDelete(type._id); // Set the type ID to delete
                          setDeleteCustomerTypeModalOpen(true); // Open the confirmation modal
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
                type="text"
                placeholder="Add new Customer type"
                value={newCustomerType}
                onChange={(e) => setNewCustomerType(e.target.value)}
              />
              <Button onClick={addCustomerType} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled||loading} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage>{errors.FirstName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled||loading} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage>{errors.LastName?.message}</FormMessage>
                </FormItem>
              )}
            />
         {!(initialData && (isDisabled===false)) &&   <FormField
              control={form.control}
              name="Phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                  <Input
          type="text"
          placeholder="Enter your contact number"
          disabled={isDisabled || loading}
          value={String(field.value || '')} // Convert to string
          onChange={(e) => field.onChange(String(e.target.value))} // Convert input to string
        />
                  </FormControl>
                  <FormMessage>{errors.Phone?.message}</FormMessage>
                </FormItem>
              )}
            />}
          
        
            <FormField
              control={form.control}
              name="Address.HouseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House and Floor Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter House/Floor Number"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.HouseNumber?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address.SocietyLocality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Society/Locality</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter Society/Locality"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.SocietyLocality?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address.Sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter Sector"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.Sector?.message}</FormMessage> */}
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="Address.ZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter Zipcode"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.zipcode?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address.City"
              render={({ field }) => (
                <FormItem>
                  <div className="flex mt-2">
                    <FormLabel>City</FormLabel>
                  </div>
                  <Controller
                    control={control}
                    name="Address.City"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedCity}
                        onInputChange={(inputValue) => setSearchTerm(inputValue)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={isDisabled||loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={fetchedCity.find(option => option.id === field.value)||{id:initialData?.Address?.City._id,name:initialData?.Address?.City?.CityName}}

                      />
                    )}
                  />
                  {/* <FormMessage>{errors.city?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="Address.State"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                       disabled={isDisabled||loading} 
                      placeholder="Enter State"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.state?.message}</FormMessage> */}
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="AssignedEmployee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Employee</FormLabel>
                  <Controller
                    control={control}
                    name="AssignedEmployee"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedEmployee}
                        onInputChange={(inputValue) => setSearchEmployeeTerm(inputValue)}
                        getOptionLabel={(option) => option.name} // Only display the employee name
                        getOptionValue={(option) => option.id}
                        isDisabled={isDisabled||loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={fetchedEmployee.find(option => option.id === field.value)||{id:initialData?.AssignedEmployee?._id,name:initialData?.AssignedEmployee?.FirstName+initialData?.AssignedEmployee?.LastName,phone:initialData?.AssignedEmployee?.Phone}}
                      />
                    )}
                  />
                  <FormMessage>{errors.AssignedEmployee?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Source"
              render={({ field }) => (
                <FormItem>
                  <div className="flex mt-2">
                    <FormLabel>Source of Customer</FormLabel>
                    <Edit onClick={openSourceModal} className="ms-3 cursor-pointer text-red-500" height={15} width={15} />
                  </div>
                  <Controller
                    control={control}
                    name="Source"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedSourceType}
                        getOptionLabel={(option) => option.Name}
                        getOptionValue={(option) => option._id}
                        isDisabled={isDisabled||loading}
                        onChange={(selected) => field.onChange(selected ? selected._id : '')}
                        value={fetchedSourceType?.find(option => option._id === field.value)}
                      />
                    )}
                  />
                  <FormMessage>{errors.Source?.message}</FormMessage>
                </FormItem>
              )}
            />
           
          
           <FormField
              control={form.control}
              name="CustomerType"
              render={({ field }) => (
                <FormItem>
                  <div className="flex mt-2">
                    <FormLabel>Customer Type</FormLabel>
                    <Edit onClick={openCustomerTypeModal} className="ms-3 cursor-pointer text-red-500" height={15} width={15} />
                  </div>
                  <Controller
                    control={control}
                    name="CustomerType"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={fetchedCustomerType}
                        getOptionLabel={(option) => option.Name}
                        getOptionValue={(option) => option._id}
                        isDisabled={isDisabled||loading}
                        onChange={(selected) => field.onChange(selected ? selected._id : '')}
                        value={fetchedCustomerType?.find(option => option._id === field.value)}
                      />
                    )}
                  />
                  <FormMessage>{errors.CustomerType?.message}</FormMessage>
                </FormItem>
              )}
            />



          </div>
          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">
        {!(initialData && (isDisabled===false)) &&   <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                       disabled={isDisabled||loading} 
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.Email?.message}</FormMessage>
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="AlternateContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your contact number"
                      disabled={isDisabled||loading} 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.AlternateContactNumber?.message}</FormMessage>
                </FormItem>
              )}
            />
           
              <FormField
              control={form.control}
              name="AlternateAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Address</FormLabel>
                  <FormControl>
                    <Input
                       disabled={isDisabled||loading} 
                      placeholder="Enter House number, Floor number, locality Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.AlternateAddress?.message}</FormMessage>
                </FormItem>
              )}
            />
           <FormField
  control={control}
  name="DOB"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date of Birth</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
            disabled={isDisabled||loading}
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? format(new Date(field.value), "dd MMM yyyy") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            onSelect={field.onChange}
            disabled={(date) =>
              isDisabled || date > new Date(new Date().setHours(0, 0, 0, 0))
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage>{errors.DOB?.message}</FormMessage>
    </FormItem>
  )}
/>

            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select  disabled={isDisabled||loading}  onValueChange={field.onChange} value={field.value}>
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
                  <FormMessage>{errors.Gender?.message}</FormMessage>
                </FormItem>
              )}
            />
               <FormField
  control={form.control}
  name="Height"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Height</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Enter height"
          disabled={isDisabled||loading} 
          {...field}
          onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          value={field.value || ''}
        />
      </FormControl>
      <FormMessage>{errors.Height?.message}</FormMessage>
    </FormItem>
  )}
/>
     <FormField
  control={form.control}
  name="Weight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Weight</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Enter weight"
          disabled={isDisabled||loading} 
          {...field}
          onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          value={field.value || ''}
        />
      </FormControl>
      <FormMessage>{errors.Weight?.message}</FormMessage>
    </FormItem>
  )}
/>


           
           
    

<FormField
  control={form.control}
  name="Preferences"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Preferences</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter preferences"
          disabled={isDisabled||loading} 
          {...field}
        />
      </FormControl>
      <FormMessage>{errors.Preferences?.message}</FormMessage>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="Allergies"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Allergies</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter allergies"
          disabled={isDisabled||loading} 
          {...field}
        />
      </FormControl>
      <FormMessage>{errors.Allergies?.message}</FormMessage>
    </FormItem>
  )}
/>
<FormField
              control={form.control}
              name="HowOftenYouCookedAtHome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you cook at home? </FormLabel>
                  <FormControl>
                    <Select  disabled={isDisabled||loading}  onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select here" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-3">2-3 Times</SelectItem>
                        <SelectItem value="3-5">3-5 Times</SelectItem>
                        <SelectItem value="more than 5">More than 5 Times</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.HowOftenYouCookedAtHome?.message}</FormMessage>
                </FormItem>
              )}
            />

<FormField
  control={form.control}
  name="WhatDoYouUsuallyCook"
  render={({ field }) => (
    <FormItem>
      <FormLabel>What do you usually cook?</FormLabel>
      <FormControl>
        <Input
          placeholder="Select here"
          disabled={isDisabled||loading} 
          {...field}
        />
      </FormControl>
      <FormMessage>{errors.WhatDoYouUsuallyCook?.message}</FormMessage>
    </FormItem>
  )}
/>

<div className="mt-4 flex justify-between">
                  <Button
                    type="button"
                    onClick={handleAddMember}
                    disabled={isDisabled||loading} 
                    className="mt-2"
                  >
                    Add Family Member
                  </Button>
                </div>

          

          </div>

                {/* Family Members Table */}
                <div className="mt-8">
                  {familyMembers?.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                            Name
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs   
 font-medium text-gray-500 uppercase tracking-wider">
                            Height
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                           Weight
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                          DOB
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                       Gender
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">   

                         Allergies
                          </th>
                          {/* Add more header cells for Height, Weight, Allergies */}
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y   
                          divide-gray-200">
                       {familyMembers.map((member, index) => (
  <tr key={index}>
    {/* Name */}
    <td className="py-2 whitespace-nowrap text-sm text-gray-500">
      <Input
        type="text"
        disabled={isDisabled || loading}
        placeholder="Enter name"
        value={member.Name || ""}
        onChange={(e) => handleMemberChange(index, "Name", e.target.value)}
      />
    </td>
    
    {/* Height */}
    <td className="px-2 py-2 whitespace-nowrap text-sm max-w-7 text-gray-500">
      <Input
        type="number"
        disabled={isDisabled || loading}
        placeholder="Height"
        value={member.Height || ""}
        onChange={(e) => handleMemberChange(index, "Height", e.target.value === "" ? undefined : Number(e.target.value))}
      />
    </td>
    
    {/* Weight */}
    <td className="px-2 py-2 whitespace-nowrap text-sm max-w-7 text-gray-500">
      <Input
        type="number"
        disabled={isDisabled || loading}
        placeholder="Weight"
        value={member.Weight || ""}
        onChange={(e) => handleMemberChange(index, "Weight", e.target.value === "" ? undefined : Number(e.target.value))}
      />
    </td>
    
    {/* Date of Birth */}
    <td className="px-2 min-w-40 py-2 whitespace-nowrap text-sm max-w-7 text-gray-500">
      <Input
        type="date"
        disabled={isDisabled || loading}
        required={false}
        placeholder="Date of Birth"
        value={member.Dob ? new Date(member.Dob).toISOString().split("T")[0] : ""}
        onChange={(e) => handleMemberChange(index, "Dob", e.target.value)}
      />
    </td>
    
    {/* Gender */}
    <td className="px-2 py-2 whitespace-nowrap text-sm min-w-32 text-gray-500">
      <Select
        disabled={isDisabled || loading}
        onValueChange={(value) => handleMemberChange(index, "Gender", value)}
        value={member.Gender || ""}
      >
        <SelectTrigger className="mt-5">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
    </td>
    
    {/* Allergies */}
    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
      <Input
        type="text"
        disabled={isDisabled || loading}
        placeholder="Enter any allergies"
        value={member.Allergies || ""}
        onChange={(e) => handleMemberChange(index, "Allergies", e.target.value)}
      />
    </td>
    
    {/* Remove Member */}
    <td className="pe-3 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        type="button"
        onClick={() => handleRemoveMember(index)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2Icon className="h-6 w-6" />
      </button>
    </td>
  </tr>
))}

                      </tbody>
                    </table>
                  )}
                </div>
          <FormField
  control={form.control}
  name="ExtraNotes"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Extra Notes</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter any extra notes"
          disabled={isDisabled||loading} 
          {...field}
        />
      </FormControl>
      <FormMessage>{errors.ExtraNotes?.message}</FormMessage>
    </FormItem>
  )}
/>
          <div className="mt-8 pt-5">
            <div className="flex justify-end">
            {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save User':"Create User"}     
            </Button>}
            </div>
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
