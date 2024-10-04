export interface SaleReportManagement {
  // Add fields for monthly data
  monthlyData: {
    month: string; // e.g., 'January', 'February'
    CumulativeActiveSubscribers: number;
    CumulativeInactiveSubscribers: number;
    CumulativeRenewalDue: number;
    NewSubscriber: number;
    SubscriberDropOut: number;
    CumulativeActiveAndRenewalDue: number;
    NewMonthOnMonth: number;
    UpgradesMonthOnMonth: number;
    RenewalsMonthOnMonth: number;
    TotalBagsMonthOnMonth: number;
    BagsShippedAsPerOperations: number;
    BagsShippedAsPerSales: number;
    IncrementInPercentage: number;
    OperationsExcessShortDispatchDiffPercentage: number;
    PreviousMonthBagsBookedVsCurrentMonthShipped: number;
    NewRevenueBookedMonthOnMonth: number;
    UpgradeRevenueBookedMonthOnMonth: number;
    RenewalRevenueBookedMonthOnMonth: number;
    NewRevenueIncreasePercentage: number;
    RenewalRevenueIncreasePercentage: number;
    RevenueBookedMonthOnMonthAccrued: number;
    // EmiBags: number;
    // EmiRevenueBooked: number;
    AverageRevenuePerBag: number;
    TrialToSubscriptions: number;
    CashFlowReceivedCurrentMonth: number;
    CashFlowDueCurrentMonth: number;
    CashFlowDifference: number;
    OpeningPastDue: number;
    ReceivedForPastDues: number;
    ActualReceived: number;
    CumulativePastDues: number;
    AdditionalDue: number;
    TotalAccrual: number;
    DiffCheck: number;
    AdditionalActive: number;
    AdditionalInactive: number;
    MonthlySubscriptionBreakup: number;
    AnnualSubscriptionBreakup: number;
    OtherSubscriptionBreakup: number;
    SalesBySalesTeam: number;
    SalesByCoupons: number;
    SalesByReferral: number;
  }[];
}


export const SaleReportManagementData: SaleReportManagement[] = [
  {
    // Monthly data example
    monthlyData: [
      {
        month: 'January',
        CumulativeActiveSubscribers: 5000,
        CumulativeInactiveSubscribers: 300,
        CumulativeRenewalDue: 1500,
        NewSubscriber: 200,
        SubscriberDropOut: 50,
        CumulativeActiveAndRenewalDue: 6500,
        NewMonthOnMonth: 150,
        UpgradesMonthOnMonth: 100,
        RenewalsMonthOnMonth: 80,
        TotalBagsMonthOnMonth: 330,
        BagsShippedAsPerOperations: 1200,
        BagsShippedAsPerSales: 1000,
        IncrementInPercentage: 20,
        OperationsExcessShortDispatchDiffPercentage: 20,
        PreviousMonthBagsBookedVsCurrentMonthShipped: 100,
        NewRevenueBookedMonthOnMonth: 50000,
        UpgradeRevenueBookedMonthOnMonth: 20000,
        RenewalRevenueBookedMonthOnMonth: 15000,
        NewRevenueIncreasePercentage: 10,
        RenewalRevenueIncreasePercentage: 5,
        RevenueBookedMonthOnMonthAccrued: 85000,
        // EmiBags: 50,
        // EmiRevenueBooked: 25000,
        AverageRevenuePerBag: 70,
        TrialToSubscriptions: 30,
        CashFlowReceivedCurrentMonth: 55000,
        CashFlowDueCurrentMonth: 50000,
        CashFlowDifference: 5000,
        OpeningPastDue: 2000,
        ReceivedForPastDues: 1500,
        ActualReceived: 58000,
        CumulativePastDues: 1500,
        AdditionalDue: 1000,
        TotalAccrual: 59000,
        DiffCheck: 1000,
        AdditionalActive: 100,
        AdditionalInactive: 20,
        MonthlySubscriptionBreakup: 4000,
        AnnualSubscriptionBreakup: 1000,
        OtherSubscriptionBreakup: 500,
        SalesBySalesTeam: 49333,
        SalesByCoupons: 37392,
        SalesByReferral: 327823,
      },
      // Add more monthly data objects as needed
    ],
  },
  // Add more data objects as needed
];
