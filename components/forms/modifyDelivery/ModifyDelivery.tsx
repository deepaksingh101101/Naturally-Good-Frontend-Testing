'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getOrderDetailsInDelivery, updateDeliveryDetails } from '@/app/redux/actions/DeliveryActions';
import Select from 'react-select';
import apiCall from '@/lib/axios';
import { debounce } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Edit, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { createDeliveryTimeSlot, getAllDeliveryTimeSlots } from '@/app/redux/actions/dropdownActions';
import { ToastAtTopRight } from '@/lib/sweetAlert';

export const ModifyDelivery: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const DeliveryId = searchParams.get('DeliveryId');
  const dispatch = useDispatch<AppDispatch>();
  const { Details, loading, error } = useSelector((state: RootState) => state.deliverys);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (DeliveryId) {
        const resultAction = await dispatch(getOrderDetailsInDelivery({ DeliveryId }));
        
        if (getOrderDetailsInDelivery.fulfilled.match(resultAction)) {
          // Assuming `resultAction.payload.data.delivery` contains your delivery data
          const orderDetails = resultAction.payload.data.delivery;

          // Extract products from the addOns list
          const addons = orderDetails; // Adjust this line based on where the addOns are located in your result

          console.log('Order Details:', addons)
           const formattedAddons = addons?.Addons.map((addon:any) => ({
      itemName: {
        value: addon?.ProductId?._id, // Product ID
        label: addon?.ProductId?.ProductName, // Product Name
      },
      requiredUnits: addon?.RequiredUnits, // Required units from addon
      unitQuantity: addon?.ProductId?.UnitQuantity, // Unit Quantity from Product
      price: addon?.ProductId?.Price, // Price from Product
    }));

    console.log(addons)
    // Set the value for 'addOns' in the form using the formatted array
    setValue('addOns', formattedAddons);
    setValue('Description', addons?.Note);
    setValue('deliveryTimeSlot', addons.DeliveryTime._id); // Set the value to the _id of the DeliveryTime

    console.log(selectedCity)

    console.log(addons.UserId.Address.City.CityName)
    setValue('City', {
      value: addons.UserId.Address.City._id, 
      label: addons.UserId.Address.City.CityName
    });


          const productList = addons?.Addons?.map((addon:any) => addon?.ProductId);

          // Logging to verify the transformation
          
          // Set the productList state
          setProductList(productList);
          // console.log(newProductList)
        }
      }
    };

    fetchOrderDetails();
  }, [DeliveryId, dispatch]);

  const [darkMode, setDarkMode] = useState(false);



  
  const methods = useForm<any>({
    defaultValues: {
      bagItems: Details?.delivery?.Product?.map((item: any) => ({
        requiredUnits: item?.RequiredUnits || '', // Placeholder for user input
        Item: item.ProductId._id, // Product ID
      })) || Details?.delivery?.Bag?.BagID?.AllowedItems?.map((item: any) => ({
        requiredUnits: '', // Placeholder for user input
        Item: item._id, // Product ID
      })) || [], // Ensure it's initialized as an empty array if no items are available
      // addOns: Details?.delivery?.Addons?.map((addon: any) => ({
      //   itemName: {
      //     value: addon?.ProductId._id, // Product ID
      //     label: addon?.ProductId.ProductName, // Product Name
      //   },
      //   requiredUnits: addon?.RequiredUnits, // Required Units
      //   UnitQuantity: addon?.ProductId?.UnitQuantity, // Required Units
      //   Price: addon?.ProductId?.Price, // Required Units
      // })), // Set default add-ons from transformed data

      // addOns: [
      //   { itemName: { value: 'defaultProduct1', label: 'Product 1' },
      //    requiredUnits: 5 },
      //   { itemName: { value: 'defaultProduct2', label: 'Product 2' }, requiredUnits: 3 },
      // ],
      City: Details?.delivery?.UserId?.Address?.City?.CityName || '', // Set default city
      Route: Details?.delivery?.AssignedRoute?.RouteName || '', // Set default route
      deliveryTimeSlot: Details?.delivery?.DeliveryTime?._id || '', // Set default delivery time slot
      Description: Details?.delivery?.Note || '', // Set default description
      netPrice: 0, // Set initial net price
    },
  });
  

  

  const { control, handleSubmit, setValue, formState: { errors }, watch } = methods;
  const { fields, remove } = useFieldArray({
    control,
    name: 'bagItems',
  });

  
  const handleSaveChanges = async(data: any) => {
    const updateData = {
      DeliveryTime: data.deliveryTimeSlot,
      AssignedRoute: data.Route,
      Bag: {
          BagWeight: 4000, // Calculate bag weight
      },
      Product: data.bagItems.map((item: any) => ({
          RequiredUnits: item.requiredUnits,
          ProductId: item.Item, // Use the Item as ProductId
          Weight: 200, // Get product weight (mock function)
      })),
      // Addons:data?.Addons,
      Note: data.Description || '', // Map description
      Addons : data.addOns?.map((addon: any) => ({
          ProductId: addon?.itemName?.value, // Save the item's value
          RequiredUnits: addon?.requiredUnits,
          Price: 300, // Get addon price (mock function)
          Weight: 150, // Get addon weight (mock function)
      })),
  };

  try {
    const response = await dispatch(updateDeliveryDetails({DeliveryId,updateData}));
    if (response.type === 'delivery/updateDetails/fulfilled') {
      ToastAtTopRight.fire({
        icon: 'success',
        title: "Delivery Updated", // 'Item created.'
      });
      // router.push('/delivery')

    } else {
      ToastAtTopRight.fire({
        icon: 'error',
        title:'Failed to Update Delivery',
      });
    }

  } catch (error) {
    console.error('Submit Error:', error);
    ToastAtTopRight.fire({
      icon: 'error',
      title: 'An error occurred while submitting the form',
    });
  }

  

  // Log the transformed data



};
  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const handleComplainView = () => {
    router.push(`/complaint-management/23`);
  };
  
  const [bagItems, setBagItems] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [rowSearchTerms, setRowSearchTerms] = useState<string[]>(Array(bagItems.length).fill(''));

  const getProduct = async (query: string) => {
    try {
      const response = await apiCall('get', `/product/filter?ProductName=${query}`);
      setProductList(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Debouncing logic
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (inputValue: string, index: number) => {
    if(inputValue===""){
      return;
    }
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

  const { fields: addOnFields, append: appendAddOn, remove: removeAddOn } = useFieldArray({
    control,
    name: 'addOns',
  });

  
  const handleAddNewAddOn = () => {
    appendAddOn({
      itemName: {
        value: '',
        label: '',
      },
      requiredUnits: '',
    });
  };
  

  // console.log(Details.delivery)
  // console.log(Details.delivery?.Addons)

  const [fetchedCity, setFetchedCity] = useState<{ label: string; value: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchCity = useCallback(
    debounce(async (term: string) => {
      if (!term) {
        return;
      }

      try {
        const response = await apiCall('GET', `/route/city/filter?CityName=${term}`);
        if (response.status) {
          const cities = response.data.cities.map((city: any) => ({
            label: city.CityName,
            value: city._id,
          }));
          setFetchedCity(cities);
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

 
  const calculateTotals = () => {
    const currentAddOns = methods.getValues('addOns'); // Ensure 'getValues' is available
  
    const { totalPrice, totalWeight } = currentAddOns?.reduce(
      (totals: any, addOn: any) => {
        const itemPrice = parseFloat(addOn?.itemPrice) || 0;
        const requiredUnits = parseInt(addOn?.requiredUnits, 10) || 0;
        const unitQuantity = parseFloat(addOn?.unitQuantity) || 0;
  
        // Calculate total price and total weight
        totals.totalPrice += itemPrice * requiredUnits;
        totals.totalWeight += unitQuantity * requiredUnits;
  
        return totals;
      },
      { totalPrice: 0, totalWeight: 0 } // Initial values
    );
  
    console.log("Total Price:", totalPrice); // Log the total price
    console.log("Total Weight:", totalWeight); // Log the total weight
  };
  
  const [fetchedRoute, setFetchedRoute] = useState<{ label: string; value: string }[]>([]);
  const [searchRouteTerm, setSearchRouteTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<{ label: string; value: string } | null>(null);
  const selectedWatchCity=watch('City')

  const fetchRoute = useCallback(
    debounce(async (term: string) => {
      if (!term || !selectedWatchCity) {
        return;
      }
  
      try {
        const response = await apiCall('GET', `/route/route/search?CityId=${selectedWatchCity}&RouteName=${term}`);
        if (response.status) {
          const routes = response.data.routes.map((route: any) => ({
            label: route.RouteName,
            value: route._id,
          }));
          setFetchedRoute(routes);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    }, 500),
    [selectedWatchCity] // Add selectedWatchCity as a dependency
  );
  

  useEffect(() => {
    fetchRoute(searchRouteTerm);
  }, [searchRouteTerm, fetchRoute]);

    // Fetch rosters in useEffect
useEffect(() => {
  const fetchTimeSlot = async () => {
    const times = await dispatch(getAllDeliveryTimeSlots());
    setFetchedTime(times.payload.data);
  };
  fetchTimeSlot();
}, []);



  const [fetchedTime, setFetchedTime] = useState<any[]>([]);
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const addTimeSlot=async()=>{
    if(startTime==="" ||endTime===""){
    return;
    }
    const timeSlotData = {
      Start: startTime,
      End: endTime,
    };

      try {
        const response = await dispatch(createDeliveryTimeSlot({ Start:startTime,End:endTime }));
        if (response.type === 'deliveryTime/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Time Slot added!',
          });
          setStartTime(''); // Clear the input field
          setEndTime(''); // Clear the input field
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add time slot',
          });
        }
      } catch (error) {
        console.error('Error adding new time slot:', error);
      } 

  }
  const deleteTimeSlot=(index:any)=>{

  }




  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-start justify-between">
        <Heading title="Order Details" description="View Order Details" />
      </div>
      <Separator />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mt-4 shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Customer Name:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.delivery?.UserId?.FirstName} {Details?.delivery.UserId?.LastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.delivery.UserId?.Phone}{' '}
              {Details?.delivery.UserId?.AlternateContactNumber
                ? 'Or ' + Details?.delivery.UserId?.AlternateContactNumber
                : ''}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Delivery:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.order?.SubscriptionId?.TotalDeliveryNumber}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Delivery Number:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">{1}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subscription Type:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.order?.SubscriptionId?.SubscriptionTypeId?.Name}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Frequency Type:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.order?.SubscriptionId?.FrequencyId?.Name}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bag:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.delivery?.Bag?.BagID?.BagName}{' '}
              <span className="text-red-600 text-[10px]">{`(${Details?.delivery?.Bag?.BagID?.BagMaxWeight})`}</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Delivery Status:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {Details?.delivery?.Status}
            </p>
          </div>
          {Details?.delivery?.SpecialInstruction && (
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Special Instruction:</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                {Details?.delivery?.SpecialInstruction}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Complained In Last Delivery</p>
            <p className="text-lg flex items-center font-semibold text-red-600 animate-bounce mt-2 dark:text-red-600">
              <span>Delayed</span>
            </p>
          </div>
          <div>
            <Button onClick={handleComplainView}>View Complaints</Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <Heading title="Bag 1" description="" />
      <Form {...methods}>
      <form onSubmit={handleSubmit(handleSaveChanges)}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-300 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Item Price (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Unit Quantity (g)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Minimum Units</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Maximum Units</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Required Units</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Details?.delivery?.Bag?.BagID?.AllowedItems?.map((item: any, index: any) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ProductName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.Price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.UnitQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.MinimumUnits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.MaximumUnits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Controller
                    name={`bagItems[${index}].requiredUnits`}
                    control={control}
                    defaultValue={item.MinimumUnits}
                    render={({ field }) => (
                      <Input type="number" min={item.MinimumUnits} max={item.MaximumUnits} {...field} />
                    )}
                  />
                  <Controller
  name={`bagItems[${index}].Item`}
  control={control}
  defaultValue={item._id}
  render={({ field }) => (
    <Input type="number" style={{ display: 'none' }} {...field} />
  )}
/>

                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <Separator className="my-4" />

        <Heading title="Add-ons" description="" />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-300 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Add-on Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Price (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Unit Quantity (g)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Required Units</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {addOnFields?.map((addon:any, index:any) => (
  <tr key={addon?._id}>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Controller
        name={`addOns[${index}].itemName`}
        control={control}
        // defaultValue={{
        //   value: addon?.ProductId?._id, // Set default value to the addon ProductId
        //   label: addon?.ProductId?.ProductName // Set default label to the addon ProductName
        // }}
        render={({ field }) => (
          <Select
            {...field}
            options={productList.map((product) => ({
              value: product._id,
              label: product.ProductName,
            }))}
            onInputChange={(inputValue) => handleInputChange(inputValue, index)}
            onChange={(selectedOption) => {
              const selectedProduct = productList.find(product => product._id === selectedOption.value);
              // Update other fields automatically based on the selected product
              setValue(`addOns[${index}].itemPrice`, selectedProduct ? selectedProduct.Price : 0);
              setValue(`addOns[${index}].unitQuantity`, selectedProduct ? selectedProduct.UnitQuantity : 0);
              setValue(`addOns[${index}].requiredUnits`, selectedProduct ? selectedProduct.MinimumUnits : 0); // Default initial value for requiredUnits
              field.onChange(selectedOption); // This will update the itemName value
              calculateTotals();
            }}
            placeholder="Search Add-ons"
          />
        )}
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Controller
        name={`addOns[${index}].itemPrice`}
        control={control}
        disabled={true}
        defaultValue={addon?.price} // Set initial value based on the addon
        render={({ field }) => <Input type="number" {...field} />}
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Controller
        name={`addOns[${index}].unitQuantity`}
        control={control}
        disabled
        defaultValue={addon?.unitQuantity} // Set initial value based on the addon
        render={({ field }) => <Input type="number" {...field} />}
      />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Controller
        name={`addOns[${index}].requiredUnits`}
        control={control}
        defaultValue={addon?.RequiredUnits} // Set initial value based on the addon
        render={({ field }) => <Input type="number" {...field} />}
      />
    </td>
    <td>
      <Button type='button' className='bg-transparent text-red-500 shadow-none border-0 hover:bg-white hover:text-red-500 hover:scale-105' onClick={() => removeAddOn(index)}>Remove</Button>
    </td>
  </tr>
))}


          </tbody>
        </table>

       <div className="flex justify-between">
       <Button type='button' className='mt-4'    onClick={() => handleAddNewAddOn()}>Add New Add-on</Button>

       </div>

       <Heading title="Assign Routes" description="Assign routes to this order" />
      <div className="grid grid-cols-2 gap-4">
      <FormField
              control={control}
              name="City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      isDisabled={loading}
                      options={fetchedCity}
                      placeholder="Select City"
                      value={selectedCity?selectedCity:{value: Details?.delivery?.UserId?.Address?.City?._id, label: Details?.delivery?.UserId?.Address?.City?.CityName}}
                      onChange={(selected) => {
                        setSelectedCity(selected);
                        field.onChange(selected?.value);
                      }}
                      onInputChange={(inputValue) => setSearchTerm(inputValue)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      <FormField
  control={control}
  name="Route"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Route</FormLabel>
      <FormControl>
        <Select
        isDisabled={loading}
        options={fetchedRoute}
          placeholder="Select Route"
          value={selectedRoute?selectedRoute:{value:Details?.delivery?.AssignedRoute?._id,label:Details?.delivery?.AssignedRoute?.RouteName}} // Value handling
          onChange={(selected) => {
            setSelectedRoute(selected);
            field.onChange(selected?.value);
          }}
          onInputChange={(inputValue) => setSearchRouteTerm(inputValue)}

        />
       
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


      </div> 

      <Separator className="mt-4 " />
      <Heading title="Delivery Time Slot" description="Select or add delivery time slots" />
      <Controller
        control={control}
        name="deliveryTimeSlot"
        render={({ field }) => (
          <div className=" mb-16">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium my-2 text-gray-700 dark:text-gray-300">Delivery Time Slot</label>
              <Edit
                onClick={() => setIsTimeSlotModalOpen(true)}
                className="cursor-pointer text-red-500"
                height={15}
                width={15}
              />
            </div>
            <Select
  isClearable
  isSearchable
  options={fetchedTime?.map((slot) => ({
    value: slot._id, // Using _id as the value
    label: `${slot.Start} - ${slot.End}`, // Concatenating Start and End for the label
  }))}
  onChange={(selected) => field.onChange(selected?.value)}
  value={
    fetchedTime?.find((slot) => slot._id === field.value)
      ? {
          value: field.value,
          label: `${fetchedTime?.find((slot) => slot._id === field.value).Start} - ${
            fetchedTime?.find((slot) => slot._id === field.value).End
          }`,
        }
      : null
  }
/>

          </div>
        )}
      />

      <div className="flex flex-col ">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
        <Controller
          control={control}
          name="Description"
          render={({ field }) => (
            <Textarea
              rows={5}
              placeholder="Enter any Notes"
              {...field}
            />
          )}
        />
      </div> 

      <Dialog open={isTimeSlotModalOpen} onOpenChange={(open) => !open && setIsTimeSlotModalOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Delivery Time Slots</DialogTitle>
            <DialogDescription>Add or remove delivery time slots</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                {/* <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr> */}
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fetchedTime?.map((slot, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slot.Start}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slot.End}</td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash onClick={() => deleteTimeSlot(index)} className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-4">
              <Input
                type="time"
                placeholder="Add new time slot"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <Input
                type="time"
                placeholder="Add new time slot"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <Button onClick={addTimeSlot} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

<Button type="submit" className="mt-4">
  Save Changes
</Button>
      </form>
      </Form>


      <Separator className="my-4" />
      <div className="flex justify-end">
        <Button variant="secondary" onClick={handleComplainView}>
          Complaint
        </Button>
      </div>
    </div>
  );
};

export default ModifyDelivery;
