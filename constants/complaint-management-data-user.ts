// Define the ComplaintManagement interface
export interface ComplaintManagementUser {
  sno: number;
  name: string;
  phone?:string;
  complaintType: string;
  description: string;
  status: 'Open' | 'Closed';
  resolution?: string;
}

// Sample data for the complaint management system
export const ComplaintManagementUserData: ComplaintManagementUser[] = [
  {
    sno: 1,
    name: "Deepak Singh",
    phone:"123456789",
    complaintType: 'Delay',
    description: 'Delivery was delayed by 2 days.',
    status: 'Open',
    resolution: 'Coupon'
  },
  {
    sno: 2,
    name: "Arya Singh",
    complaintType: 'Bad quality',
    phone:"789543547",
    description: 'Vegetables were not fresh.',
    status: 'Closed',
    resolution: 'Store credits'
  },
  {
    sno: 3,
    name: "Kartik Singh",
    phone:"8736434543",
    complaintType: 'Wrong item',
    description: 'Received a fruit basket instead of a veggie bag.',
    status: 'Open',
    resolution: 'Add-on bag'
  },
  {
    sno: 4,
    name: "Shivam Kumar",
    phone:"2873463752",
    complaintType: 'Not reached',
    description: 'Order was not delivered.',
    status: 'Closed'
  }
];
