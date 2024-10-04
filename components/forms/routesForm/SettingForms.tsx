'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Trash2Icon, EditIcon, PlusIcon, Edit, Plus } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Select from 'react-select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Controller } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/MultiSelect';

interface SectorLocality {
  name: string;
  serviced: boolean;
}

interface Zone {
  name: string;
  deliveryCost: number;
  deliverySequence: number;
  Serviced: boolean;
  sortOrder: number; // Add this property
  sectorLocality: SectorLocality[]; // Add this property
}

interface Route {
  name: string;
  taggedVehical: {
    name: string;
    classification: string;
  };
  zones: Zone[];
  isActive: boolean;
  activeDays: string[];
}

interface City {
  id: string;
  city: string;
  routes: Route[];
}

interface DataState {
  data: City[];
}


const initialData = [
  {
    id: uuidv4(),
    city: 'Gurgaon',
    routes: [
      {
        name: 'Route 99',
        taggedVehical: { name: "Dipankar", classification: "External" },
        zones: [
          {
            name: 'Central Gurgaon',
            Serviced: true,
            deliverySequence: 1,
            deliveryCost: 200,
            sortOrder: 1,
            sectorLocality: [
              { name: "Adarsh Nagar", serviced: true },
              { name: "Ashok Vihar", serviced: true }
            ]
          },
          {
            name: 'New Gurgaon',
            Serviced: true,
            deliverySequence: 2,
            deliveryCost: 300,
            sortOrder: 1,
            sectorLocality: [
              { name: "Adarsh Nagar", serviced: true },
              { name: "Ashok Vihar", serviced: true }
            ]
          },
          {
            name: 'Old Gurgaon',
            Serviced: true,
            deliverySequence: 3,
            deliveryCost: 250,
            sortOrder: 1,
            sectorLocality: [
              { name: "Adarsh Nagar", serviced: true },
              { name: "Ashok Vihar", serviced: true }
            ]
          }
        ],
        isActive: true,
        activeDays: ['Wednesday', "Thursday"]
      }
    ]
  },
  {
    id: uuidv4(),
    city: 'Delhi',
    routes: [
      {
        name: 'Route 100',
        taggedVehical: { name: "EV1", classification: "Self" },
        zones: [
          {
            name: 'North Delhi',
            Serviced: true,
            deliverySequence: 1,
            deliveryCost: 300,
            sortOrder: 1,
            sectorLocality: [
              { name: "AzadNagar", serviced: true },
              { name: "Lodhi Colony", serviced: true }
            ]
          },
        ],
        isActive: true,
        activeDays: ['WED', "SAT"]
      }
    ]
  },
  {
    id: uuidv4(),
    city: 'Noida',
    routes: [
      {
        name: 'Route 101',
        taggedVehical: { name: "EV2", classification: "Self" },
        zones: [
          {
            name: 'Greater Noida',
            Serviced: true,
            deliverySequence: 1,
            deliveryCost: 400,
            sortOrder: 1,
            sectorLocality: [
              { name: "Civil Lines", serviced: true },
              { name: "Ashok Vihar", serviced: true }
            ]
          }
        ],
        isActive: true,
        activeDays: ['WED', "SAT"]
      }
    ]
  }
];

const employees = [
  { value: 'deepak-singh', label: 'Deepak Singh - 1234567890', phoneNumber: '1234567890' },
  { value: 'kartik-singh', label: 'Kartik Singh - 0987654321', phoneNumber: '0987654321' },
  { value: 'arya-singh', label: 'Arya Singh - 1122334455', phoneNumber: '1122334455' }
];

