'use client';

import React, { useState, useEffect } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Search, Trash, Download, FileText } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TableData {
  invoice: string;
  date: string;
  customer: string;
  category: string;
  status: string;
  paidAmount: number;
  dueAmount: number;
  paymentDate: string;
  amount: number;
  description?: string;
}

export const IncomeSummary: React.FC = () => {
  const [year, setYear] = useState('');
  const [customer, setCustomer] = useState('');
  const [category, setCategory] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear().toString();
    setYear(currentYear);
  }, []);

  const handleSearch = () => {
    const dummyData: TableData[] = [
      { invoice: 'INV001', date: '2024-01-01', customer: 'Customer 1', category: 'Sales', status: 'Paid', paidAmount: 800, dueAmount: 200, paymentDate: '2024-01-05', amount: 1000 },
      { invoice: 'INV002', date: '2024-02-01', customer: 'Customer 2', category: 'Services', status: 'Unpaid', paidAmount: 0, dueAmount: 2000, paymentDate: '', amount: 2000 },
    ];

    setTableData(dummyData);
    setShowSummary(true);
  };

  const handleDelete = () => {
    setYear('');
    setCustomer('');
    setCategory('');
    setShowSummary(false);
    setTableData([]);
  };

  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income',
        data: [0, 0.5, 0.8, 0.4, 1.2, 0.9, 0.3, 0.6, 0.4, 0.7, 0.9, 1.0],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
        fill: false,
      },
    ],
  };

  const graphOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#008000',
        },
      },
      title: {
        display: true,
        text: 'Income Summary',
        color: '#008000',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#008000',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#008000',
        },
        grid: {
          display: false,
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 p-6">
      <div className="flex items-start justify-between p-6">
        <Heading
          title="Income Summary"
          description="Summary of income"
        />
        <div className="flex space-x-2">
          <Button variant="outline" className="flex text-white bg-blue-500 hover:bg-blue-700 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
            <FileText height={16} className="mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-auto p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Year</label>
              <select
                id="year"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-64"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Customer</label>
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <option value="" disabled>Select customer</option>
                <option value="customer1">Customer 1</option>
                <option value="customer2">Customer 2</option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <option value="" disabled>Select category</option>
                <option value="sales">Sales</option>
                <option value="services">Services</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Button onClick={handleSearch} variant="outline" className="bg-green-500 text-white hover:bg-green-700 hover:text-white">
                  <Search height={16} className='mt-[2px]' />
                  Search
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="bg-red-500 text-white hover:bg-red-700">
                  <Trash height={16} />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {showSummary && (
            <>
              <div className="mt-4">
                <Line data={graphData} options={graphOptions} />
              </div>
              {/* <div className="mt-4">
                <div className="overflow-auto">
                  <table className="w-full bg-gray-900 text-gray-400 mb-4 rounded-md shadow-md">
                    <thead className="bg-gray-300 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2">CATEGORY</th>
                        <th className="px-4 py-2">JANUARY</th>
                        <th className="px-4 py-2">FEBRUARY</th>
                        <th className="px-4 py-2">MARCH</th>
                        <th className="px-4 py-2">APRIL</th>
                        <th className="px-4 py-2">MAY</th>
                        <th className="px-4 py-2">JUNE</th>
                        <th className="px-4 py-2">JULY</th>
                        <th className="px-4 py-2">AUGUST</th>
                        <th className="px-4 py-2">SEPTEMBER</th>
                        <th className="px-4 py-2">OCTOBER</th>
                        <th className="px-4 py-2">NOVEMBER</th>
                        <th className="px-4 py-2">DECEMBER</th>
                        <th className="px-4 py-2">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} text-gray-400`}>
                          <td className="px-4 py-2">{data.category}</td>
                          <td className="px-4 py-2">{data.paidAmount > 0 ? `₹${data.paidAmount.toFixed(2)}` : '₹0.00'}</td>
                          <td className="px-4 py-2">{data.dueAmount > 0 ? `₹${data.dueAmount.toFixed(2)}` : '₹0.00'}</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">₹0.00</td>
                          <td className="px-4 py-2">{`₹${(data.paidAmount + data.dueAmount).toFixed(2)}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
