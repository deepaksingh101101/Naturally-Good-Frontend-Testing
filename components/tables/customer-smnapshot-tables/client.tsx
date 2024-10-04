'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { UserSnapshot, userSnapshotData } from '@/constants/user-snapshot-data';

export const CustomerSnapshotClient: React.FC = () => {
  const router = useRouter();
  const initialData: UserSnapshot[] = userSnapshotData;

  const [data, setData] = useState<UserSnapshot[]>(initialData);
  const [loading, setLoading] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll handler
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        loadMoreData();
      }
    }
  };

  const loadMoreData = () => {
    setLoading(true);
    // Simulate loading more data by duplicating the initial data
    setTimeout(() => {
      setData((prevData) => [...prevData, ...initialData]);
      setLoading(false);
    }, 1000); // Simulate a delay for loading data
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading]);

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title="Customer Snapshot Report"
          description="View Customer Snapshot report for the selected time period."
        />
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>
        </div>
      </div>
      <Separator />
      <div
        className="data-table-container"
        ref={scrollContainerRef}
        style={{ height: '420px', overflowY: 'auto' }}
      >
        <DataTable
          searchKeys={['customerName']}
          columns={columns}
          data={data}
          rowNo={51}
          onSearch={() => {}}
        />
        {loading && (
          <div className="flex justify-center py-4">
            <span>Loading more data...</span>
          </div>
        )}
      </div>

  
    </>
  );
};
