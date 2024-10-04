import { StaticImageData } from "next/image";
import image1 from '@/public/assets/offerr1.png';

// Define the Notification interface
export interface Notification {
  id: number;
  image: StaticImageData;
  heading: string;
  description: string;
  type: string;
  scheduleTime?: string;
  scheduleType?: string;
  notificationType?: string;
  frequency?: string;
  customers?: {
    label: string;
    value: string;
    phone: string;
  }[];
}

// Sample data for the notification system
export const NotificationData: Notification[] = [
  {
    id: 1,
    image: image1,
    heading: 'System Maintenance',
    description: 'The system will be down for maintenance on 24th March 2024 from 12:00 AM to 4:00 AM.',
    type: "System",
    scheduleType: "Global",
    scheduleTime: "12:30 AM",
    notificationType: "Automatic",
    frequency: "One Time",
    customers: []
  },
  {
    id: 2,
    image: image1,
    heading: 'New Feature Release',
    description: 'We are excited to announce a new feature in our platform. Check it out now!',
    type: "Feature",
    scheduleType: "Global",
    notificationType: "Manual",
    customers: []
  },
  {
    id: 4,
    image: image1,
    heading: 'Only For You',
    description: 'Special offer only for you, get discount up to 2000',
    type: "Offers",
    scheduleType: "Non Global",
    scheduleTime: "14:30 AM",
    notificationType: "Automatic",
    frequency: "Daily",
    customers: [
      { label: 'John Doe', value: '1', phone: '1234567890' },
      { label: 'Jane Smith', value: '2', phone: '0987654321' }
    ]
  },
  {
    id: 5,
    image: image1,
    heading: 'Security Alert',
    description: 'A security alert was triggered. Please verify your account activity.',
    type: "Alert",
    scheduleType: "Non Global",
    notificationType: "Manual",
    customers: [
      { label: 'John Doe', value: '1', phone: '1234567890' },
      { label: 'Jane Smith', value: '2', phone: '0987654321' }
    ]
  }
];
