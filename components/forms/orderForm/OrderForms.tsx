'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderManagement } from '@/constants/order-management-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { getDay, format, isBefore } from 'date-fns';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';

export const OrderData: OrderManagement[] = [
  {
    orderId: 101,
    empId: 1022,
    employeeName: "Shivam Singh",
    customerName: "Deepak Singh", 
    paymentType: 'Credit Card',
    deliveries: [
      {
        deliveryDate: '2023-07-17',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 200 // Example delivery charge
      },
      {
        deliveryDate: '2023-07-18',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 0 // Example delivery charge
      },
      {
        deliveryDate: '2023-07-23',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 0 // Example delivery charge
      },
      {
        deliveryDate: '2023-07-27',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 0 // Example delivery charge
      },
      // Add more deliveries as needed
    ],
    bagOrdered: ['Regular Veggie Bag'],
    totalWeight: 10,
    totalPrice: 779,
    addons: ['Lemons'],
    paymentStatus: 'Paid',
    playOrPaused: 'Paused',
    specialInstructions: 'Leave the package at the front door.'
  }
];

const timeSlots = [
  { value: '8am - 10am', label: '8am - 10am' },
  { value: '10am - 12pm', label: '10am - 12pm' },
  { value: '12pm - 2pm', label: '12pm - 2pm' },
];

const deliveryStatuses = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const employees = [
  { value: 'Shivam Singh', label: 'Shivam Singh', phoneNumber: '123-456-7890' },
  { value: 'Aman Gupta', label: 'Aman Gupta', phoneNumber: '234-567-8901' },
  { value: 'John Doe', label: 'John Doe', phoneNumber: '345-678-9012' },
];

