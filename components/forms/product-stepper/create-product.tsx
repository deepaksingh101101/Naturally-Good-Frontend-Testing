'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash, Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { createGroup, createPriority, createProductType, createRosterType, createSeasonType, deleteGroup, deletePriority, deleteProductType, deleteRosterType, deleteSeasonType, getAllGroup, getAllPriority, getAllProductType, getAllRosterType, getAllSeasonType } from '@/app/redux/actions/dropdownActions';
import { setLoading } from '@/app/redux/slices/authSlice';
import { ProductType } from '@/types/Dropdown';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { createProduct, updateProduct } from '@/app/redux/actions/productActions';

interface ProductFormType {
  initialData: any | null;
  isDisabled?:boolean;
}

const productFormSchema = z.object({
  ProductName: z.string().min(1, 'Product Name is required'),
  Description: z.string().min(1,'Description is required'),
  Notes: z.string().optional(),
  ImageURL: z.string().optional(),
  Visibility: z.string().min(1, 'Visibility is required'),
  // unitType: z.string().min(1, 'Unit Type is required'),
  MinimumUnits: z.number()
    .min(0, 'Minimum Quantity is required') // Allow minimum value of 0
    .int('Only whole numbers are allowed'), // Ensure it's an integer// Ensure it's an integer
MaximumUnits: z.number()
  .min(1, 'Maximum Quantity is required')
  .int('Only whole numbers are allowed'), // Ensure it's an integerAvailable: z.string().min(1, 'Please Enter availability'),
  Price: z.number().min(1, 'Product Price is required'),
  Type: z.string().min(1, 'Type is required'),
  Group: z.string().min(1, 'Group is required'),
  Season: z.string().min(1, 'Season is required'),
  UnitType: z.string().min(1, 'Unit Type is required'),
  Priority: z.string().min(1, 'Priority is required'),
  Roster: z.string().min(1, 'Roster is required'),
  VeggieNameInHindi: z.string().min(1, 'Veggie Name in Hindi is required'),
  UnitQuantity: z.number().positive('Unit Quantity must be greater than zero'),
  Buffer: z.number().positive('Buffer Percentage must be greater than zero'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const CreateProductForm: React.FC<ProductFormType> = ({ initialData,isDisabled }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [seasonModalOpen, setSeasonModalOpen] = useState(false);
  const [priorityModalOpen, setPriorityModalOpen] = useState(false);
  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const [deleteTypeModalOpen, setDeleteTypeModalOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<string | null>(null);
const [deleteRosterModalOpen, setDeleteRosterModalOpen] = useState(false);
const [rosterToDelete, setRosterToDelete] = useState<string | null>(null);
const [fetchedRosters, setFetchedRosters] = useState<any[]>([]);
const [deleteSeasonModalOpen, setDeleteSeasonModalOpen] = useState(false);
const [deletePriorityModalOpen, setDeletePriorityModalOpen] = useState(false);
const [seasonToDelete, setSeasonToDelete] = useState<string | null>(null);
const [priorityToDelete, setPriorityToDelete] = useState<string | null>(null);
const [groupToDelete, setGroupToDelete] = useState<string | null>(null);


const [groupModalOpen, setGroupModalOpen] = useState(false);
const [deleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);

  interface ProductTypeInterface {
    _id?: string;
    Name: string;
    SortOrder:number;
  }

  // Define the ProductTypeInterface with expected types
  interface SeasonType {
    _id: string;
    Name: string;
  }
  interface PriorityType {
    _id: string;
    Name: string;
  }
  interface GroupType {
    _id: string;
    Name: string;
  }

  const [fetchedProductType, setFetchedProductType] = useState<ProductTypeInterface[]>([]); // Specify the type here


  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  useEffect(() => {
    const fetchProductType = async () => {
    const productTypes=  await dispatch(getAllProductType());
    setFetchedProductType(productTypes.payload.data)
    };
    fetchProductType();
    dispatch(setLoading(false)); 

  }, []);

  // Fetch rosters in useEffect
useEffect(() => {
  const fetchRosters = async () => {
    const rosters = await dispatch(getAllRosterType());
    setFetchedRosters(rosters.payload.data);
  };
  fetchRosters();
  dispatch(setLoading(false));
}, []);

useEffect(() => {
  const fetchSeasons = async () => {
    dispatch(setLoading(true)); // Set loading state
      const response = await dispatch(getAllSeasonType());
      if (response.type === 'seasonType/getAll/fulfilled') {
        // Ensure the response payload is correctly typed
        const fetchedSeasons: SeasonType[] = response.payload.data;

        // Map the seasons to the desired format
        setSeasons(fetchedSeasons.map((season: SeasonType) => ({
          value: season._id, // Use the _id for the value
          label: season.Name // Use the Name for the label
        })));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to fetch seasons',
        });
      }
      dispatch(setLoading(false));
  };

  fetchSeasons(); // Call the fetch function
}, [dispatch]); // Include dispatch in the dependency array


useEffect(() => {
  const fetchPriority = async () => {
    dispatch(setLoading(true)); // Set loading state
      const response = await dispatch(getAllPriority());
      if (response.type === 'priority/getAll/fulfilled') {
        // Ensure the response payload is correctly typed
        const fetchedPrioritys: PriorityType[] = response.payload.data;

        // Map the seasons to the desired format
        setPriority(fetchedPrioritys.map((p: PriorityType) => ({
          value: p._id, // Use the _id for the value
          label: p.Name // Use the Name for the label
        })));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to fetch priority',
        });
      }
      dispatch(setLoading(false));
  };

  fetchPriority(); // Call the fetch function
}, [dispatch]); // Include dispatch in the dependency array


useEffect(() => {
  const fetchGroups = async () => {
    dispatch(setLoading(true)); // Set loading state
      const response = await dispatch(getAllGroup());
      if (response.type === 'group/getAll/fulfilled') {
        // Ensure the response payload is correctly typed
        const fetchedGroups: GroupType[] = response.payload.data;

        // Map the seasons to the desired format
        setGroups(fetchedGroups.map((p: GroupType) => ({
          value: p._id, // Use the _id for the value
          label: p.Name // Use the Name for the label
        })));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to fetch groups',
        });
      }
      dispatch(setLoading(false));
  };

  fetchGroups(); // Call the fetch function
}, [dispatch]); // Include dispatch in the dependency array


  const confirmDeleteType = async () => {
    if (typeToDelete) {
      await deleteType(typeToDelete);
      setDeleteTypeModalOpen(false); // Close the modal
    }
  };
  const confirmDeleteRoster = async () => {
    if (rosterToDelete) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(deleteRosterType(rosterToDelete)); // Dispatch the delete action
        if (response.type === 'rosterType/delete/fulfilled') {
          setFetchedRosters((prev) => prev.filter((roster) => roster._id !== rosterToDelete)); // Update the roster state
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Roster deleted!',
          });
          setRosterToDelete(null); // Clear the selected roster to delete
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete roster',
          });
        }
      } catch (error) {
      } finally {
        dispatch(setLoading(false));
        setDeleteRosterModalOpen(false); // Close the delete confirmation modal
      }
    }
  };

  const [types, setTypes] = useState([
    { value: 'Staples', label: 'Staples' },
    { value: 'Regular Veggie', label: 'Regular Veggie' },
    { value: 'Exotics Veggies', label: 'Exotics Veggies' },
    { value: 'Salads', label: 'Salads' },
    { value: 'Exotic Salads', label: 'Exotic Salads' },
    { value: 'Add Ons', label: 'Add Ons' },
  ]);


  const [seasons, setSeasons] = useState([
    { value: 'Summer', label: 'Summer' },
  ]);

  const [priority, setPriority] = useState([
    { value: 'Medium', label: 'Medium' },
  ]);
  const [groups, setGroups] = useState([
    { value: 'stapels', label: 'stapels' },
  ]);

  const [rosters, setRosters] = useState([
    { value: 'Mandatory', label: 'Mandatory' },
  ]);
  const [unitTypes, setUnitTypes] = useState([
    { value: 'grams', label: 'Grams' },
    { value: 'pieces', label: 'Pieces' },
  ]);

  const [newType, setNewType] = useState('');
