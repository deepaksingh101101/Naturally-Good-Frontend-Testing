'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Search, Trash, Download, FileText, Calendar, IndianRupee, User, Plus, ArrowBigUpDash, RefreshCcw, Briefcase, BriefcaseIcon, ArrowBigUpDashIcon, SendHorizontal, Truck, CandlestickChart, Percent, RefreshCcwDot, IndianRupeeIcon, Shield, Minus, ChevronDown } from 'lucide-react';
import { SaleReportManagementData } from '@/constants/sale-report-data';
import { Input } from '../ui/input';
import { RevenueReportManagementData } from '@/constants/revenue-report-data';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const RevenueComponent: React.FC = () => {
  const [revenueData] = useState(RevenueReportManagementData);
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // State to hold selected month

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
    // You can filter or fetch data based on selected month
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between space-x-4 mb-6">
      <Heading title="Revenue Report" description="Monthly Revenue Overview" />
      <div className="flex">

  
        {/* <label htmlFor="monthPicker" className="text-gray-700 font-semibold">
          Select Month:
        </label> */}
        <Input
          id="monthPicker"
          type="month"
          className="border border-gray-300 rounded-lg p-2"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
          <Button
            variant="outline"
            className="flex ms-2 items-center bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>

                
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button style={{ background: "#04894d", color: 'white' }} className="text-xs md:text-sm ms-4">
          Filter <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        {/* Static Filter 1 */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Bag
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>Most Revenued</DropdownMenuItem>
            <DropdownMenuItem>Least Revenued</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Static Filter 2 */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Price Range
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>Under $50</DropdownMenuItem>
            <DropdownMenuItem>$50 - $100</DropdownMenuItem>
            <DropdownMenuItem>Over $100</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Static Filter 3 */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Availability
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>In Stock</DropdownMenuItem>
            <DropdownMenuItem>Out of Stock</DropdownMenuItem>
            <DropdownMenuItem>Pre-Order</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
      </div>
      <Separator className="my-4" />
      
        <div className="space-y-8">
            <div
              className="p-6 border-2 border-indigo-300 rounded-lg bg-gray-50 shadow-lg mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-indigo-700">
                  {revenueData.month} Overview
                </h2>
                <Calendar className="w-8 h-8 text-indigo-700" />
              </div>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {/* Cumulative Active Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <FileText className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    OpeningDue
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.OpeningDue}
                    </p>
                  </div>
                </div>

                {/* Cumulative Inactive Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <FileText className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Revenue Accrued Booked
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.RevenueAccruedBooked}
                    </p>
                  </div>
                </div>


                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Daily Revenue As Per Sales
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.DailyRevenueAsPerSales}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Actual Receipt Rozarpay
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.ActualReceiptRozarpay}
                    </p>
                  </div>
                </div>

                {/* New Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <User className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Receipt GPAY Business
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.ReceiptGPAYBusiness}
                    </p>
                  </div>
                </div>

                {/* Subscriber Drop Out */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <User className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Direct In Bank
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.DirectInBank}
                    </p>
                  </div>
                </div>

           
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Plus className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Employee Receipts Transferred To Gpay
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.EmployeeReceiptsTransferredToGpay}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <ArrowBigUpDash className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Closing Due
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.ClosingDue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <RefreshCcw className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Past Dues Received As Per Sales
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.PastDuesReceivedAsPerSales}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Briefcase className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Past Dues Received As Per Accounts
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.PastDuesReceivedAsPerAccounts}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <BriefcaseIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Others Due
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.OthersDue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <BriefcaseIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Active As On Date
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.ActiveAsOnDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <ArrowBigUpDashIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Renewal Due As On Date
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.RenewalDueAsOnDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <SendHorizontal className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Inactive As On Date
                    </span>
                    <p className="text-xl text-gray-900">
                      {revenueData.InactiveAsOnDate}
                    </p>
                  </div>
                </div>

              

                          </div>
            </div>
      
        </div>
    </div>
  );
};