const routes = [
  { value: 'Route 1', label: 'Route 1' },
  { value: 'Route 2', label: 'Route 2' },
  { value: 'Route 3', label: 'Route 3' },
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

const highlightDeliveryDate = (date: Date, allowedDays: string[]) => {
  const dayIndex = getDay(date);
  return allowedDays.some(day => getDayIndex(day) === dayIndex);
};

export const OrderView: React.FC = () => {
  const order = OrderData[0];
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [extraCharges, setExtraCharges] = useState<number | undefined>(undefined);

  const allowedDeliveryDays = ['MONDAY', 'WEDNESDAY']; // Example allowed days

  const handleEditClick = (delivery?: any) => {
    setSelectedDelivery(delivery);
    setExtraCharges(undefined); // Reset extra charges
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    console.log('Updated delivery:', selectedDelivery, 'Extra charges:', extraCharges);
    setIsModalOpen(false);
  };

  const formatEmployeeOptionLabel = (employee: any) => (
    <div className="flex justify-between">
      <span>{employee.label}</span>
      <span className="text-gray-500">{employee.phoneNumber}</span>
    </div>
  );

  const [isPaused, setIsPaused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const handleClick=()=>{
    setShowDatePicker(true)
// setIsPaused(false)
  }
  const handlePlayClick=()=>{
setShowDatePicker(true)
  }
  const handlePause=()=>{
setShowDatePicker(false)
setIsPaused(true)
  }
  const handlePlay=()=>{
setShowDatePicker(false)
setIsPaused(false)
  }

  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);

  const handleCheckboxChange = (deliveryDate: string) => {
    setSelectedDeliveries(prevSelected =>
      prevSelected.includes(deliveryDate)
        ? prevSelected.filter(date => date !== deliveryDate)
        : [...prevSelected, deliveryDate]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedDeliveries.length === order.deliveries.length) {
      setSelectedDeliveries([]);
    } else {
      setSelectedDeliveries(order.deliveries.map(delivery => delivery.deliveryDate));
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-start justify-between">
        <Heading title="Order Details" description="View Order Details" />
      </div>
      <Separator />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.orderId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Associated Employee Name(ID):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.employeeName}({order.empId})</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Customer Name:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.customerName}</p>
          </div>
       
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Maximum Weight (kg):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.totalWeight}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Price(₹):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.totalPrice}</p>
          </div>
          {/* <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add-ons:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.addons?.join(', ') || 'None'}</p>
          </div> */}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Status:</p>
            <p className={`text-lg ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
              {order.paymentStatus}
            </p>
          </div>
         
          {isPaused && <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Order Status</p>
            <p >
              <span onClick={handleClick} className={`text-lg my-2 cursor-pointer hover:scale-105 text-white px-2 py-1 bg-red-600 `}>Paused</span>
            </p>
          </div>}
          {!isPaused && <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Order Status</p>
            <p >
              <span onClick={handlePlayClick} className={`text-lg my-2 cursor-pointer hover:scale-105 text-white px-2 py-1 bg-green-600`} >Running</span>
            </p>
          </div>}
          {showDatePicker && <div className="">
          <p className="text-sm my-1  font-semibold text-gray-700 dark:text-gray-300">Select Range</p>
          <div className="flex items-center justify-between">

            <CalendarDateRangePicker/>
{      !isPaused &&      <button  onClick={handlePause} className='bg-red-600 px-4 py-2 ms-3 w-full text-white font-bold ' >Pause</button>
}           
{isPaused && <button  onClick={handlePlay} className='bg-green-600 px-4 py-2 ms-3 w-full text-white font-bold ' >play</button>
}          </div>
          </div>}
          <div className="col-span-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Special Instructions:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.specialInstructions}</p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 position-relative">
          <thead className='relative' >
            <tr className="bg-red-100 relative dark:bg-red-900">
            <th className=" py-2">
              <Checkbox
                checked={selectedDeliveries.length === order.deliveries.length}
                onCheckedChange={handleSelectAllChange}
              />
            </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Delivery Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Time Slot
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Assigned Employee
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Assigned Route
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Delivery Charges (₹)
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            </tr>
{selectedDeliveries?.length>0 &&  <Edit onClick={() => handleEditClick({
        deliveryDate: '2023-07-27',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 0 // Example delivery charge
      })} className="cursor-pointer text-red-500 text-[20px] absolute top-0 end-0" />
}          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {order.deliveries.map((delivery, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
              <td className=" ps-6 pe-4 py-2">
                <Checkbox
                  checked={selectedDeliveries.includes(delivery.deliveryDate)}
                  onCheckedChange={() => handleCheckboxChange(delivery.deliveryDate)}
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryDate}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryTimeSlot}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    delivery.deliveryStatus === 'Delivered'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {delivery.deliveryStatus}
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.assignedEmployee}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.assignedRoutes}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryCharges}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                <Button  onClick={() => handleEditClick(delivery)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Delivery</DialogTitle>
              <DialogDescription>Update the delivery details below:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      type="text"
                      readOnly
                      value={selectedDelivery?.deliveryDate || ''}
                      onClick={() => {}}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDelivery?.deliveryDate ? new Date(selectedDelivery.deliveryDate) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const formattedDate = format(date, 'yyyy-MM-dd');
                          setSelectedDelivery({ ...selectedDelivery, deliveryDate: formattedDate });
                          if (!highlightDeliveryDate(date, allowedDeliveryDays)) {
                            setExtraCharges(200); // Example extra charge
                          } else {
                            setExtraCharges(undefined);
                          }
                        }
                      }}
                      disabled={(date) => isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))}
                      modifiers={{
                        highlight: (date) => highlightDeliveryDate(date, allowedDeliveryDays)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {extraCharges !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Extra Delivery Charges (₹)</label>
                  <Input
                    type="number"
                    value={extraCharges}
                    onChange={(e) => setExtraCharges(Number(e.target.value))}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Slot</label>
                <Select
                  options={timeSlots}
                  value={timeSlots.find((option) => option.value === selectedDelivery?.deliveryTimeSlot)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, deliveryTimeSlot: selectedOption?.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Status</label>
                <Select
                  options={deliveryStatuses}
                  value={deliveryStatuses.find((option) => option.value === selectedDelivery?.deliveryStatus)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, deliveryStatus: selectedOption?.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Employee</label>
                <Select
                  options={employees}
                  formatOptionLabel={formatEmployeeOptionLabel}
                  value={employees.find((option) => option.value === selectedDelivery?.assignedEmployee)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, assignedEmployee: selectedOption?.value })
                  }
                  isSearchable
                  filterOption={(candidate, input) =>
                    candidate.label.toLowerCase().includes(input.toLowerCase()) ||
                    candidate.data.phoneNumber.includes(input)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Routes</label>
                <Select
                  options={routes}
                  value={routes.find((option) => option.value === selectedDelivery?.assignedRoutes)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, assignedRoutes: selectedOption?.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderView;
