// Define the Locality interface
export interface Locality {
  id: number;
  name: string;
  pincode: string; // Add pincode to Locality
}

// Define the Zone interface
export interface Zone {
  id: number;
  zoneName: string;
  serviced: boolean;
  deliverySequence?: number; // deliverySequence is optional as it might not be provided for some zones
  deliveryCost: number;
  sequenceOrder: number; // Add sequenceOrder to Zone
  localities: Locality[];
  city?:string;
}

// Sample data for the zone management system
export const ZoneManagementData: Zone[] = [
  {
    id: 1,
    zoneName: 'Zone 1',
    serviced: true,
    deliverySequence: 1,
    deliveryCost: 50,
    sequenceOrder: 1, // Add sequenceOrder value
    localities: [
      { id: 1, name: 'Locality 1', pincode: '110001' },
      { id: 2, name: 'Locality 2', pincode: '110002' },
    ],
    city:"Delhi"
  },
  {
    id: 2,
    zoneName: 'Zone 2',
    serviced: false,
    deliverySequence: 2,
    deliveryCost: 75,
    sequenceOrder: 2, // Add sequenceOrder value
    localities: [
      { id: 3, name: 'Locality 3', pincode: '110003' },
      { id: 4, name: 'Locality 4', pincode: '110004' },
    ],
    city:"Delhi"
  },
  {
    id: 3,
    zoneName: 'Zone 3',
    serviced: true,
    deliverySequence: 3,
    deliveryCost: 60,
    sequenceOrder: 3, // Add sequenceOrder value
    localities: [
      { id: 5, name: 'Locality 5', pincode: '110005' },
      { id: 6, name: 'Locality 6', pincode: '110006' },
    ],
    city:"Delhi"
  },
  
  {
    id: 4,
    zoneName: 'Zone 4',
    serviced: true,
    deliverySequence: 4,
    deliveryCost: 80,
    sequenceOrder: 4, // Add sequenceOrder value
    localities: [
      { id: 7, name: 'Locality 7', pincode: '110007' },
      { id: 8, name: 'Locality 8', pincode: '110008' },
    ],
    city:"Delhi"
  },
  {
    id: 5,
    zoneName: 'Zone 5',
    serviced: false,
    deliverySequence: 5,
    deliveryCost: 90,
    sequenceOrder: 5, // Add sequenceOrder value
    localities: [
      { id: 9, name: 'Locality 9', pincode: '110009' },
      { id: 10, name: 'Locality 10', pincode: '110010' },
    ],
    city:"Delhi"
  },
];
