export interface RevenueReportManagement {
  month: string; // e.g., 'January', 'February'
  OpeningDue: number;
  RevenueAccruedBooked: number;
  DailyRevenueAsPerSales: number;
  ActualReceiptRozarpay: number;
  ReceiptGPAYBusiness: number;
  DirectInBank: number;
  EmployeeReceiptsTransferredToGpay: number;
  ClosingDue: number;
  PastDuesReceivedAsPerSales: number;
  PastDuesReceivedAsPerAccounts: number;
  OthersDue: number;
  ActiveAsOnDate: number;
  RenewalDueAsOnDate: number;
  InactiveAsOnDate: number;

}


export const RevenueReportManagementData: RevenueReportManagement = {
  month: 'January',
  OpeningDue: 5000,
  RevenueAccruedBooked: 100000,
  DailyRevenueAsPerSales: 4500,
  ActualReceiptRozarpay: 30000,
  ReceiptGPAYBusiness: 15000,
  DirectInBank: 20000,
  EmployeeReceiptsTransferredToGpay: 5000,
  ClosingDue: 4000,
  PastDuesReceivedAsPerSales: 1000,
  PastDuesReceivedAsPerAccounts: 1500,
  OthersDue: 2000,
  ActiveAsOnDate: 3000,
  RenewalDueAsOnDate: 500,
  InactiveAsOnDate: 100,
};