const [sortOrderForType, setSortOrderForType] = useState(1); // Default sort order
const [sortOrderForRoster, setSortOrderForRoster] = useState(1); // Default sort order
  const [newSubtype, setNewSubtype] = useState('');
  const [newSeason, setNewSeason] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [newRoster, setNewRoster] = useState('');

  const title = (isDisabled && initialData) ? 'View Product' :(isDisabled===false && initialData)? 'Edit Product':"Create Product"
  const description=(isDisabled && initialData) ? 'Details of Employee' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;

  const toastMessage = initialData ? 'Item updated.' : 'Item created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues:initialData
    ? {
        ...initialData,
        Type: initialData?.Type?._id,  // Adjust to store ID
        Season: initialData?.Season?._id, // Adjust to store ID
        Roster: initialData?.Roster?._id, // Adjust to store ID
        Available: initialData?.Available ? 'true' : 'false',
      }
    : {
          ProductName: '',
          Description: '',
          Notes: '',
          ImageURL: 'https://as2.ftcdn.net/v2/jpg/07/51/48/59/1000_F_751485962_KRHodHm6qZVlHP6CEotajjBSLqImseez.webp',
          Visibility: 'Admin',
          MinimumUnits: undefined,
          MaximumUnits: undefined,
          Available: 'true',
          Price: undefined,
          Type: '',
          Group: '',
          Season: '',
          Roster:'',
          VeggieNameInHindi:'',
          UnitType:'grams',
          UnitQuantity:undefined,
          Buffer:undefined,
        },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = form;

  const selectedUnitType=watch('UnitType')

  const onSubmit = async (data:any) => {
    try {
      dispatch(setLoading(true)); // Set loading state
      if ((isDisabled===false && initialData)) {
        // Update existing product
        const response = await dispatch(updateProduct({ id: initialData._id, productData: data }));
        if (response.type === 'products/update/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: toastMessage, // 'Item updated.'
          });
          router.push('/product')
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to update product',
          });
        }
      } else {
        // Create new product
        const response = await dispatch(createProduct(data));
        if (response.type === 'products/create/fulfilled') {
          ToastAtTopRight.fire({
            icon: 'success',
            title: toastMessage, // 'Item created.'
          });
          form.reset(); // Clear all fields in the form only on successful creation 
          router.push('/product')

        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to create product',
          });
        }
      }
    } catch (error: any) {
      console.error('Submit Error:', error);
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'An error occurred while submitting the form',
      });
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const addType = async () => {
    if (newType.trim() && sortOrderForType >= 0) { // Ensure sort order is non-negative
        try {
            dispatch(setLoading(true));
            const response = await dispatch(createProductType({ Name: newType, SortOrder: sortOrderForType })); // Include SortOrder

            if (response.type === 'productType/create/fulfilled') {
                const newProductType: ProductTypeInterface = {
                    _id: response.payload.data._id, // Ensure this is a string
                    Name: newType,
                    SortOrder: sortOrderForType, // Use the specified sort order
                };
                setFetchedProductType((prev: ProductTypeInterface[]) => [...prev, newProductType]); // Ensure prev is of the correct type
                ToastAtTopRight.fire({
                    icon: 'success',
                    title: 'New product type created!',
                });
                setNewType(''); // Clear the input field
                setSortOrderForType(1); // Reset sort order to default
            } else {
                ToastAtTopRight.fire({
                    icon: 'error',
                    title: response.payload.message || 'Failed to add product type',
                });
            }
        } catch (error) {
            console.error('Error adding product type:', error);
        } finally {
            dispatch(setLoading(false));
        }
    }
};

