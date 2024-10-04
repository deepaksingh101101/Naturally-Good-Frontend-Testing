export interface DeliveryInfo {
  deliveryDate: string; // ISO format date string
  deliveryTimeSlot: string; // Example: '9am - 11am'
  assignedEmployee?: string;
  assignedRoutes?: string;
  deliveryStatus: 'Pending' | 'Delivered' | 'Cancelled'; // Delivery status options
  deliveryCharges?:number,
}

export interface OrderManagement {
  orderId: number;
  empId?: number;
  customerName: string;
  employeeName?: string;
  paymentType: string;
  deliveries: DeliveryInfo[];
  bagOrdered?: string[]; // Array of product names or IDs
  subscriptionType?: string; // Array of product names or IDs
  totalWeight: number; // Total weight in kg
  addons?: string[]; // Array of add-ons
  paymentStatus: 'Paid' | 'Unpaid' | 'Pending'; // Example: paid, unpaid, pending
  specialInstructions?: string; // Special delivery instructions
  totalPrice?: number; // Total price
  discount?: number; // Discount amount
  netPrice?: number; // Net price
  coupons?: string; // Coupon code
  bookingDate?: string; 
  paymentDate?: string; 
  amountReceived?:number;
  amountDue?:number;
  playOrPaused: 'Playing' | 'Paused' ; 
}

export const OrderManagementData: OrderManagement[] = [
  {
    orderId: 101,
    empId: 1022,
    customerName: "Deepak Singh",
    paymentType: 'Credit Card',
    bookingDate: "11/MAR/2024", 
    paymentDate: "11/MAR/2024",
    playOrPaused:"Playing",
    deliveries: [
      {
        deliveryDate: '2023-07-17',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Deepak Singh",
        assignedRoutes: "Route 1"
      },
      {
        deliveryDate: '2023-07-18',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Deepak Singh",
        assignedRoutes: "Route 1"
      },
      {
        deliveryDate: '2023-07-19',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Deepak Singh",
      },
      {
        deliveryDate: '2023-07-20',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Deepak Singh",
      },
    ],
    bagOrdered: ['Regular Veggie Bag'],
    subscriptionType: 'Regular Veggie Bag',
    totalWeight: 10000,
    totalPrice: 779,
    discount: 200,
    netPrice: 579,
    amountReceived:200,
    amountDue:500,
    addons: ['Lemons'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave the package at the front door.',
    coupons: 'TRYNEW200'
  },
  {
    orderId: 102,
    empId: 10332,
    customerName: "Kartik Kumar",
    playOrPaused:"Paused",

    paymentType: 'Net Banking',
    bookingDate: "11/MAR/2024", 
    paymentDate: "11/MAR/2024",
    deliveries: [
      {
        deliveryDate: '2023-07-20',
        deliveryTimeSlot: '1pm - 3pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Deepak Singh",
        assignedRoutes: "Route 1"
      }
    ],
    bagOrdered: ['Mini Veggie Bag'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 80000,
    totalPrice: 733,
    discount: 200,
    netPrice: 533,
    amountReceived:200,
    amountDue:500,
    addons: ['Lady Finger'],
    paymentStatus: 'Unpaid',
    specialInstructions: 'Call on arrival.',
    coupons: 'TRYNEW200'
  },
  {
    orderId: 103,
    empId: 1332,
    customerName: "Shivam Kumar",
    paymentType: 'UPI',
    playOrPaused:"Playing",

    bookingDate: "11/MAR/2024", 
    paymentDate: "11/MAR/2024",
    deliveries: [
      {
        deliveryDate: '2023-07-22',
        deliveryTimeSlot: '11am - 1pm',
        deliveryStatus: 'Cancelled',
        assignedEmployee: "Kartik Singh",
        assignedRoutes: "Route 1"
      }
    ],
    bagOrdered: ['Brinjal'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 50000,
    totalPrice: 567,
    discount: 200,
    netPrice: 367,
    amountReceived:200,
    amountDue:500,
    addons: [],
    paymentStatus: 'Unpaid',
    specialInstructions: 'Deliver to the back gate.',
    coupons: 'TRYNEW200'
  },
  {
    orderId: 104,
    empId: 1032,
    customerName: "Ridhi Mishra",
    paymentType: 'Net Banking',
    playOrPaused:"Playing",

    bookingDate: "11/MAR/2024", 
    paymentDate: "11/MAR/2024",
    deliveries: [
      {
        deliveryDate: '2023-07-25',
        deliveryTimeSlot: '2pm - 4pm',
        deliveryStatus: 'Pending',
        assignedEmployee: "Arya Singh",
        assignedRoutes: "Route 1"
      },
      {
        deliveryDate: '2023-07-25',
        deliveryTimeSlot: '2pm - 4pm',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Kumar",
        assignedRoutes: "Route 1"
      }
    ],
    bagOrdered: ['Regular Veggie Bag'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 50000,
    totalPrice: 986,
    discount: 200,
    netPrice: 786,
    amountReceived:200,
    amountDue:500,
    addons: ['Tomato', 'Potato'],
    paymentStatus: 'Paid',
    specialInstructions: 'Ring the bell twice.',
    coupons: 'TRYNEW200'
  },
  {
    orderId: 105,
    empId: 1022,
    customerName: "Arya Singh",
    playOrPaused:"Playing",

    subscriptionType: 'Mini Veggie Bag',
    paymentType: 'Credit Card',
    bookingDate: "11/MAR/2024", 
    paymentDate: "11/MAR/2024",
    deliveries: [
      {
        deliveryDate: '2023-07-27',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Rohit Singh",
        assignedRoutes: "Route 1"
      }
    ],
    bagOrdered: ['Regular Veggie Bag'],
    totalWeight: 70000,
    totalPrice: 999,
    discount: 200,
    netPrice: 799,
    addons: ['Carrots'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave with the neighbor if not home.',
    coupons: 'TRYNEW200'
  }
];
