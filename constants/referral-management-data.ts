// Define the ReferralManagement interface
export interface ReferralManagement {
  id: number;
  discountPercentage: number; // Assuming discount is in percentage
  // startDate: Date;
  // endDate: Date;
  validity:number;
  status: 'Active' | 'Inactive';
  assignedTo: 'Referred By' | 'Referred To';
}

// Sample data for the referral management system
export const ReferralManagementData: ReferralManagement[] = [
  {
    id: 1,
    discountPercentage: 15,
    validity:1,
    status: 'Active',
    assignedTo:"Referred By"
  },
  {
    id: 2,
    discountPercentage: 10,
    validity:2,
    status: 'Inactive',
    assignedTo:"Referred To"
  }
];
