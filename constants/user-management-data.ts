import { format, parseISO } from 'date-fns';
import { NavItem } from '@/types';
import { string } from 'zod';

export type UserManagement = {
  sno: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  alterNateContact?: string;
  alterNateAddress?: string;
  zipcode?: string;
  numberOfFamilyMembers?: string;
  state?: string;
  city?: string;
  sector?: string;
  society?: string;
  houseNumber?: string;
  dob?: string;
  gender?: string;
  assignedRoutes?: string[]; // Array of assigned routes
  subscriptionType: string;
  deliveryFrequency: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  accountStatus: 'Active' | 'Inactive';
  employeeName: string;
  lastUpdateDate: string;
  createdDate: string;
  customerWeight?:number;
  preferences?:string;
  notes?:string;
  customerType?:string
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd MMM yyyy');
};

export const userManagementData: UserManagement[] = [
  {
    sno: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    alterNateContact: '098-765-4321',
    alterNateAddress: '123 Secondary St, Apt 456',
    zipcode: '110001',
    numberOfFamilyMembers: '4',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Male',
    assignedRoutes: ['Route 1'],
    subscriptionType: 'Weekly',
    deliveryFrequency: 'Biweekly',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Deepak Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Lead"
  },
  {
    sno: 2,
    firstName: 'Ridhi',
    lastName: 'Mishra',
    email: 'ridhi.mishra@example.com',
    phoneNumber: '11111111',
    alterNateContact: '22222222',
    alterNateAddress: '456 Secondary St, Apt 789',
    zipcode: '110002',
    numberOfFamilyMembers: '3',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Female',
    assignedRoutes: ['Route 3'],
    subscriptionType: 'Quarterly',
    deliveryFrequency: 'Weekly',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Amar Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Prominent"

  },
  {
    sno: 3,
    firstName: 'Deepak',
    lastName: 'Singh',
    email: 'deepak.singh@example.com',
    phoneNumber: '123-456-7890',
    alterNateContact: '098-765-4321',
    alterNateAddress: '789 Secondary St, Apt 123',
    zipcode: '110003',
    numberOfFamilyMembers: '5',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Male',
    assignedRoutes: ['Route 4'],
    subscriptionType: 'Semi Annual',
    deliveryFrequency: 'Monthly',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Aman Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Lead"

  },
  {
    sno: 4,
    firstName: 'Shivam',
    lastName: 'Kumar',
    email: 'shivam.kumar@example.com',
    phoneNumber: '123-456-7890',
    alterNateContact: '098-765-4321',
    alterNateAddress: '321 Secondary St, Apt 654',
    zipcode: '110004',
    numberOfFamilyMembers: '2',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Male',
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Annual',
    deliveryFrequency: 'Fortnightly',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Roshan Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Lead"

  },
  {
    sno: 5,
    firstName: 'Vikash',
    lastName: 'Singh',
    email: 'vikash.singh@example.com',
    phoneNumber: '123-456-7890',
    alterNateContact: '098-765-4321',
    alterNateAddress: '654 Secondary St, Apt 987',
    zipcode: '110005',
    numberOfFamilyMembers: '6',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Male',
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Trial',
    deliveryFrequency: 'Biweekly',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Vikash Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Prominent"

  },
  {
    sno: 6,
    firstName: 'Prashant',
    lastName: 'Singh',
    email: 'prashant.singh@example.com',
    phoneNumber: '123-456-7890',
    alterNateContact: '098-765-4321',
    alterNateAddress: '987 Secondary St, Apt 321',
    zipcode: '110006',
    numberOfFamilyMembers: '7',
    state: 'Delhi',
    city: 'Delhi',
    sector: 'sector 68',
    society: 'm3m Marina',
    houseNumber: 's4 1404',
    dob: '11/JUL/2024',
    gender: 'Male',
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Quarterly',
    deliveryFrequency: 'Daily',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Prashant Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
    customerWeight:55,
    preferences:"potato",
    notes:"Free after 5pm",
    customerType:"Lead"
  },
];

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'User',
    href: '/user',
    icon: 'user',
    label: 'User',
  },
  {
    title: 'User Management',
    href: '/user-management',
    icon: 'management',
    label: 'User Management',
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: 'profile',
    label: 'Profile',
  },
];
