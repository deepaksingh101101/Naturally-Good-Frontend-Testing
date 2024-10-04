import { ColumnDef } from '@tanstack/react-table';
import { BagCellAction } from './cell-action';

interface AllowedItem {
  ProductName?: string;
  Price?: number;
  UnitQuantity?: number;
  UnitType?: string;
  MinimumUnits?: number;
  MaximumUnits?: number;
}

// Update your Bag type to include AllowedItems
interface Bag {
  BagName?: string;
  BagImageUrl?: string;
  AllowedItems?: AllowedItem[];
  BagMaxWeight?: number;
  BagVisibility?: string;
  Status?: boolean;
  BagDescription?: string;
}

export const columns: ColumnDef<Bag>[] = [
  {
    accessorKey: 'BagName',
    header: 'Bag Name',
    cell: ({ row }) => <span>{row?.original?.BagName ?? '-'}</span>,
  },
  {
    accessorKey: 'BagImageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img src={row?.original?.BagImageUrl ?? '/default-image.jpg'} alt={row?.original?.BagName ?? 'Bag Image'} width={50} height={50} />
      </div>
    ),
  },
  {
    accessorKey: 'AllowedItems',
    header: 'Bag Items',
    cell: ({ row }) => (
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className='bg-red-100'>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item Price (₹)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Quantity</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Minimum Units</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Maximum Units</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {row?.original?.AllowedItems?.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item?.ProductName ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item?.Price ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
  {(item?.UnitType === 'grams' || item?.UnitType === 'liter') 
    ? `${item?.UnitQuantity} ${item?.UnitType}` 
    : '-'}
</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item?.MinimumUnits ?? '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item?.MaximumUnits ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    accessorKey: 'BagMaxWeight',
    header: 'Bag Maximum Weight (gms)',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center'>{row?.original?.BagMaxWeight ?? '-'}</span>
      </div>
    ),
  },
 
  {
    accessorKey: 'BagVisibility',
    header: 'Visibility',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row?.original?.BagVisibility === 'Admin' ? 'bg-red-400' :
          row?.original?.BagVisibility === 'Public' ? 'bg-green-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black font-bold'>{row?.original?.BagVisibility ?? 'Unknown'}</span>
      </div>
    )
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row?.original?.Status ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        <span className='text-black font-bold'>
          {row?.original?.Status ? 'Active' : 'Inactive'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'BagDescription',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-start">
        {row?.original?.BagDescription?.split(' ').slice(0, 10).join(' ') ?? 'No description'}...
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <BagCellAction data={row?.original} />
  }
];