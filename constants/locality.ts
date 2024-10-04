// Define the Locality interface
export interface Locality {
  id: number;
  city: string;
  zone: string;
  sector: string;
  pin: string;
  sortOrder: number;
  serviced: string; // 'Yes' or 'No'
}

// Sample data for localities
export const LocalityData: Locality[] = [
  { id: 1, city: 'City 1', zone: 'Zone 1-1', sector: 'Sector 1', pin: '110001', sortOrder: 1, serviced: 'Yes' },
  { id: 2, city: 'City 1', zone: 'Zone 1-2', sector: 'Sector 2', pin: '110002', sortOrder: 2, serviced: 'No' },
  { id: 3, city: 'City 2', zone: 'Zone 2-1', sector: 'Sector 3', pin: '110003', sortOrder: 3, serviced: 'Yes' },
  { id: 4, city: 'City 2', zone: 'Zone 2-2', sector: 'Sector 4', pin: '110004', sortOrder: 4, serviced: 'No' },
  // Add more localities as needed
];
