'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { getDay, format, isBefore } from 'date-fns';
import { ComplaintsViewManagement } from '@/constants/complaint-view-data';

export const ComplaintData: ComplaintsViewManagement[] = [
  {
    orderId: 101,
    empId: 1022,
    employeeName: "Shivam Singh",
    customerName: "Deepak Singh",
    paymentType: 'Credit Card',
    subscriptionType: 'Mini Veggie Bag',
    deliveries: [
      {
        deliveryDate: '2023-07-17',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 200,
        complaints: [
          {
            complaintId: 1,
            complaintDate: '2023-07-17',
            complaintDetails: 'Package was damaged',
            status: 'Pending',
            
          }
        ]
      },
      {
        deliveryDate: '2023-07-18',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1",
        deliveryCharges: 0,
        complaints: [
          {
            complaintId: 2,
            complaintDate: '2023-07-18',
            complaintDetails: 'Late delivery',
            status: 'Resolved',
            resolvedBy:"Addons Bag"
          }
        ]
      },
      // Add more deliveries as needed
    ],
    bagOrdered: ['Regular Veggie Bag'],
    totalWeight: 10,
    totalPrice: 779,
    addons: ['Lemons'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave the package at the front door.'
  }
];

const getDayIndex = (day: string): number => {
  switch (day) {
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

const coupons = [
  { value: 'COUPON1', label: 'COUPON1' },
  { value: 'COUPON2', label: 'COUPON2' }
];

const addonBags = [
  { value: 'BAG1', label: 'Extra Veggie Bag' },
  { value: 'BAG2', label: 'Addon Bag' }
];

export const ComplaintView: React.FC = () => {
  const order = ComplaintData[0];
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [extraCharges, setExtraCharges] = useState<number | undefined>(undefined);
  const [resolutionMethod, setResolutionMethod] = useState<string | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [selectedBag, setSelectedBag] = useState<string | null>(null);

  const allowedDeliveryDays = ['MONDAY', 'WEDNESDAY']; // Example allowed days

  const handleEditClick = (delivery: any) => {
    setSelectedDelivery(delivery);
    setExtraCharges(undefined); // Reset extra charges
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
    setResolutionMethod(null);
    setSelectedCoupon(null);
    setSelectedBag(null);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    console.log('Updated delivery:', selectedDelivery, 'Extra charges:', extraCharges, 'Resolution method:', resolutionMethod, 'Selected coupon:', selectedCoupon, 'Selected bag:', selectedBag);
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-start justify-between">
        <Heading title="Complaint Details" description="View Complaint Details" />
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
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Status:</p>
            <p className={`text-lg ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
              {order.paymentStatus}
            </p>
          </div>
          <div className="">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Special Instructions:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.specialInstructions}</p>
          </div>
          <div className="">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subscription Type:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.subscriptionType}</p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-red-100 dark:bg-red-900">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Delivery Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Time Slot
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Assigned Route
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Delivery Charges (₹)
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Complaints
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {order.deliveries.map((delivery, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryDate}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryTimeSlot}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.assignedRoutes}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryCharges}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {delivery.complaints && delivery.complaints.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-700">
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                              Date
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                              Details
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                              Status
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                              Resolved By
                            </th>
                          
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {delivery.complaints.map(complaint => (
                            <tr key={complaint.complaintId} className={complaint.status === 'Pending' ? 'bg-yellow-300 dark:bg-yellow-900' : 'bg-green-300'}>
                              <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{complaint.complaintDate}</td>
                              <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{complaint.complaintDetails}</td>
                              <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{complaint.status}</td>
                              <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{complaint?.resolvedBy||"N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No Complaints</p>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(delivery)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDelivery && (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Delivery</DialogTitle>
              <DialogDescription>Update the delivery details below:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
         

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resolution Method</label>
                <Select
                  options={[
                    { value: 'COUPON', label: 'Coupons' },
                    { value: 'ADDON_BAG', label: 'Addon Bag' }
                  ]}
                  onChange={(selectedOption) => setResolutionMethod(selectedOption?.value || null)}
                />
              </div>

              {resolutionMethod === 'COUPON' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Coupon</label>
                  <Select
                    options={coupons}
                    onChange={(selectedOption) => setSelectedCoupon(selectedOption?.value || null)}
                  />
                </div>
              )}

              {resolutionMethod === 'ADDON_BAG' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Addon Bag</label>
                  <Select
                    options={addonBags}
                    onChange={(selectedOption) => setSelectedBag(selectedOption?.value || null)}
                  />
                </div>
              )}
                {resolutionMethod === 'ADDON_BAG' &&   <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Next Delivery Date</label>
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
              </div>}

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

export default ComplaintView;
