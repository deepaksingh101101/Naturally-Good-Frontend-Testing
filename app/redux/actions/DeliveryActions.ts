// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { Employee } from '@/types/Employee';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new employee
export const createDelivery = createAsyncThunk<
  AxiosResponse<Employee>, // Change this to AxiosResponse<Employee>
  any,
  { rejectValue: any }
>(
  'deliverys/create',
  async (deliveryData, { rejectWithValue }) => {
    try {
      // Make API call to create an employee
      const response = await apiCall<any>('POST', '/delivery', deliveryData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create delivery');
    }
  }
);






// Action to update an existing employee
export const updateEmployee = createAsyncThunk<
  AxiosResponse<Employee>,
  { id: string; employeeData: Employee }, // Input type includes employee ID and data
  { rejectValue: any }
>(
  'employees/update',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<Employee>('PUT', `/admin/employee/${id}`, employeeData);
      console.log('API Response:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update employee');
    }
  }
);
// Action to get all employees with pagination support
// Update the action to include startDate and endDate in the request body
export const getAllDeliveryByDate = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; deliverys: any[] }>, // Return type
  { page: number; limit?: number; startDate?: Date; endDate?: Date }, // Input type
  { rejectValue: any }
>(
  'delivery/getAll',
  async ({ page, limit, startDate, endDate }, { rejectWithValue }) => {
    try {
      // Construct query parameters
      const queryParams = `?page=${page}&limit=${limit}`;
      
      // Construct request body
      const requestBody = {
        StartDate: startDate?.toISOString(), // Convert to ISO string
        EndDate: endDate?.toISOString() || undefined, // Convert to ISO string if endDate is defined
      };

      // Send POST request with query parameters and request body
      const response = await apiCall('POST', `/delivery/list${queryParams}`, requestBody);
      return response; // Return data including deliveries and pagination info
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch delivery');
    }
  }
);


// Get ORder details in Delivery bag modification
export const getOrderDetailsInDelivery = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  {DeliveryId: any }, // Input type as an object containing UserID and DeliveryDate
  { rejectValue: any } // Reject value type
>(
  'delivery/getDetails',
  async ({DeliveryId }, { rejectWithValue }) => { // Properly destructure parameters
    try {
      // Make API call to get the delivery details by UserID and DeliveryDate
      const response = await apiCall('GET', `/delivery?DeliveryId=${DeliveryId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch delivery details');
    }
  }
);


export const updateDeliveryDetails = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type for the delivery details to update
  { rejectValue: string } // Reject value type
>(
  'delivery/updateDetails',
  async ({ DeliveryId, ...updateData }, { rejectWithValue }) => { // Destructure DeliveryId and rest properties
    try {
      // Make API call to update the delivery details
      const response: AxiosResponse<any> = await apiCall('PUT', `/delivery/${DeliveryId}`, updateData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update delivery details'); // Return a string for reject value
    }
  }
);