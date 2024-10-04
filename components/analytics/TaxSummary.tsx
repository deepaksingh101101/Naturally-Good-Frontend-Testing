'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Search, Trash, Download } from 'lucide-react';

interface TableData {
  month: string;
  income: string;
  expense: string;
}

export const TaxSummary: React.FC = () => {
  const [year, setYear] = useState('2024');
  const [report, setReport] = useState('Tax Summary');
  const [duration, setDuration] = useState('Jan-2024 to Dec-2024');
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleSearch = () => {
    const dummyData: TableData[] = [
      { month: 'January', income: '₹1000', expense: '₹500' },
      { month: 'February', income: '₹1200', expense: '₹600' },
      { month: 'March', income: '₹1300', expense: '₹700' },
      { month: 'April', income: '₹1100', expense: '₹550' },
      { month: 'May', income: '₹1500', expense: '₹750' },
      { month: 'June', income: '₹1600', expense: '₹800' },
      { month: 'July', income: '₹1700', expense: '₹850' },
      { month: 'August', income: '₹1400', expense: '₹700' },
      { month: 'September', income: '₹1800', expense: '₹900' },
      { month: 'October', income: '₹1900', expense: '₹950' },
      { month: 'November', income: '₹2000', expense: '₹1000' },
      { month: 'December', income: '₹2100', expense: '₹1050' },
    ];
    setTableData(dummyData);
    setShowSummary(true);
  };

  const handleDelete = () => {
    setYear('2024');
    setShowSummary(false);
    setTableData([]);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="flex items-start justify-between mb-6">
        <Heading
          title="Tax Summary"
          description="View and manage your tax summaries"
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2" />
            Download
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className=" w-96  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 "
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="">
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
              <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-gray-900 dark:text-gray-300">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-bold">Report:</p>
                    <p>{report}</p>
                  </div>
                  <div>
                    <p className="font-bold">Duration:</p>
                    <p>{duration}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse table-auto">
                  <thead>
                    <tr className="bg-gray-300 dark:bg-gray-700">
                      <th className="border-b p-2 text-center">TAX</th>
                      {tableData.map((data, index) => (
                        <th key={index} className="border-b p-2 text-center">{data.month.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b p-2 text-center">Income</td>
                      {tableData.map((data, index) => (
                        <td key={index} className="border-b p-2 text-center">{data.income}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border-b p-2 text-center">Expense</td>
                      {tableData.map((data, index) => (
                        <td key={index} className="border-b p-2 text-center">{data.expense}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
