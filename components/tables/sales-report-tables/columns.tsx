import { SaleReportManagement, SaleReportManagementData } from '@/constants/sale-report-data'; // Adjust the import path as necessary
import { ColumnDef } from '@tanstack/react-table';

// Define the row type based on SaleReportManagement

// Define static columns for sales data
const salesColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'month',
    header: 'Month',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('month')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CumulativeActiveSubscribers',
    header: 'Cumulative Active Subscribers',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('CumulativeActiveSubscribers')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CumulativeInactiveSubscribers',
    header: 'Cumulative Inactive Subscribers',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('CumulativeInactiveSubscribers')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CumulativeRenewalDue',
    header: 'Cumulative Renewal Due',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('CumulativeRenewalDue')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'NewSubscriber',
    header: 'New Subscriber',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('NewSubscriber')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'SubscriberDropOut',
    header: 'Subscriber Drop Out',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('SubscriberDropOut')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CumulativeActiveAndRenewalDue',
    header: 'Cumulative Active & Renewal Due',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('CumulativeActiveAndRenewalDue')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'NewMonthOnMonth',
    header: 'New Month On Month',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('NewMonthOnMonth')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'UpgradesMonthOnMonth',
    header: 'Upgrades Month On Month',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('UpgradesMonthOnMonth')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'RenewalsMonthOnMonth',
    header: 'Renewals Month On Month',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('RenewalsMonthOnMonth')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'TotalBagsMonthOnMonth',
    header: 'Total Bags Month On Month',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('TotalBagsMonthOnMonth')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'BagsShippedAsPerOperations',
    header: 'Bags Shipped (Operations)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('BagsShippedAsPerOperations')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'BagsShippedAsPerSales',
    header: 'Bags Shipped (Sales)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('BagsShippedAsPerSales')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'IncrementInPercentage',
    header: 'Increment in %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('IncrementInPercentage')}%</span>
      </div>
    ),
  },
  {
    accessorKey: 'OperationsExcessShortDispatchDiffPercentage',
    header: 'Ops Excess/Short Dispatch Diff %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('OperationsExcessShortDispatchDiffPercentage')}%</span>
      </div>
    ),
  },
  {
    accessorKey: 'PreviousMonthBagsBookedVsCurrentMonthShipped',
    header: 'Prev Month Bags vs Current Shipped',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>{row.getValue('PreviousMonthBagsBookedVsCurrentMonthShipped')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'NewRevenueBookedMonthOnMonth',
    header: 'New Revenue Booked (Month on Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.NewRevenueBookedMonthOnMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'UpgradeRevenueBookedMonthOnMonth',
    header: 'Upgrade Revenue Booked (Month on Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.UpgradeRevenueBookedMonthOnMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'RenewalRevenueBookedMonthOnMonth',
    header: 'Renewal Revenue Booked (Month on Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.RenewalRevenueBookedMonthOnMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'NewRevenueIncreasePercentage',
    header: 'New Revenue Increase %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.NewRevenueIncreasePercentage.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'RenewalRevenueIncreasePercentage',
    header: 'Renewal Revenue Increase %',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.RenewalRevenueIncreasePercentage.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'RevenueBookedMonthOnMonthAccrued',
    header: 'Revenue Booked Month on Month (Accrued)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.RevenueBookedMonthOnMonthAccrued.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'EmiBags',
    header: 'EMI Bags',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.EmiBags.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'EmiRevenueBooked',
    header: 'EMI Revenue Booked',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.EmiRevenueBooked.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'AverageRevenuePerBag',
    header: 'Average Revenue Per Bag',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.AverageRevenuePerBag.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'TrialToSubscriptions',
    header: 'Trial to Subscriptions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.TrialToSubscriptions.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'CashFlowReceivedCurrentMonth',
    header: 'Cash Flow Received (Current Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.CashFlowReceivedCurrentMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'CashFlowReceivedPreviousMonth',
    header: 'Cash Flow Received (Previous Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.CashFlowReceivedPreviousMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'CashFlowReceivedVariance',
    header: 'Cash Flow Received Variance',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.CashFlowReceivedVariance.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'OutstandingCollectionAsOfCurrentMonth',
    header: 'Outstanding Collection (As of Current Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.OutstandingCollectionAsOfCurrentMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'OutstandingCollectionAsOfPreviousMonth',
    header: 'Outstanding Collection (As of Previous Month)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.OutstandingCollectionAsOfPreviousMonth.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'OutstandingCollectionVariance',
    header: 'Outstanding Collection Variance',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.OutstandingCollectionVariance.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'RevenueBookingsAccrued',
    header: 'Revenue Bookings (Accrued)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.RevenueBookingsAccrued.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'EmiBookingsAccrued',
    header: 'EMI Bookings (Accrued)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.EmiBookingsAccrued.toFixed(2)</span>
        </div>
    ),
  },
  {
    accessorKey: 'NewSubscriptionBookAccrued',
    header: 'New Subscription Book (Accrued)',
    cell: ({ row }) => (
      <div className="flex items-center justify-center p-2">
        <span>row.original.NewSubscriptionBookAccrued.toFixed(2)</span>
        </div>
    ),
  },
];

export default salesColumns;
