// Define the Vehicle interface
export interface Vehicle {
  id: number;
  vehicleName: string;
  classification: string;
  sortOrder?: number; // sortOrder is optional as it might not be provided for some vehicles
  vehicleNumber: string; // Vehicle number
  driverName: string; // Driver name
  driverNumber: string; // Driver contact number
  vehicleModel: string; // Vehicle model
}

// Sample data for the vehicle management system
export const VehicleManagementData: Vehicle[] = [
  {
    id: 1,
    vehicleName: 'Truck 1',
    classification: 'Heavy',
    sortOrder: 1,
    vehicleNumber: 'HR55 AB1234',
    driverName: 'John Doe',
    driverNumber: '9876543210',
    vehicleModel: 'Tata 407'
  },
  {
    id: 2,
    vehicleName: 'Van 1',
    classification: 'Light',
    sortOrder: 2,
    vehicleNumber: 'DL10 XY5678',
    driverName: 'Jane Smith',
    driverNumber: '9876543211',
    vehicleModel: 'Maruti Omni'
  },
  {
    id: 3,
    vehicleName: 'Mini Truck 1',
    classification: 'Medium',
    sortOrder: 3,
    vehicleNumber: 'UP14 GH7890',
    driverName: 'Bob Johnson',
    driverNumber: '9876543212',
    vehicleModel: 'Mahindra Bolero'
  },
  {
    id: 4,
    vehicleName: 'Bike 1',
    classification: 'Two-Wheeler',
    sortOrder: 4,
    vehicleNumber: 'HR26 CD3456',
    driverName: 'Alice Williams',
    driverNumber: '9876543213',
    vehicleModel: 'Honda Activa'
  },
  {
    id: 5,
    vehicleName: 'Auto 1',
    classification: 'Three-Wheeler',
    sortOrder: 5,
    vehicleNumber: 'DL8C JK1122',
    driverName: 'Charlie Brown',
    driverNumber: '9876543214',
    vehicleModel: 'Bajaj RE'
  },
  {
    id: 6,
    vehicleName: 'Truck 2',
    classification: 'Heavy',
    vehicleNumber: 'HR55 XY5678',
    driverName: 'David Green',
    driverNumber: '9876543215',
    vehicleModel: 'Tata 709'
  }
];
