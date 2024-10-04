'use client';

import { useState, useEffect } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash, Download, FileText, FileBarChart, Receipt, TimerIcon } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const BillSummary: React.FC = () => {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [vendor, setVendor] = useState('');
  const [status, setStatus] = useState('');
  const [report, setReport] = useState('Bill Summary');
  const [duration, setDuration] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [totalBills, setTotalBills] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [activeTab, setActiveTab] = useState('Summary');

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setStartMonth(currentMonth);
    setEndMonth(currentMonth);
  }, []);

  type TableData = {
    bill: string;
    date: string;
    customer: string;
    category: string;
    status: string;
    paidAmount: number;
    dueAmount: number;
    paymentDate: string;
    amount: number;
  };


  const handleSearch = () => {
    const startDate = new Date(startMonth);
    const endDate = new Date(endMonth);
    const calculatedDuration = `${startMonth} to ${endMonth}`;
    setDuration(calculatedDuration);

    const dummyData: TableData[] = [
      { bill: 'BILL001', date: '2023-01-01', customer: 'Customer 1', category: 'Supplies', status: 'Paid', paidAmount: 800, dueAmount: 200, paymentDate: '2023-01-05', amount: 1000 },
      { bill: 'BILL002', date: '2023-02-01', customer: 'Customer 2', category: 'Utilities', status: 'Unpaid', paidAmount: 0, dueAmount: 2000, paymentDate: '', amount: 2000 },
    ];

    setTableData(dummyData);

    const totalBills = dummyData.reduce((acc, item) => acc + item.amount, 0);
    const totalPaid = dummyData.reduce((acc, item) => acc + item.paidAmount, 0);
    const totalDue = totalBills - totalPaid;

    setTotalBills(totalBills);
    setTotalPaid(totalPaid);
    setTotalDue(totalDue);

    setShowSummary(true);
  };

  const handleDelete = () => {
    setStartMonth('');
    setEndMonth('');
    setVendor('');
    setStatus('');
    setDuration('');
    setShowSummary(false);
    setTableData([]);
    setTotalBills(0);
    setTotalPaid(0);
    setTotalDue(0);
  };

  const filteredTableData = tableData.filter((data) =>
    data.customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Bills',
        data: [0, 0.5, 0.8, 0.4, 1.2, 0.9, 0.3, 0.6, 0.4, 0.7, 0.9, 1.0],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
        fill: false,
      },
    ],
  };

  const graphOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#008000',
        },
      },
      title: {
        display: true,
        text: 'Bill Summary',
        color: '#008000',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#008000',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#008000',
        },
        grid: {
          display: false,
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="flex items-start justify-between p-6">
        <Heading
          title="Bill Summary"
          description="View and manage your bill summaries"
        />
        <div className="flex space-x-2">
          <Button variant="outline" className="flex text-white bg-blue-500 hover:bg-blue-700 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
            <FileText height={16} className="mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-blue-500"
          >
            <Download height={16} className="mr-2 mt-1 animate-bounce" />
            Download
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-auto p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <div>
              <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Start Month</label>
              <input
                type="month"
                id="startMonth"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-full"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-400">End Month</label>
              <input
                type="month"
                id="endMonth"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-full"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Vendor</label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <option value="" disabled>Select vendor</option>
                <option value="vendor1">Vendor 1</option>
                <option value="vendor2">Vendor 2</option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <option value="" disabled>Select status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="unpaid">Unpaid</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Button onClick={handleSearch} variant="outline" className="bg-green-500 text-white hover:bg-green-700 hover:text-white">
                  <Search height={16} className='mt-[2px]' />
                  Search
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="bg-red-500 text-white hover:bg-red-700">
                  <Trash height={16} />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {showSummary && (
            <>
              <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center gap-3">
                  <div className="col-span-2">
                    <p className="font-bold flex items-center "><FileBarChart height={16} /><span >Report:</span></p>
                    <p className='ms-1' >{report}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-bold flex"> <TimerIcon height={16} className='mt-1' /> <span>Duration:</span></p>
                    <p className='ms-1' >{duration}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3 mt-3">
                  <div>
                    <p className="font-bold flex"><Receipt className='mt-1' height={16}/><span>Total Bills:</span></p>
                    <p className='ms-1'>Rs {totalBills.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-bold flex"><Receipt height={16} className='mt-1' /><span>Total Paid:</span></p>
                    <p className='ms-1' >Rs {totalPaid.toFixed(2)}</p>
                  </div>
                  <div className='me-[60px]' >
                    <p className="font-bold  flex "><Receipt className='mt-1' height={16}/><span>Total Due:</span></p>
                    <p className='ms-1' >Rs {totalDue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setActiveTab('Summary')}
                    variant={activeTab === 'Summary' ? 'default' : 'outline'}
                    className={activeTab === 'Summary' ? 'bg-yellow-500 text-black hover:bg-yellow-500 ' : ''}
                  >
                    Summary
                  </Button>
                  <Button
                    onClick={() => setActiveTab('Bills')}
                    variant={activeTab === 'Bills' ? 'default' : 'outline'}
                    className={activeTab === 'Bills' ? 'bg-yellow-500 hover:bg-yellow-500 text-black' : ''}
                  >
                    Bills
                  </Button>
                </div>

                {activeTab === 'Summary' && (
                  <div className="mt-4">
                    <Line data={graphData} options={graphOptions} />
                  </div>
                )}

                {activeTab === 'Bills' && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300">
                          <th className="border-b p-2 text-center">BILL</th>
                          <th className="border-b p-2 text-center">DATE</th>
                          <th className="border-b p-2 text-center">CUSTOMER</th>
                          <th className="border-b p-2 text-center">CATEGORY</th>
                          <th className="border-b p-2 text-center">STATUS</th>
                          <th className="border-b p-2 text-center">PAID AMOUNT</th>
                          <th className="border-b p-2 text-center">DUE AMOUNT</th>
                          <th className="border-b p-2 text-center">PAYMENT DATE</th>
                          <th className="border-b p-2 text-center">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTableData.length > 0 ? (
                          filteredTableData.map((data, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} text-gray-900 dark:text-gray-300`}>
                              <td className="border-b p-2 text-center">{data.bill}</td>
                              <td className="border-b p-2 text-center">{data.date}</td>
                              <td className="border-b p-2 text-center">{data.customer}</td>
                              <td className="border-b p-2 text-center">{data.category}</td>
                              <td className="border-b p-2 text-center">{data.status}</td>
                              <td className="border-b p-2 text-center">{data.paidAmount}</td>
                              <td className="border-b p-2 text-center">{data.dueAmount}</td>
                              <td className="border-b p-2 text-center">{data.paymentDate}</td>
                              <td className="border-b p-2 text-center">{data.amount}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={9} className="p-4 text-center">No entries found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
