'use client';

import React, { ReactNode, MouseEventHandler, useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport } from 'react-icons/fa';
import { CalendarDateRangePicker } from '../date-range-picker';
import { Bar, Pie } from 'react-chartjs-2'; // Import Chart components
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
    {children}
  </button>
);

// Dummy data for pack-wise aggregation
const deliveries = [
  {
    id: 1,
    deliveryDate: '2024-MAR-28',
    subscriptionItems: [
      { name: 'Carrot', purchasedUnits: 5, costPerUnit: 7 },
      { name: 'Potato', purchasedUnits: 10, costPerUnit: 4 },
    ],
    addons: [
      { name: 'Garlic', purchasedUnits: 2, costPerUnit: 15 },
      { name: 'Onion', purchasedUnits: 3, costPerUnit: 8 },
    ],
    deliveryCostEarned: 50,
    totalRevenue: 500,
  },
  {
    id: 2,
    deliveryDate: '2024-JUN-29',
    subscriptionItems: [
      { name: 'Tomato', purchasedUnits: 6, costPerUnit: 5 },
      { name: 'Cabbage', purchasedUnits: 4, costPerUnit: 6 },
    ],
    addons: [
      { name: 'Lemon', purchasedUnits: 1, costPerUnit: 10 },
      { name: 'Cabbage', purchasedUnits: 4, costPerUnit: 6 },
    ],
    deliveryCostEarned: 40,
    totalRevenue: 700,

  },
];

export const PackWise: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = deliveries.filter(delivery =>
      delivery.subscriptionItems.some(item => item.name.toLowerCase().includes(value)) ||
      delivery.addons.some(addon => addon.name.toLowerCase().includes(value)) ||
      delivery.deliveryDate.includes(value)
    );

    setFilteredDeliveries(filtered);
  };

  const barChartData = {
    labels: filteredDeliveries.map(delivery => delivery.deliveryDate),
    datasets: [
      {
        label: 'Total Delivery Cost',
        data: filteredDeliveries.map(delivery => delivery.deliveryCostEarned),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the pie chart
  const pieChartData = {
    labels: deliveries.flatMap(delivery => delivery.subscriptionItems.map(item => item.name)),
    datasets: [
      {
        label: 'Purchased Units Distribution',
        data: deliveries.flatMap(delivery => delivery.subscriptionItems.map(item => item.purchasedUnits)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="flex items-start justify-between p-6">
        <Heading
          title="Pack Wise"
          description="Detailed pack wise report"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Separator />
      <div className="mt-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <select id="entriesPerPage" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1">
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <label htmlFor="entriesPerPage" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400">
              entries per page
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 rounded-lg shadow-md">
            <thead className="bg-green-100 dark:bg-green-700">
              <tr>
                <th className="px-4 py-2 text-left">DELIVERY DATE</th>
                <th className="px-4 py-2 text-left">SUBSCRIPTION ITEMS</th>
                <th className="px-4 py-2 text-left">ADDONS</th>
                <th className="px-4 py-2 text-center">DELIVERY CHARGED</th>
                <th className="px-4 py-2 text-center">ADDONS REVENUE</th>
                {/* <th className="px-4 py-2 text-center">VISUALIZE</th> */}
              </tr>
            </thead>
            <tbody>
  {filteredDeliveries.map((delivery, index) => (
    <tr
      key={delivery.id}
      className={`${
        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'
      } border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`}
    >
      <td className="px-4 py-2">{delivery.deliveryDate}</td>
      <td className="px-4 py-2">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
          <thead>
            <tr className="bg-green-100 dark:bg-green-700">
              <th className="px-2 py-1 text-left font-semibold text-gray-900 dark:text-gray-300">Item</th>
              <th className="px-2 py-1 text-center font-semibold text-gray-900 dark:text-gray-300">Units</th>
              <th className="px-2 py-1 text-center font-semibold text-gray-900 dark:text-gray-300">Cost per Unit</th>
            </tr>
          </thead>
          <tbody>
            {delivery.subscriptionItems.map((item) => (
              <tr key={item.name} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-2 py-1 text-left text-gray-800 dark:text-gray-300">{item.name}</td>
                <td className="px-2 py-1 text-center text-gray-800 dark:text-gray-300">{item.purchasedUnits}</td>
                <td className="px-2 py-1 text-center text-gray-800 dark:text-gray-300">₹{item.costPerUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
      <td className="px-4 py-2">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
          <thead>
            <tr className="bg-green-100 dark:bg-green-700">
              <th className="px-2 py-1 text-left font-semibold text-gray-900 dark:text-gray-300">Addon</th>
              <th className="px-2 py-1 text-center font-semibold text-gray-900 dark:text-gray-300">Units</th>
              <th className="px-2 py-1 text-center font-semibold text-gray-900 dark:text-gray-300">Cost per Unit</th>
            </tr>
          </thead>
          <tbody>
            {delivery.addons.map((addon) => (
              <tr key={addon.name} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-2 py-1 text-left text-gray-800 dark:text-gray-300">{addon.name}</td>
                <td className="px-2 py-1 text-center text-gray-800 dark:text-gray-300">{addon.purchasedUnits}</td>
                <td className="px-2 py-1 text-center text-gray-800 dark:text-gray-300">₹{addon.costPerUnit}</td>
               
              </tr>
            ))}
            
          </tbody>
        </table>
      </td>
      <td className="px-4 py-2 text-center">₹{delivery.deliveryCostEarned}</td>
      <td className="px-4 py-2 text-center">₹{delivery.totalRevenue}</td>
      {/* <td className="px-2 py-1 text-center text-gray-800 dark:text-gray-300">
            <Bar data={barChartData} />
         
            <Pie style={{maxHeight:"100px",maxWidth:"100px"}}  data={pieChartData} />
       

                </td> */}
    </tr>
  ))}
</tbody>


          </table>

        
        </div>
        <div className="grid mt-4  grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* <div>
            <h3 className="text-lg font-semibold mb-2">Total Revenue Cost per Date</h3>
            <Bar data={barChartData} />
          </div> */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-2">Purchased Units Distribution</h3>
            <Pie data={pieChartData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};
