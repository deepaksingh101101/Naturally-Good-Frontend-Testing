// Define the City interface
export interface City {
  id: number;
  name: string;
  sortOrder?: number; // sortOrder is optional as it might not be provided for some cities
  routeCount?: number; // Number of routes in the city
  zoneCount?: number;  // Number of zones in the city
  sectorCount?: number; // Number of sectors in the city
}

// Sample data for the city management system
export const CityManagementData: City[] = [
  {
    id: 1,
    name: 'Gurgaon',
    sortOrder: 1,
    routeCount: 5,
    zoneCount: 10,
    sectorCount: 15
  },
  {
    id: 2,
    name: 'Delhi',
    sortOrder: 2,
    routeCount: 20,
    zoneCount: 25,
    sectorCount: 30
  },
  {
    id: 3,
    name: 'Noida',
    sortOrder: 3,
    routeCount: 7,
    zoneCount: 12,
    sectorCount: 18
  },
  {
    id: 4,
    name: 'Gaziabad',
    sortOrder: 4,
    routeCount: 6,
    zoneCount: 11,
    sectorCount: 14
  },
  {
    id: 5,
    name: 'Faridabad',
    sortOrder: 5,
    routeCount: 4,
    zoneCount: 8,
    sectorCount: 12
  },
  {
    id: 6,
    name: 'Bahadurgarh',
    // sortOrder, routeCount, zoneCount, and sectorCount can be omitted or set to default values if not provided
    routeCount: 3,
    zoneCount: 6,
    sectorCount: 9
  }
];