const addRoster = async () => {
  if (newRoster.trim()&& sortOrderForRoster >= 0) {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(createRosterType({ Name: newRoster,SortOrder: sortOrderForRoster  }));

      if (response.type === 'rosterType/create/fulfilled') {
        setFetchedRosters((prev) => [...prev, response.payload.data]);
        ToastAtTopRight.fire({ icon: 'success', title: 'New roster created!' });
        setNewRoster('');
        setSortOrderForRoster(1);
      } else {
        // Handle error
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to add product type',
      });
      }
    } catch (error) {
      console.error('Error adding roster:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }
};
  
  


  const addSeason = async () => {
    if (newSeason.trim()) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(createSeasonType({ Name: newSeason }));
        if (response.type === 'seasonType/create/fulfilled') {
          setSeasons([...seasons, { value: response.payload.data._id, label: newSeason }]);
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Season added!',
          });
          setNewSeason(''); // Clear the input field
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add season',
          });
        }
      } catch (error) {
        console.error('Error adding season:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };


  const addPriority = async () => {
    if (newPriority.trim()) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(createPriority({ Name: newPriority }));
        if (response.type === 'priority/create/fulfilled') {
          setPriority([...priority, { value: response.payload.data._id, label: newPriority }]);
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Priority added!',
          });
          setNewPriority(''); // Clear the input field
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to add priority',
          });
        }
      } catch (error) {
        console.error('Error adding new priority:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const confirmDeletePriority = async () => {
    if (priorityToDelete) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(deletePriority(priorityToDelete));
        if (response.type === 'priority/delete/fulfilled') {
          setPriority(priority.filter(p => p.value !== priorityToDelete)); // Update the seasons state
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'priority deleted!',
          });
          setPriorityToDelete(null); // Clear the selected season to delete
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete priority',
          });
        }
      } catch (error) {
        console.error('Error deleting priority:', error);
      } finally {
        dispatch(setLoading(false));
        setDeletePriorityModalOpen(false); // Close the confirmation modal
      }
    }
  };

