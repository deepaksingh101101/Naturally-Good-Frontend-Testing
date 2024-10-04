'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

// Define the props interface
interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (startDate: Date, endDate?: Date) => void; // Add onDateChange prop
  initialStartDate?: Date; // Optional initial start date
  initialEndDate?: Date; // Optional initial end date
}

export function CalendarDateRangePicker({
  className,
  onDateChange, // Destructure the onDateChange prop
  initialStartDate = new Date(), // Default start date is today
  initialEndDate, // Default end date is undefined
}: CalendarDateRangePickerProps) {
  // Initialize date range state with the passed initialStartDate and initialEndDate
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialStartDate,
    to: initialEndDate,
  });

  // Update the state and call onDateChange when the date range changes
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from) {
      onDateChange?.(selectedDate.from, selectedDate.to); // Call onDateChange with the new dates
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange} // Update date range on selection
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
