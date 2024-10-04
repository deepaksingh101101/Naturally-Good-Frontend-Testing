import { format, parseISO } from 'date-fns';
import { NavItem } from '@/types';
import { string } from 'zod';

export type UserSnapshot = {
  sno: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  totalSubscriptions: string;
  activeSubscriptions: string;
  lastSubscription: string;
  totalDeliveries: string;
  remainingDeliveries: string;
  lastDelivery: string;
  nextDelivery: string;
  additionalDays: string;
  activeWeeks: string;
  subscribedSince: string;
  totalRevenue: string;
  moneySaved: string;

};


// Helper function to format dates
const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd MMM yyyy');
};

export const userSnapshotData: UserSnapshot[] = [
  {
    sno: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    totalSubscriptions: '5',
    activeSubscriptions: 'Monthly Mini Veggies',
    lastSubscription: "Monthly Mini Veggies",
    totalDeliveries: '100',
    remainingDeliveries: '10',
    lastDelivery: formatDate('2024-09-01'),
    nextDelivery: formatDate('2024-09-15'),
    additionalDays: '7',
    activeWeeks: '25',
    subscribedSince: formatDate('2023-01-01'),
    totalRevenue: '1000',
    moneySaved: '200'
  },
  {
    sno: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '0987654321',
    totalSubscriptions: '3',
    activeSubscriptions: 'Monthly Regular Veggies',
    lastSubscription: "Monthly Regular Veggies",
    totalDeliveries: '75',
    remainingDeliveries: '5',
    lastDelivery: formatDate('2024-09-10'),
    nextDelivery: formatDate('2024-09-25'),
    additionalDays: '2',
    activeWeeks: '18',
    subscribedSince: formatDate('2022-11-10'),
    totalRevenue: '750',
    moneySaved: '150'
  },
  {
    sno: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phoneNumber: '1122334455',
    totalSubscriptions: '8',
    activeSubscriptions: 'Monthly Regular Veggies',
    lastSubscription: "Monthly Regular Veggies",
    totalDeliveries: '150',
    remainingDeliveries: '20',
    lastDelivery: formatDate('2024-08-30'),
    nextDelivery: formatDate('2024-09-20'),
    additionalDays: '4',
    activeWeeks: '32',
    subscribedSince: formatDate('2022-08-25'),
    totalRevenue: '2000',
    moneySaved: '400'
  }
];