// Group

const addGroup = async () => {
  if (newGroup.trim()) {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(createGroup({ Name: newGroup }));
      if (response.type === 'group/create/fulfilled') {
        setGroups([...groups, { value: response.payload.data._id, label: newGroup }]);
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Group added!',
        });
        setNewGroup(''); // Clear the input field
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to add group',
        });
      }
    } catch (error) {
      console.error('Error adding new group:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }
};

const confirmDeleteGroup = async () => {
  if (groupToDelete) {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(deleteGroup(groupToDelete));
      if (response.type === 'group/delete/fulfilled') {
        setGroups(groups.filter(p => p.value !== groupToDelete)); // Update the seasons state
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'group deleted!',
        });
        setGroupToDelete(null); // Clear the selected season to delete
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: response.payload.message || 'Failed to delete group',
        });
      }
    } catch (error) {
      console.error('Error deleting priority:', error);
    } finally {
      dispatch(setLoading(false));
      setDeleteGroupModalOpen(false); // Close the confirmation modal
    }
  }
};

  const  deleteType = async (typeToDelete: string) => {
    if (typeToDelete) {
      const response=  await dispatch(deleteProductType(typeToDelete)); // Dispatch the delete action
      if (response.type === 'productType/delete/fulfilled') {
        setFetchedProductType((prev) => prev.filter(type => type._id !== typeToDelete));
         ToastAtTopRight.fire({
            icon: 'success',
            title: 'Product type deleted!',
        });
        setNewType(''); // Clear the input field
        setSortOrderForType(1); // Reset sort order to default
    } else {
        ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete product type',
        });
    }
    }
  };



  const confirmDeleteSeason = async () => {
    if (seasonToDelete) {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(deleteSeasonType(seasonToDelete));
        if (response.type === 'seasonType/delete/fulfilled') {
          setSeasons(seasons.filter(season => season.value !== seasonToDelete)); // Update the seasons state
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Season deleted!',
          });
          setSeasonToDelete(null); // Clear the selected season to delete
        } else {
          ToastAtTopRight.fire({
            icon: 'error',
            title: response.payload.message || 'Failed to delete season',
          });
        }
      } catch (error) {
        console.error('Error deleting season:', error);
      } finally {
        dispatch(setLoading(false));
        setDeleteSeasonModalOpen(false); // Close the confirmation modal
      }
    }
  };



  return (
    <>
    <Dialog open={deleteTypeModalOpen} onOpenChange={setDeleteTypeModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this product type? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteType} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteTypeModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
 <Dialog open={typeModalOpen} onOpenChange={setTypeModalOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Types</DialogTitle>
          <DialogDescription>Add or remove product types.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-row ">
            <Input
              placeholder="Type Name"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="mb-2 me-2 "
            />
            <Input
              placeholder="Sort Order"
              type="number" // Ensure this is a number input
              value={sortOrderForType}
              onChange={(e) => setSortOrderForType(Number(e.target.value))}
              className="mb-4 ms-2"
            />
            <Button className='ms-3' onClick={addType}>Add</Button>
          </div>
          <div className="space-y-2">
            {fetchedProductType?.map((type) => (
              <div key={type._id} className="flex justify-between items-center">
                <span className='w-full' >{type.Name}</span>
                <span className='w-full' >{type.SortOrder}</span> {/* Display Sort Order */}
                <Button 
  variant="destructive" 
  onClick={() => {
    if (type._id) { // Ensure _id is defined
      setTypeToDelete(type._id); // Set the type ID to delete
      setDeleteTypeModalOpen(true); // Open the confirmation modal
    }
  }}
>
  Delete
</Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
      <Dialog open={seasonModalOpen} onOpenChange={setSeasonModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Seasons</DialogTitle>
      <DialogDescription>Add or remove product seasons.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="New Season"
          value={newSeason}
          onChange={(e) => setNewSeason(e.target.value)}
        />
        <Button className="ms-2" onClick={addSeason}>Add</Button>
      </div>
      <div className="space-y-2">
        {seasons.map((season) => (
          <div key={season.value} className="flex justify-between items-center">
            <span>{season.label}</span>
            <Button variant="destructive" onClick={() => {
              setSeasonToDelete(season.value); // Set the season to delete
              setDeleteSeasonModalOpen(true); // Open the confirmation modal
            }}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

{/* Confirmation Modal for Deleting Season */}
<Dialog open={deleteSeasonModalOpen} onOpenChange={setDeleteSeasonModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this season? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteSeason} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteSeasonModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


{/* Priority */}
<Dialog open={priorityModalOpen} onOpenChange={setPriorityModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Priority</DialogTitle>
      <DialogDescription>Add or remove product Priority.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="New Priority"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        />
        <Button className="ms-2" onClick={addPriority}>Add</Button>
      </div>
      <div className="space-y-2">
        {priority.map((p) => (
          <div key={p.value} className="flex justify-between items-center">
            <span>{p.label}</span>
            <Button variant="destructive" onClick={() => {
              setPriorityToDelete(p.value); // Set the season to delete
              setDeletePriorityModalOpen(true); // Open the confirmation modal
            }}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

{/* Confirmation Modal for Deleting Season */}
<Dialog open={deletePriorityModalOpen} onOpenChange={setDeletePriorityModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this priority? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeletePriority} variant="destructive">Delete</Button>
      <Button onClick={() => setDeletePriorityModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



{/* Group modal */}
{/* Priority */}
<Dialog open={groupModalOpen} onOpenChange={setGroupModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Group</DialogTitle>
      <DialogDescription>Add or remove product Group.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="New Group"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
        />
        <Button className="ms-2" onClick={addGroup}>Add</Button>
      </div>
      <div className="space-y-2">
        {groups?.map((p) => (
          <div key={p.value} className="flex justify-between items-center">
            <span>{p.label}</span>
            <Button variant="destructive" onClick={() => {
              setGroupToDelete(p.value); // Set the season to delete
              setDeleteGroupModalOpen(true); // Open the confirmation modal
            }}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

{/* Confirmation Modal for Deleting Season */}
<Dialog open={deleteGroupModalOpen} onOpenChange={setDeleteGroupModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this group? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteGroup} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteGroupModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>




      <Dialog open={rosterModalOpen} onOpenChange={setRosterModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Manage Rosters</DialogTitle>
      <DialogDescription>Add or remove product rosters.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="New Roster"
          value={newRoster}
          onChange={(e) => setNewRoster(e.target.value)}
        />
        <Input
          placeholder="Sort Order"
          type="number"
          value={sortOrderForRoster}
          onChange={(e) => setSortOrderForRoster(Number(e.target.value))}
          className="ms-2"
        />
        <Button className="ms-3" onClick={addRoster}>Add</Button>
      </div>
      <div className="space-y-2">
        {fetchedRosters?.map((roster) => (
          <div key={roster._id} className="flex justify-between items-center">
            <span className='w-full' >{roster.Name}</span>
            <span className='w-full' >{roster.SortOrder}</span> {/* Display Sort Order */}
            <Button variant="destructive" onClick={() => {
              setRosterToDelete(roster._id);
              setDeleteRosterModalOpen(true);
            }}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

<Dialog open={deleteRosterModalOpen} onOpenChange={setDeleteRosterModalOpen}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this roster? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={confirmDeleteRoster} variant="destructive">Delete</Button>
      <Button onClick={() => setDeleteRosterModalOpen(false)}>Cancel</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >

          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">

            <FormField
              control={form.control}
              name="ProductName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isDisabled||loading}
                      placeholder="Enter Item Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
  control={form.control}
  name="Type"
  render={({ field }) => {
    const options: any[] = fetchedProductType?.map(type => ({
      value: type._id, // Assuming _id is guaranteed to be a string
      label: type.Name.trim(), // Trimmed label to avoid issues with spaces
    }));

    return (
      <FormItem>
        <div className="flex items-center">
          <FormLabel>Type</FormLabel>
{!(isDisabled && initialData) &&       <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setTypeModalOpen(true)} />
}        </div>
        <FormControl>
          <ReactSelect
            isSearchable
            options={options} // Use the newly defined options
            isDisabled={isDisabled||loading}
            onChange={(selected) => field.onChange(selected ? selected.value : '')} // Handle selection
            value={options?.find(option => option.value === field.value) ?? null} // Safely access selected value
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>
             <FormField
              control={form.control}
              name="Season"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Season</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setSeasonModalOpen(true)}/>
}                  </div>
                  <FormControl>
                    <ReactSelect
                      isSearchable
                      options={seasons}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={isDisabled||loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      value={seasons.find(option => option.value === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
              control={form.control}
              name="Priority"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Priority</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setPriorityModalOpen(true)}/>
}                  </div>
                  <FormControl>
                    <ReactSelect
                      isSearchable
                      options={priority}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={isDisabled||loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      value={priority.find(option => option.value === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
  control={form.control}
  name="Roster"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-center">
        <FormLabel>Roster</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setRosterModalOpen(true)} />
}      </div>
      <FormControl>
        <ReactSelect
          isSearchable
          options={fetchedRosters?.map((roster) => ({
            value: roster._id, // Use the unique identifier
            label: roster.Name, // Use the name for the label
          }))}
          isDisabled={isDisabled||loading}
          onChange={(selected) => field.onChange(selected ? selected.value : '')} // Handle selection
          value={fetchedRosters?.find((roster) => roster._id === field.value) ? {
            value: fetchedRosters?.find((roster) => roster._id === field.value)._id,
            label: fetchedRosters?.find((roster) => roster._id === field.value).Name,
          } : null} // Adjust value for the selected option
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* <FormField
              control={form.control}
              name="Group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isDisabled||loading}
                    placeholder="Enter Group"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

<FormField
              control={form.control}
              name="Group"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Group</FormLabel>
{!(isDisabled && initialData) &&  <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setGroupModalOpen(true)}/>
}                  </div>
                  <FormControl>
                    <ReactSelect
                      isSearchable
                      options={groups}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={isDisabled||loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      value={groups?.find(option => option.value === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="VeggieNameInHindi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veggie Name in Hindi</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isDisabled||loading}
                    placeholder="Enter Veggie Name in Hindi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="UnitType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Type</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Unit Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grams">Grams</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.UnitType?.message}</FormMessage>
                </FormItem>
              )}
            /> 

{(selectedUnitType==="grams" || selectedUnitType==="liter")&&<FormField
              control={form.control}
              name="UnitQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Quantity {selectedUnitType==='grams'?"(gms)":"(liter)"}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Unit Quantity"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}



{/* <FormField
              control={form.control}
              name="pieces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Quantity (piece)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Enter Piece "
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}









          


<FormField
  control={form.control}
  name="MinimumUnits"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Minimum Units</FormLabel>
      <FormControl>
        <Input
          type="number"
          disabled={isDisabled || loading}
          placeholder="Enter Minimum Units"
          // Allow 0 and ensure the field value is properly handled as a number
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === '' ? undefined : Number(value));
          }}
          value={field.value !== undefined ? field.value : ''} // Allow field.value to be 0
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            <FormField
              control={form.control}
              name="MaximumUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Units</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Maximum Unit "
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Item Price"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          
          <FormField
              control={form.control}
              name="Visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Visibility</FormLabel>
                  <FormControl>
                    <Select disabled={isDisabled||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.Visibility?.message}</FormMessage>
                </FormItem>
              )}
            />
           <FormField
  control={form.control}
  name="Available"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Item Availability</FormLabel>
      <FormControl>
        <Select
          disabled={isDisabled || loading}
          onValueChange={field.onChange} // Handle the value change as string
          value={field.value} // Ensure this is a string ('true' or 'false')
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage>{errors.Available?.message}</FormMessage>
    </FormItem>
  )}
/>


<FormField
              control={form.control}
              name="Buffer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buffer Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isDisabled||loading}
                      placeholder="Enter Buffer Units "
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={control}
              name="organic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organic/Inorganic</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organic/Inorganic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Organic">Organic</SelectItem>
                        <SelectItem value="Inorganic">Inorganic</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.available?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
           
            <Controller
              name="ImageURL"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      // disabled={form.formState.isSubmitting}
                      disabled={isDisabled||loading}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  {errors.ImageURL && <FormMessage>{errors.ImageURL.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
       
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isDisabled||loading}
                    rows={5}
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="Notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Notes</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isDisabled||loading}
                    rows={5}
                    placeholder="Enter any Extra notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

{
  isDisabled === true && initialData && (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Created By:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.CreatedBy?.FirstName} {initialData?.CreatedBy?.LastName}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
          {initialData?.CreatedBy?.PhoneNumber}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated By:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.UpdatedBy?.FirstName} {initialData?.UpdatedBy?.LastName}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
          {initialData?.UpdatedBy?.PhoneNumber}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Created At:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.CreatedAt} 
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated At:</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
          {initialData?.UpdatedAt} 
        </p>
      </div>
    </div>
  )
}

          {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Product':"Create Product"}     
            </Button>}
        </form>
      </Form>
     
    </>
  );
};
