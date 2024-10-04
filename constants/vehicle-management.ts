// Define the VehicleManagement interface
export interface VehicleManagement {
  sno: number;
  vehicleType?: string;
  classification: string;
  status: 'Active' | 'Inactive';
  sortOrder?: number;
}

// Sample data for the vehicle management system
export const VehicleManagementData: VehicleManagement[] = [
  {
    sno: 1,
    vehicleType: "EV1",
    classification: 'Self',
    status: 'Active',
    sortOrder: 1,
  },
  {
    sno: 2,
    vehicleType: "EV2",
    classification: 'Self',
    status: 'Inactive',
    sortOrder: 2,
  },
  {
    sno: 3,
    vehicleType: "Dipankar",
    classification: 'External',
    status: 'Active',
    sortOrder: 3,
  }
];
