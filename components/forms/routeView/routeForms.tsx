'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

const routeDetails = {
  routeName: 'Route A',
  city: 'City 1',
  status: 'Active',
  days: ['Monday', 'Wednesday'], // Example days
  vehiclesTagged: [
    { id: 1, vehicleName: 'Vehicle 1', driverName: 'Driver 1', phoneNumber: '1234567890' },
    { id: 2, vehicleName: 'Vehicle 2', driverName: 'Driver 2', phoneNumber: '0987654321' }
  ],
  serviced: 'Yes'
};

const zones = [
  { id: 1, zoneName: 'Zone 1', deliverySequence: 1, deliveryCost: 500, serviceableStatus: 'Yes' },
  { id: 2, zoneName: 'Zone 2', deliverySequence: 2, deliveryCost: 600, serviceableStatus: 'No' },
  { id: 3, zoneName: 'Zone 3', deliverySequence: 3, deliveryCost: 700, serviceableStatus: 'Yes' },
];

export const RouteView: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const handleEditClick = (zone: { id: number; zoneName: string; deliverySequence: number; deliveryCost: number }) => {
    // Implement your edit logic here
    console.log('Editing zone:', zone);
  };

  const filteredZones = zones.filter(zone =>
    zone.zoneName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">Route Details</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Route Name:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{routeDetails.routeName}</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">City:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{routeDetails.city}</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Status:</p>
            <p className={`text-lg font-semibold ${routeDetails.status === 'Active' ? 'text-green-600' : 'text-red-600'} dark:text-gray-100`}>
              {routeDetails.status}
            </p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Days:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{routeDetails.days.join(', ')}</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vehicles Tagged:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Vehicle Name</th>
                    <th className="border p-2">Driver Name</th>
                    <th className="border p-2">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {routeDetails.vehiclesTagged.map(vehicle => (
                    <tr key={vehicle.id}>
                      <td className="border p-2">{vehicle.vehicleName}</td>
                      <td className="border p-2">{vehicle.driverName}</td>
                      <td className="border p-2">{vehicle.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Serviced:</p>
            <p className={`text-lg font-semibold ${routeDetails.serviced === 'Yes' ? 'text-green-600' : 'text-red-600'} dark:text-gray-100`}>
              {routeDetails.serviced}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <Separator className="my-4" />
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Search zones..."
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className='bg-red-100 dark:bg-red-900'>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Sno</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Zone Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Delivery Sequence</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Delivery Cost</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Serviceable Status</th>
              <th className="px-4 text-center py-2 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredZones.map((zone, index) => (
              <tr key={zone.id} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{zone.zoneName}</td>
                <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{zone.deliverySequence}</td>
                <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{zone.deliveryCost}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap text-sm font-semibold dark:bg-gray-600 dark:text-gray-200`}>
                  <span className={`px-4 py-1 rounded-full ${zone.serviceableStatus === 'Yes' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {zone.serviceableStatus}
                  </span>
                </td>
                <td className="px-4 flex justify-center py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <Button className='bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white' onClick={() => handleEditClick(zone)}><Edit className='h-4 w-4' /></Button>
                  <Button className='bg-red-500 ms-2 text-white hover:bg-red-600 hover:text-white' onClick={() => handleEditClick(zone)}><Trash className='h-4 w-4' /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