export const RoutesForm: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [newCity, setNewCity] = useState('');
  const [newRoutes, setNewRoutes] = useState<{ [key: string]: { name: string; taggedVehical: string; classification: string } }>({});
  const [newzones, setNewzones] = useState<{ [key: string]: { name: string, deliveryCost: number, deliverySequence: number } }>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addRouteModalOpen, setAddRouteModalOpen] = useState(false);  // Added for new route modal
  const [addZoneModalOpen, setAddZoneModalOpen] = useState(false);  // Added for new route modal
  const [addLocalityModalOpen, setAddLocalityModalOpen] = useState(false);  // Added for new route modal
  const [selectedRoute, setSelectedRoute] = useState<{ cityId: string; routeName: string } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [editedRouteName, setEditedRouteName] = useState('');
  
  // States for the Add Route Modal
  const [newRouteName, setNewRouteName] = useState('');
  const [newZoneName, setNewZoneName] = useState('');
  const [newLocalityName, setNewLocalityName] = useState('');
  const [newTaggedVehicle, setNewTaggedVehicle] = useState('');
  const [newClassification, setNewClassification] = useState('');

  const handleAddCity = () => {
    if (newCity.trim()) {
      setData([...data, { id: uuidv4(), city: newCity.trim(), routes: [] }]);
      setNewCity('');
    }
  };

  interface Option {
    id: string;
    name: string;
  }
  
  const deliveryDaysOptions: Option[] = [
    { id: 'Monday', name: 'Monday' },
    { id: 'Tuesday', name: 'Tuesday' },
    { id: 'Wednesday', name: 'Wednesday' },
    { id: 'Thursday', name: 'Thursday' },
    { id: 'Friday', name: 'Friday' },
    { id: 'Saturday', name: 'Saturday' },
    { id: 'Sunday', name: 'Sunday' },
    // Add other options here
  ];

  const [newZoneDeliveryCost, setNewZoneDeliveryCost] = useState<number | "">(""); 
  const [newZoneDeliverySequence, setNewZoneDeliverySequence] = useState<number | "">("");const [newZoneServiced, setNewZoneServiced] = useState(true);

  
const handleAddZone = () => {
  if (selectedRoute && newZoneName.trim()) {
    const { cityId, routeName } = selectedRoute;
    const newZone: Zone = {
      name: newZoneName.trim(),
      deliveryCost: newZoneDeliveryCost || 100,
      deliverySequence: newZoneDeliverySequence || 1,
      Serviced: newZoneServiced,
      sortOrder: 0, // Add default values for missing properties
      sectorLocality: [] // Add default values for missing properties
    };

    setData(data.map(city =>
      city.id === cityId
        ? {
            ...city,
            routes: city.routes.map(route =>
              route.name === routeName
                ? {
                    ...route,
                    zones: [...route.zones, newZone]
                  }
                : route
            ),
          }
          : city
    ));
    
    setNewZoneName('');
    setNewZoneDeliveryCost(0);
    setNewZoneDeliverySequence(1);
    setNewZoneServiced(true);
    setAddZoneModalOpen(false);
  }
};

