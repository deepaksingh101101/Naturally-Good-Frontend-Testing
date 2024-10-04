'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Search, Trash, Download, FileText, Calendar, IndianRupee, User, Plus, ArrowBigUpDash, RefreshCcw, Briefcase, BriefcaseIcon, ArrowBigUpDashIcon, SendHorizontal, Truck, CandlestickChart, Percent, RefreshCcwDot, IndianRupeeIcon, Shield, Minus, GiftIcon, UserCircle, Share, ChevronDown } from 'lucide-react';
import { SaleReportManagementData } from '@/constants/sale-report-data';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const SalesComponent: React.FC = () => {
  const [salesData] = useState(SaleReportManagementData);
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // State to hold selected month

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
    // You can filter or fetch data based on selected month
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between space-x-4 mb-6">
      <Heading title="Sales Report" description="Monthly Sales Overview" />
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



      </div>
      </div>
      <Separator className="my-4" />
      
      {salesData.map((report, reportIndex) => (
        <div key={reportIndex} className="space-y-8">
          {report.monthlyData.map((monthData, index) => (
            <div
              key={index}
              className="p-6 border-2 border-indigo-300 rounded-lg bg-gray-50 shadow-lg mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-indigo-700">
                  {monthData.month} Overview
                </h2>
                <Calendar className="w-8 h-8 text-indigo-700" />
              </div>
              <Separator />

              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">

              <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <CandlestickChart className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Sales By Sales Team
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.SalesBySalesTeam}
                    </p>
                  </div>
                </div>
              <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <GiftIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Sales Through Coupons
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.SalesByCoupons}
                    </p>
                  </div>
                </div>
              <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Share className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Sales Through Referral
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.SalesByReferral}
                    </p>
                  </div>
                </div>


                {/* Cumulative Active Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <FileText className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Cumulative Active Subscribers
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CumulativeActiveSubscribers}
                    </p>
                  </div>
                </div>

                {/* Cumulative Inactive Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <FileText className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Cumulative Inactive Subscribers
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CumulativeInactiveSubscribers}
                    </p>
                  </div>
                </div>


                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Cumulative Renewal Due
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CumulativeRenewalDue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Cumulative Active And RenewalDue
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CumulativeActiveAndRenewalDue}
                    </p>
                  </div>
                </div>

                {/* New Subscribers */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <User className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      New Subscribers
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.NewSubscriber}
                    </p>
                  </div>
                </div>

                {/* Subscriber Drop Out */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <User className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                      Subscriber Drop Out
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.SubscriberDropOut}
                    </p>
                  </div>
                </div>

           
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Plus className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    New Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.NewMonthOnMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <ArrowBigUpDash className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Upgrades Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.UpgradesMonthOnMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <RefreshCcw className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Renewals Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.RenewalsMonthOnMonth}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Briefcase className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Total Bags Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.TotalBagsMonthOnMonth}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <BriefcaseIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Bags Shipped As Per Operations
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.BagsShippedAsPerOperations}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <BriefcaseIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Bags Shipped As Per Sales
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.BagsShippedAsPerSales}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <ArrowBigUpDashIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Increment In Percentage
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.IncrementInPercentage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <SendHorizontal className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Operations Excess Short Dispatch Diff(%)
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.OperationsExcessShortDispatchDiffPercentage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Truck className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Previous Bags Booked Vs Current Bags Shipped
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.PreviousMonthBagsBookedVsCurrentMonthShipped}
                    </p>
                  </div>
                </div>


                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    New Revenue Booked Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.NewRevenueBookedMonthOnMonth}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Upgrade Revenue Booked Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.UpgradeRevenueBookedMonthOnMonth}
                    </p>
                  </div>
                </div>


                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Renewal Revenue Booked Month On Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.RenewalRevenueBookedMonthOnMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Percent className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    New Revenue Increase Percentage
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.NewRevenueIncreasePercentage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <RefreshCcwDot className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Renewal Revenue Increase Percentage
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.RenewalRevenueIncreasePercentage}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Revenue Booked Month On Month Accrued
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.RevenueBookedMonthOnMonthAccrued}
                    </p>
                  </div>
                </div> */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupeeIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Average Revenue Per Bag
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.AverageRevenuePerBag}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Shield className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Trial To Subscriptions
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.TrialToSubscriptions}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupeeIcon className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Cash Received Current Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CashFlowReceivedCurrentMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Cash Flow Due Current Month
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CashFlowDueCurrentMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Minus className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Cash Flow Difference
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CashFlowDifference}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Opening Past Due
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.OpeningPastDue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-green-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Received For Past Dues
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.ReceivedForPastDues}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Actual Received
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.ActualReceived}
                    </p>
                  </div>
                </div> */}
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Cumulative Past Dues
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.CumulativePastDues}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <IndianRupee className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Additional Due
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.AdditionalDue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Total Accrual
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.TotalAccrual}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Difference Check
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.DiffCheck}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Additional Active
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.AdditionalActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Additional Inactive
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.AdditionalInactive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Monthly Subscription Breakup
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.MonthlySubscriptionBreakup}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Annual Subscription Breakup
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.AnnualSubscriptionBreakup}
                    </p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <Trash className="w-10 h-10 text-red-600" />
                  <div className="ml-4">
                    <span className="text-lg font-semibold text-gray-700">
                    Other Subscription Breakup
                    </span>
                    <p className="text-xl text-gray-900">
                      {monthData.OtherSubscriptionBreakup}
                    </p>
                  </div>
                </div> */}

                          </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
