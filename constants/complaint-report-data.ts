export interface ComplaintReportManagement {
  sno: number;
  date: string; // Date field added
  totalComplaints: number;
  high: number;
  medium: number;
  low: number;
  totalBags: number;
  totalPercentage: string;
  totalHighPercentage: string;
  badQuality: number;
  badQualityPercentage: string;
  lateDelivery: number;
  lateDeliveryPercentage: string;
  missingWrongItems: number;
  missingWrongItemsPercentage: string;
  missingDelivery: number;
  missingDeliveryPercentage: string;
}

// Sample data for the complaint management system
export const ComplaintReportManagementData: ComplaintReportManagement[] = [
  {
    sno: 1,
    date: 'Jun-24',
    totalComplaints: 6,
    high: 34,
    medium: 19,
    low: 8,
    totalBags: 258,
    totalPercentage: '13.18%',
    totalHighPercentage: '7.36%',
    badQuality: 10,
    badQualityPercentage: '3.88%',
    lateDelivery: 0,
    lateDeliveryPercentage: '0.00%',
    missingWrongItems: 13,
    missingWrongItemsPercentage: '5.04%',
    missingDelivery: 4,
    missingDeliveryPercentage: '1.55%'
  },
  {
    sno: 2,
    date: 'Jul-24',
    totalComplaints: 7,
    high: 51,
    medium: 18,
    low: 23,
    totalBags: 337,
    totalPercentage: '15.13%',
    totalHighPercentage: '5.34%',
    badQuality: 15,
    badQualityPercentage: '4.45%',
    lateDelivery: 11,
    lateDeliveryPercentage: '3.26%',
    missingWrongItems: 20,
    missingWrongItemsPercentage: '5.93%',
    missingDelivery: 0,
    missingDeliveryPercentage: '0.00%'
  },
  {
    sno: 3,
    date: 'Aug-24',
    totalComplaints: 8,
    high: 9,
    medium: 7,
    low: 2,
    totalBags: 0, // Data missing from image, using 0
    totalPercentage: '', // Data missing from image
    totalHighPercentage: '', // Data missing from image
    badQuality: 0, // Data missing from image, using 0
    badQualityPercentage: '', // Data missing from image
    lateDelivery: 0, // Data missing from image, using 0
    lateDeliveryPercentage: '', // Data missing from image
    missingWrongItems: 0, // Data missing from image, using 0
    missingWrongItemsPercentage: '', // Data missing from image
    missingDelivery: 0, // Data missing from image, using 0
    missingDeliveryPercentage: '' // Data missing from image
  }
];
