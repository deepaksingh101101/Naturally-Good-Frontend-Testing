'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Download, Search, Calendar, Users, TrendingUp, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { CalendarDateRangePicker } from '../date-range-picker';
import { format, addDays } from 'date-fns';

export const RenewalReport: React.FC = () => {
  // Simulate Start and End Dates for 52 weeks
  const startDate = new Date(2024, 0, 1); // Assume the first week starts from Jan 1, 2024
  const data = Array.from({ length: 52 }, (_, i) => {
    const weekStart = addDays(startDate, i * 7);
    const weekEnd = addDays(weekStart, 6);
    return {
      week: `Week ${i + 1}`,
      startDate: format(weekStart, 'MMM d, yyyy'),
      endDate: format(weekEnd, 'MMM d, yyyy'),
      totalSubscription: 1000,
      totalRenewalDue: 200,
      renewed: 150,
      drop: 30,
      carryForward: 20,
      cumulativeDrop: 50,
      activeSubscriber: 900,
      inactiveSubscriber: 100,
    };
  });

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title="Renewal Report"
          description="View Renewal report for the selected time period."
        />
        <div className="flex space-x-2">
          <CalendarDateRangePicker />
          <Button
            variant="outline"
            className="flex text-white bg-blue-500 hover:bg-blue-700 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <Search height={16} className="mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            className="flex items-center bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>
        </div>
      </div>
      <Separator />

   

      
      


    </>
  );
};