const handleLoacalityAdd = () => {
  if (selectedCity && selectedRoute && newLocalityName.trim()) {
    const { cityId, routeName } = selectedRoute;

    setData((prevData) => 
      prevData.map((city) =>
        city.id === cityId
          ? {
              ...city,
              routes: city.routes.map((route) =>
                route.name === routeName
                  ? {
                      ...route,
                      zones: route.zones.map((zone) => 
                        zone.name === selectedZone // Use selectedZone here
                          ? {
                              ...zone,
                              sectorLocality: [
                                ...zone.sectorLocality,
                                { name: newLocalityName.trim(), serviced: true },
                              ],
                            }
                          : zone
                      ),
                    }
                  : route
              ),
            }
          : city
      )
    );

    setNewLocalityName("");
    setAddLocalityModalOpen(false);
  } else {
    // Handle the case where selectedCity, selectedRoute, or newLocalityName is invalid
    console.error("Missing information or no selected zone");
    // You might want to display an error message to the user here
  }
};
const [selectedZone, setSelectedZone] = useState<string | null>(null);
const openAddLocalityModal = (cityId: string, routeName: string, zoneName: string) => {
  const city = data.find(city => city.id === cityId);
  const route = city?.routes.find(route => route.name === routeName);
  const zone = route?.zones.find(zone => zone.name === zoneName);

  if (zone) {
    setSelectedCity(cityId);
    setSelectedRoute({ cityId, routeName });
    setSelectedZone(zoneName); // Assuming you have a setSelectedZone state
    setNewLocalityName('');
    setAddLocalityModalOpen(true);
  }
};

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const openAddZoneModal = (cityId: string, routeName: string) => {
    const city = data.find(city => city.id === cityId);
    const route = city?.routes.find(route => route.name === routeName);
    
    if (route) {
      setSelectedCity(cityId);
      setSelectedRoute({ cityId, routeName });
      setNewZoneName('');
      setAddZoneModalOpen(true);
    }
  };
  

  const openAddRouteModal = (cityId: string) => {
    setSelectedRoute({ cityId, routeName: '' });
    setNewRouteName('');
    setNewTaggedVehicle('');
    setNewClassification('');
    setAddRouteModalOpen(true);
  };
  
  const handleAddRouteFromModal = () => {
    if (selectedRoute && selectedRoute.cityId && newRouteName.trim() && selectedVehicleType ) {
      const newRoute = {
        name: newRouteName.trim(),
        taggedVehical: {
          name: selectedVehicleType.label,
          classification: 'Self'
        },
        zones: [],
        isActive: true,
        activeDays:selectedDeliveryDays||[] // Initialize activeDays as needed
        
      };
  
      setData(data.map(city =>
        city.id === selectedRoute.cityId
          ? {
              ...city,
              routes: [...city.routes, newRoute]
            }
          : city
      ));
  
      // Reset modal state
      setNewRouteName('');
      setNewTaggedVehicle('');
      setNewClassification('');
      setAddRouteModalOpen(false);
    } else {
      console.log('Missing information or no selected route');
    }
  };
  
  
  

  const handleDeleteCity = (cityId: string) => {
    setData(data.filter(city => city.id !== cityId));
  };

  const handleDeleteRoute = (cityId: string, routeName: string) => {
    setData(data.map(city =>
      city.id === cityId
        ? { ...city, routes: city.routes.filter(route => route.name !== routeName) }
        : city
    ));
  };

  const handleDeleteZone = (cityId: string, routeName: string, zoneName: string) => {
    setData(data.map(city =>
      city.id === cityId
        ? {
          ...city,
          routes: city.routes.map(route =>
            route.name === routeName
              ? { ...route, zones: route.zones.filter(zone => zone.name !== zoneName) }
              : route
          ),
        }
        : city
    ));
  };

  const handleToggleRoute = (cityId: string, routeName: string) => {
    setData(data.map(city =>
      city.id === cityId
        ? {
          ...city,
          routes: city.routes.map(route =>
            route.name === routeName
              ? { ...route, isActive: !route.isActive }
              : route
          ),
        }
        : city
    ));
  };

  


  const vehicleTypes = [
    { value: 'ev1', label: 'Ev1' },
    { value: 'ev2', label: 'Ev2' },
    { value: 'dipankar', label: 'Dipankar' }
  ];

  const ClassificationTypes = [
    { value: 'external', label: 'External' },
    { value: 'self', label: 'Self' }
  ];
   // States for the Add Route Modal
   const [selectedVehicleType, setSelectedVehicleType] = useState<any>(null);
   const [selectedClassificationType, setSelectedClassificationType] = useState<any>(null);
   
   // States for CRUD vehicle types
   const [vehicleTypeModalOpen, setVehicleTypeModalOpen] = useState(false);
   const [classificationTypeModalOpen, setClassificationTypeModalOpen] = useState(false);
   const [newVehicleType, setNewVehicleType] = useState('');
   const [newClassificationType, setNewClassificationType] = useState('');
 
   const openEditModal = (cityId: string, routeName: string) => {
    const city = data.find(city => city.id === cityId);
    const route = city?.routes.find(route => route.name === routeName);
    
    setSelectedRoute({ cityId, routeName });
    
    const taggedVehicalName = route?.taggedVehical?.name || '';
    
    setSelectedEmployee(employees.find(emp => emp.label.includes(taggedVehicalName)));
    
    setEditedRouteName(route?.name || '');
    setEditModalOpen(true);
  };

  const handleSaveEditedEmployee = () => {
    if (selectedRoute && selectedEmployee) {
      setData(data.map(city =>
        city.id === selectedRoute.cityId
          ? {
            ...city,
            routes: city.routes.map(route =>
              route.name === selectedRoute.routeName
                ? { ...route, name: editedRouteName, taggedVehical: { name: selectedEmployee.label.split(' - ')[0], classification: route.taggedVehical.classification } }
                : route
            ),
          }
          : city
      ));
      setEditModalOpen(false);
    }
  };

  const handleAddVehicleType = () => {
    if (newVehicleType.trim()) {
      const newVehicle = { value: newVehicleType.trim().toLowerCase().replace(/\s+/g, '-'), label: newVehicleType.trim() };
      vehicleTypes.push(newVehicle);
      setVehicleTypeModalOpen(false);
      setNewVehicleType('');
    }
  };
  const handleAddClassificationType = () => {
    if (newClassificationType.trim()) {
      const newClassification = { value: newClassificationType.trim().toLowerCase().replace(/\s+/g, '-'), label: newClassificationType.trim() };
      ClassificationTypes.push(newClassification);
      setClassificationTypeModalOpen(false);
      setNewClassificationType('');
    }
  };

  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<string[]>([]);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Routes Settings"
          description="Manage Routes and Zones"
        />
      </div>
      <Separator />
      <div className="my-4 flex justify-between px-3  ">
  <Input
    value={newCity}
    onChange={(e) => setNewCity(e.target.value)}
    placeholder="Add new city"
    className="mr-2"
  />
  <Button className='min-w-32' onClick={handleAddCity}>Add City</Button>
