// Define the Route interface
export interface VehicleTagged {
  id: number;
  vehicleName: string;
  driverName: string;
  phoneNumber: string;
}

export interface Route {
  id: number;
  routeName: string; // New field for route name
  city: string;
  status: string; // New field for status
  day: string[]; // New field for days
  vehicleTagged: VehicleTagged[]; // New field for vehicle tagged
  serviced: string; // 'Yes' or 'No'
}


// Sample data for routes
export const RouteData: Route[] = [
  {
    id: 1,
    routeName: 'Route A',
    city: 'City 1',
    status: 'Active',
    day: ['Monday', 'Wednesday'], // Array of days
    vehicleTagged: [
      { id: 1, vehicleName: 'Vehicle 1', driverName: 'Driver A', phoneNumber: '123-456-7890' },
      { id: 2, vehicleName: 'Vehicle 2', driverName: 'Driver B', phoneNumber: '234-567-8901' }
    ],
    serviced: 'Yes'
  },
  {
    id: 2,
    routeName: 'Route B',
    city: 'City 1',
    status: 'Inactive',
    day: ['Tuesday', 'Thursday'], // Array of days
    vehicleTagged: [
      { id: 3, vehicleName: 'Vehicle 3', driverName: 'Driver C', phoneNumber: '345-678-9012' }
    ],
    serviced: 'No'
  },
  {
    id: 3,
    routeName: 'Route C',
    city: 'City 2',
    status: 'Active',
    day: ['Wednesday', 'Friday'], // Array of days
    vehicleTagged: [
      { id: 4, vehicleName: 'Vehicle 4', driverName: 'Driver D', phoneNumber: '456-789-0123' },
      { id: 5, vehicleName: 'Vehicle 5', driverName: 'Driver E', phoneNumber: '567-890-1234' }
    ],
    serviced: 'Yes'
  },
  {
    id: 4,
    routeName: 'Route D',
    city: 'City 2',
    status: 'Inactive',
    day: ['Thursday', 'Saturday'], // Array of days
    vehicleTagged: [
      { id: 6, vehicleName: 'Vehicle 6', driverName: 'Driver F', phoneNumber: '678-901-2345' }
    ],
    serviced: 'No'
  },
  // Add more routes as needed
];
