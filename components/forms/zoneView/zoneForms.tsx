'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

const zoneDetails = {
  zoneName: 'Zone A',
  serviced: 'Yes',
  deliverySequence: 1,
  deliveryCost: 500,
  associatedRoutes: ['Route 1', 'Route 2', 'Route 3', 'Route 4'],
  serviceableStatus: 'Yes' // Added serviceable status to zone details
};

const localities = [
  { id: 1, name: 'Locality 1', pincode: '123456', deliverySequence: 1, servicable: "Yes" },
  { id: 2, name: 'Locality 2', pincode: '654321', deliverySequence: 2, servicable: "No" },
  { id: 3, name: 'Locality 3', pincode: '789456', deliverySequence: 3, servicable: "Yes" },
];

export const ZoneView: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState<number | null>(null);

  const handleEditClick = (locality: { id: number; name: string; pincode: string; deliverySequence: number }) => {
    // Implement your edit logic here
    console.log('Editing locality:', locality);
  };

  const filteredLocalities = localities.filter(locality =>
    locality.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">Zone Details</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Zone Name:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{zoneDetails.zoneName}</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Serviced:</p>
            <p className={`text-lg font-semibold ${zoneDetails.serviced === 'Yes' ? 'text-green-600' : 'text-red-600'} dark:text-gray-100`}>
              {zoneDetails.serviced}
            </p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Delivery Sequence:</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{zoneDetails.deliverySequence}</p>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Delivery Cost (₹):</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{zoneDetails.deliveryCost}</p>
          </div>
          <div className="col-span-2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Associated Routes:</p>
            <ul className="list-disc list-inside pl-5 text-gray-900 dark:text-gray-100">
              {zoneDetails.associatedRoutes.map((route, index) => (
                <li key={index} className="py-1">{route}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <Separator className="my-4" />
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Search localities..."
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
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Locality Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pincode</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Delivery Sequence</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Servicable</th>
              <th className="px-4 text-center py-2 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLocalities.map((locality, index) => (
              <tr key={locality.id} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{locality.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{locality.pincode}</td>
                <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{locality.deliverySequence}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap text-sm font-semibold dark:bg-gray-600 dark:text-gray-200`}>
                  <span className={` px-4 py-1 rounded-full ${locality.servicable === 'Yes' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} >{locality.servicable}</span>
                </td>
                <td className="px-4 flex justify-center py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <Button className='bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white' onClick={() => handleEditClick(locality)}><Edit className='h-4 w-4' /></Button>
                  <Button className='bg-red-500 ms-2 text-white hover:bg-red-600 hover:text-white' onClick={() => handleEditClick(locality)}><Trash className='h-4 w-4' /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
