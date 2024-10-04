'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { CouponsData } from '@/constants/couponsStats';

export const CouponsStatsComp: React.FC = () => {
  const coupon = CouponsData[0];
  const [darkMode, setDarkMode] = useState(false);

  const customers = [
    { id: 1, name: 'Shivam Singh', usedDate: "25/MAR/2002", phoneNumber: '123-456-7890' },
    { id: 2, name: 'Aman Gupta', usedDate: "25/MAR/2002", phoneNumber: '234-567-8901' },
    { id: 3, name: 'John Doe', usedDate: "25/MAR/2002", phoneNumber: '345-678-9012' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-start justify-between">
        <Heading title="Coupons Stats" description="View Coupons Details" />
      </div>
      <Separator />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
  <div className="grid grid-cols-2 gap-6">
    {/* Coupon details section */}
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Coupons Code:</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.couponCode}</p>
    </div>
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Coupon Type</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.couponType}</p>
    </div>
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Type</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.discountType}</p>
    </div>
  {coupon.discountPrice &&  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Price</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">₹ {coupon.discountPrice}</p>
    </div>}
   {coupon.discountPercentage && <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Percentage</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.discountPercentage} %</p>
    </div>}
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Coupon Status:</p>
      <p className={`text-xl font-medium ${coupon.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
        {coupon.status}
      </p>
    </div>
    <div className=" p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Number of Times can be applied by each user:</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.maxApplications}</p>
    </div>
    <div className=" p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Number of Times Applied</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{coupon.numberOfTimesApplied}</p>
    </div>
    <div className=" p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Revenue Generated</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">₹ {coupon.revenue}</p>
    </div>
    <div className=" p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Validity Range</p>
      <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">
        {coupon.validityRange.startDate} - {coupon.validityRange.endDate}
      </p>
    </div>
  </div>
</div>

      <Separator className="my-4" />
      <div className="flex items-start justify-between">
        <Heading title="Customer" description="Who Used this coupon" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-red-100 dark:bg-red-900">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Sno
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Customer Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Customer Phone Number
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Applied On
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {customers.map((cust, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{index+1}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cust.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cust.phoneNumber}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cust.usedDate}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <Button onClick={() => alert(`Details for ${cust.name}`)}>
                    View Customer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsStatsComp;
