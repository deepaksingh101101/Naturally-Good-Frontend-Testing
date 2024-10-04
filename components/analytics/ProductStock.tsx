'use client';

import React, { ReactNode, MouseEventHandler, useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport } from 'react-icons/fa';
import { CalendarDateRangePicker } from '../date-range-picker';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
    {children}
  </button>
);

// Dummy data for products
const products = [
  { id: 1, name: 'Arvi', unitQuantity: 500, price: 10, soldUnits: 20 ,bufferPercentage:20},
  { id: 2, name: 'Tomato', unitQuantity: 1000, price: 5, soldUnits: 40,bufferPercentage:60 },
  { id: 3, name: 'Carrot', unitQuantity: 800, price: 7, soldUnits: 30 ,bufferPercentage:70},
];

export const ProductStock: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="flex items-start justify-between p-6">
        <Heading
          title="Product Stock"
          description="Detailed product stock report"
        />
        <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
                <Button>Download</Button>
              </div>
      </div>
      <Separator />
      <div className="mt-6 p-6">
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
                <th className="px-4 py-2 text-left">PRODUCT NAME</th>
                <th className="px-4 py-2 text-center ">UNIT QUANTITY(gms)</th>
                <th className="px-4 py-2 text-center ">PRICE</th>
                <th className="px-4 py-2 text-center ">SOLD UNITS</th>
                <th className="px-4 py-2 text-center ">BUFFER PERCENTAGE</th>
                <th className="px-4 py-2 text-center ">TOTAL REVENUE</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className={`₹{index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`}>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 text-center ">{product.unitQuantity}</td>
                  <td className="px-4 py-2 text-center ">₹{product.price}</td>
                  <td className="px-4 py-2 text-center ">{product.soldUnits}</td>
                  <td className="px-4 py-2 text-center ">{product.bufferPercentage}</td>
                  <td className="px-4 py-2 text-center ">₹{product.soldUnits * product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
