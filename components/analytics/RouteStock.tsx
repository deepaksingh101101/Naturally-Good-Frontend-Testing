'use client';

import React, { ReactNode, MouseEventHandler, useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport } from 'react-icons/fa';
import { CalendarDateRangePicker } from '../date-range-picker';
import { Bar } from 'react-chartjs-2'; // Import Bar from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components for ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
    {children}
  </button>
);

// Dummy data for route reports
const routeReports = [
  { routeName: 'Route A', deliveries: 15, extraCost: 50 },
  { routeName: 'Route B', deliveries: 10, extraCost: 30 },
  { routeName: 'Route C', deliveries: 20, extraCost: 70 },
];

// Prepare data for the chart
const chartData = {
  labels: routeReports.map((report) => report.routeName),
  datasets: [
    {
      label: 'Deliveries Done',
      data: routeReports.map((report) => report.deliveries),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Extra Delivery Cost Earned',
      data: routeReports.map((report) => report.extraCost),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Route Delivery Statistics',
    },
  },
};

export const RouteReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(routeReports);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = routeReports.filter(route =>
      route.routeName.toLowerCase().includes(value)
    );

    setFilteredRoutes(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="flex items-start justify-between p-6">
        <Heading
          title="Route Report"
          description="Detailed route report with deliveries and earnings"
        />
        <div className="hidden items-center space-x-2 md:flex">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Separator />
      
      {/* Graph Section */}
      <div className="mt-6 p-6">
      <select
            // onChange={handleCityChange}
            // value={selectedCity}
            className="bg-gray-100 my-3 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1"
          >
            <option value="">All Cities</option>
            <option value="City 1">City 1</option>
            <option value="City 2">City 2</option>
            {/* Add more city options as needed */}
          </select>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-6">
          <Bar data={chartData} options={chartOptions} />
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

        {/* Route Report Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 rounded-lg shadow-md">
            <thead className="bg-green-100 dark:bg-green-700">
              <tr>
                <th className="px-4 py-2 text-left">ROUTE NAME</th>
                <th className="px-4 py-2 text-center">DELIVERIES DONE</th>
                <th className="px-4 py-2 text-center">EXTRA DELIVERY COST</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route, index) => (
                <tr key={route.routeName} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`}>
                  <td className="px-4 py-2">{route.routeName}</td>
                  <td className="px-4 py-2 text-center">{route.deliveries}</td>
                  <td className="px-4 py-2 text-center">₹{route.extraCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
