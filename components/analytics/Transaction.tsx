'use client';

import React, { useState, ReactNode } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport, FaDownload, FaSearch, FaTrash } from 'react-icons/fa';
import { Button, Button as UIButton } from '@/components/ui/button'; // Renamed imported Button to UIButton
import { Search, Trash } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}


export const Transaction: React.FC = () => {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [account, setAccount] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('Jul-2024 to Feb-2024');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const start = new Date(startMonth);
    const end = new Date(endMonth);
    const formattedStart = start.toLocaleString('default', { month: 'short', year: 'numeric' });
    const formattedEnd = end.toLocaleString('default', { month: 'short', year: 'numeric' });
    setDuration(`${formattedStart} to ${formattedEnd}`);
  };

  const handleDelete = () => {
    setStartMonth('');
    setEndMonth('');
    setAccount('');
    setCategory('');
    setDuration('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 p-6">
      <div className="flex items-start justify-between mb-6">
        <Heading
          title={`Transaction Summary`}
          description="Detailed transaction report"
        />
        <div className="flex space-x-2">
          <UIButton onClick={() => { /* handle export logic */ }}>
            <FaFileExport />
          </UIButton>
          <UIButton onClick={() => { /* handle download logic */ }}>
            <FaDownload className='animate-bounce' />
          </UIButton>
        </div>
      </div>
      <Separator />
      <div className="mt-6">
        <div className="flex items-center justify-between space-x-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <div>
            <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Start Month</label>
            <input
              type="month"
              id="startMonth"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="endMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-400">End Month</label>
            <input
              type="month"
              id="endMonth"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Account</label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
            >
              <option value="" disabled>Select Account</option>
              <option value="stripe_paypal">Stripe/Paypal</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
            >
              <option value="" disabled>Select Category</option>
              <option value="bill">Bill</option>
              <option value="invoice">Invoice</option>
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
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in-up">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow-md">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Report :</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-300">Transaction Summary</p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow-md">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Duration :</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-300">{duration}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <select id="entriesPerPage" className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 transition duration-300">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-700 dark:text-gray-400">entries per page</label>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 transition duration-300"
            />
          </div>
          <div className="overflow-x-auto animate-fade-in-up">
            <table className="min-w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300 mb-4 rounded-md shadow-md">
              <thead className="bg-gray-300 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2">DATE</th>
                  <th className="px-4 py-2">ACCOUNT</th>
                  <th className="px-4 py-2">TYPE</th>
                  <th className="px-4 py-2">CATEGORY</th>
                  <th className="px-4 py-2">DESCRIPTION</th>
                  <th className="px-4 py-2">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-4">No entries found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
