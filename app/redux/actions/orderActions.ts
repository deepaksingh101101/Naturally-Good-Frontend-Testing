// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createOrder = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'order/create',
  async (orderData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/order', orderData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create order');
    }
  }
);

// Action to get a product by ID
export const getOrderById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'order/getById',
  async (orderId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/order/${orderId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch order');
    }
  }
);

// Action to update an existing product
export const updateOrder = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; orderData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'order/update',
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/order/${id}`, orderData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update order');
    }
  }
);


// Action to get all products with pagination support
export const getAllOrders = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; orders: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'order/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/order?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch orders');
    }
  }
);


// Action to update the availability of a product
export const updateOrderStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'order/status',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/order/toggle/${id}`, { Status: Status });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update order Status');
    }
  }
);