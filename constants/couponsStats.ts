export interface CouponStatsData {
  couponCode: string;
  couponType: 'Global' | 'Non-Global';
  discountPercentage?: number;
  discountPrice?: number;
  revenue?: number;
  numberOfTimesApplied: number;
  status?: string;
  validityRange: { 
    startDate: string; // ISO format date string
    endDate: string; // ISO format date string
  };
  discountType: 'Price' | 'Percentage';
  couponVisibility: 'Admin Only' | 'Public' | 'User Specific';
  maxApplications?: number; // Maximum number of times the coupon can be applied
  currentApplications?: number; // Current number of applications
}

export const CouponsData: CouponStatsData[] = [
  {
    couponCode: 'TRYNEW200',
    couponType: 'Global',
    discountPrice: 200,
    revenue: 20343,
    status: "Active",
    numberOfTimesApplied: 53,
    validityRange: {
      startDate: '2023-MAR-01',
      endDate: '2024-APR-31',
    },
    discountType: 'Price',
    couponVisibility: 'Public',
    maxApplications: 1,
    currentApplications: 3,
  }
  // Add more coupon details here as needed
];