</div>

<div style={{ border: '' }} className="">
    <Accordion type="single" collapsible>
      {data.map((city) => (
        <AccordionItem key={city.id} value={city.id}>
          <AccordionTrigger className="text-lg font-semibold bg-green-600  px-2 rounded-t-lg text-white ">
            {/* City Accordion Trigger content */}
            <div className="flex justify-between w-full">
              <span>{city.city}</span>
              <div className="flex">
                <span className="">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteCity(city.id)}
                    className="ml-auto"
                  >
                    <span> Delete City</span>
                    <Trash2Icon className="h-4 w-4 ms-2" />
                  </Button>
                </span>
                <Button size="sm" onClick={() => openAddRouteModal(city.id)} className="bg-blue-500 ms-2 text-white px-2 rounded hover:bg-blue-600">
                  <PlusIcon /> Add Route
                </Button>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="">
              <table className="w-full text-left table-auto border-collapse">
                {city.routes.map((route) => (
                  <>
                    <thead>
                      <tr className="bg-red-200  ">
                        {/* Route Details Header */}
                        <th className="p-2 border border-gray-300">Route Name</th>
                        <th className="p-2 border border-gray-300">Tagged Vehicle</th>
                        <th className="p-2 border border-gray-300">Days</th>
                        <th className="p-2 border border-gray-300 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={route.name} className="bg-white hover:bg-gray-100">
                        {/* Route Details */}
                        <td className="p-2 border border-gray-300">
                          <strong className="text-lg">{route.name}</strong>
                        </td>
                        <td className="p-2 border border-gray-300">
                          <em>
                            {route.taggedVehical.name} ({route.taggedVehical.classification})
                          </em>
                        </td>
                        <td className="p-2 border border-gray-300">
                          {route.activeDays.join(", ")}
                        </td>
                        <td className="p-2 border border-gray-300 flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-green-600 text-white rounded"
                            onClick={() => openAddZoneModal(city.id, route.name)}
                          >
                            Add Zone <PlusIcon className=" ms-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-yellow-500 text-white rounded"
                          >
                            Edit<EditIcon className=" ms-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 bg-red-600 text-white rounded"
                            onClick={() => handleDeleteRoute(city.id, route.name)}
                          >
                            Delete<Trash2Icon className=" ms-2 h-4 w-4" />
                          </Button>

                          <Switch
                            checked={route.isActive}
                            onCheckedChange={() => handleToggleRoute(city.id, route.name)}
                          />
                        </td>
                      </tr>

                      {/* Zones Section (Nested Accordions) */}
                      <tr>
                        <td colSpan={4}>
                          <Accordion type="multiple" className="">
                            {/* Zone Accordion content */}
                            {route.zones.map((zone) => (
                              <AccordionItem key={zone.name} value={zone.name}>
                                <AccordionTrigger className="bg-gray-100 p-2 border border-gray-300 relative">
                                  {/* Zone Details in Trigger (Table format with styling) */}
                                  <table className="w-full text-left table-auto border-collapse ">
                                    <tbody>
                                      <tr className="border-b">
                                        <td className="p-2 font-semibold border-r w-1/4">Zone Name:</td> 
                                        <td className="p-2">{zone.name}</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="p-2 font-semibold border-r w-1/4">Delivery Cost:</td>
                                        <td className="p-2">{zone.deliveryCost}</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="p-2 font-semibold border-r w-1/4">Delivery Sequence:</td>
                                        <td className="p-2">{zone.deliverySequence}</td>
                                      </tr>
                                      <tr>
                                        <td className="p-2 font-semibold border-r w-1/4">Serviceable:</td>
                                        <td className="p-2">{zone.Serviced ? 'Yes' : 'No'}</td>
                                        
                                      </tr>
                                      
                                    </tbody>
                                    
                                  </table>
                                  <td className="p-2 text-center absolute top-0 end-0"> 
                                  <Button
    variant="outline"
    size="sm"
    className="border-gray-300 bg-green-500 hover:bg-green-600 hover:text-white text-white rounded"
    onClick={() => openAddLocalityModal(city.id, route.name, zone.name)}
  >
    Add Locality <PlusIcon className="ms-2 h-4 w-4" />
  </Button>
                                          <Button variant="outline" size="sm" className="border-gray-300 bg-yellow-500 hover:bg-yellow-600 hover:text-white text-white rounded mr-2">
                                            Edit <EditIcon className=" ms-2 h-4 w-4" />
                                          </Button>
                                          <Button variant="outline" size="sm" className="border-gray-300 bg-red-500 hover:bg-red-600 hover:text-white text-white rounded">
                                            Delete <Trash2Icon className="ms-2 h-4 w-4" />
                                          </Button>
                                        </td>
                                </AccordionTrigger>
                                <AccordionContent>
                                  {/* Societies/Localities Table */}
                                  <table className="w-full text-left table-auto border-collapse">
                                    <thead>
                                      <tr className="bg-gray-200">
                                        <th className="p-2 border border-gray-300">
                                          Society/Locality Name
                                        </th>
                                        <th className="p-2 border border-gray-300">
                                          Serviced
                                        </th>
                                        {/* Add more columns as needed */}
                                        <th className="p-2 border border-gray-300">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {zone.sectorLocality.map((society) => (
                                        <tr
                                          key={society.name}
                                          className="bg-white hover:bg-gray-100"
                                        >
                                          <td className="p-2 border border-gray-300">{society.name}</td>
                                          <td className="p-2 border border-gray-300">{society.serviced ? 'Yes' : 'No'}</td>
                                          {/* Add more cells as needed */}
                                          <td className="p-2 border border-gray-300">
                                            {/* Add action buttons here (edit, delete, etc.) */}
                                            <Button variant="outline" size="sm" className="border-gray-300 bg-yellow-500 hover:bg-yellow-600 hover:text-white text-white rounded">
                                              <EditIcon className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="border-gray-300 ms-2 bg-red-500 hover:bg-red-600 hover:text-white text-white rounded">
                                              <Trash2Icon className="h-4 w-4" />
                                            </Button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </td> 
                      </tr> 
                      </tbody>
                  </>
                ))}
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);




      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Route</DialogTitle>
            <DialogDescription>Edit the details of the route.</DialogDescription>
          </DialogHeader>
          <div className="my-2">
            <Input
              value={editedRouteName}
              onChange={(e) => setEditedRouteName(e.target.value)}
              placeholder="Route Name"
              className="mb-2"
            />
            <Select
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              options={employees}
            />
           
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEditedEmployee}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for routes adding route */}
      <Dialog open={addRouteModalOpen} onOpenChange={setAddRouteModalOpen}>
  <DialogContent className='max-w-lg' >
    <DialogHeader>
      <DialogTitle>Add New Route</DialogTitle>
      <DialogDescription>
        Add a new route for the selected city.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      <Input
        value={newRouteName}
        onChange={(e) => setNewRouteName(e.target.value)}
        placeholder="Route Name"
      />
      <div className="flex w-full">
      <Select
        options={vehicleTypes}
        value={selectedVehicleType}
        onChange={setSelectedVehicleType}
        placeholder="Select Vehicle Type"
        className='w-full'
      />
      </div>


      <MultiSelect
  value={selectedDeliveryDays}
  onChange={(value: string[]) => setSelectedDeliveryDays(value)}
  options={deliveryDaysOptions}
  placeholder="Select Delivery Days"
/>


      <Button
        type="button"
        onClick={handleAddRouteFromModal}
        className="bg-blue-500 text-white"
      >
        Add Route
      </Button>

    </div>
    
  </DialogContent>
</Dialog>


{/* Modal for Zone */}
<Dialog open={addZoneModalOpen} onOpenChange={setAddZoneModalOpen}>
  <DialogContent className='max-w-lg'>
    <DialogHeader>
      <DialogTitle>Add New Zone</DialogTitle>
      <DialogDescription>
        Add a new zone to the selected route.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
    <h3 className="text-lg font-semibold mt-4 mb-2">Add New Zone</h3>
      <Input
        value={newZoneName}
        onChange={(e) => setNewZoneName(e.target.value)}
        placeholder="Zone Name"
        className="mb-2"
      />
     <Input
    value={newZoneDeliveryCost || ""} // Display empty string if value is 0
    onChange={(e) => {
        const value = e.target.value;
        setNewZoneDeliveryCost(value ? Number(value) : ""); // Set to empty string if value is empty
    }}
    placeholder="Delivery Cost"
    type="number"
    className="mb-2"
/>
<Input
    value={newZoneDeliverySequence || ""}
    onChange={(e) => {
        const value = e.target.value;
        setNewZoneDeliverySequence(value ? Number(value) : "");
    }}
    placeholder="Delivery Sequence"
    type="number"
    className="mb-2"
/>
      <Button
        type="button"
        onClick={handleAddZone}
        className="bg-blue-500 text-white"
      >
        Add Zone
      </Button>
      
     
    </div>
    <DialogFooter>
      <Button onClick={() => setAddZoneModalOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



{/* Modal for Locality */}
<Dialog open={addLocalityModalOpen} onOpenChange={setAddLocalityModalOpen}>
  <DialogContent className='max-w-lg'>
    <DialogHeader>
      <DialogTitle>Add New Locality</DialogTitle>
      <DialogDescription>
        Add a new locality to the selected zone.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
    <h3 className="text-lg font-semibold mt-4 mb-2">Add New Locality</h3>
      <Input
        value={newLocalityName}
        onChange={(e) => setNewLocalityName(e.target.value)}
        placeholder="Society/Locality Name"
        className="mb-2"
      />
      <Button
        type="button"
        onClick={()=>handleLoacalityAdd()}
        className="bg-blue-500 text-white"
      >
        Add Locality
      </Button>
      
     
    </div>
    <DialogFooter>
      <Button onClick={() => setAddLocalityModalOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </>
    )};

export default RoutesForm;
