// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createSubscription = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'subscriptions/create',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/subscription', subscriptionData);
      console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create product');
    }
  }
);

// Action to get a product by ID
export const getSubscriptionById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'subscriptions/getById',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/subscription/${subscriptionId}`);
      console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch subscription');
    }
  }
);

// Action to update an existing product
export const updateSubscription = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; subscriptionData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'subscriptions/update',
  async ({ id, subscriptionData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/subscription/${id}`, subscriptionData);
      console.log('API Response:', response); // Log the response for debugging
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update subscription');
    }
  }
);


// Action to get all products with pagination support
export const getAllSubscriptions = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'subscriptions/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/subscription?page=${page}&limit=${limit}`);
      console.log('API Response for all products:', response); // Log the response for debugging
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch subscription');
    }
  }
);


// Action to update the status of a bag
export const updateSubscriptionsStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes bag ID and availability status
  { rejectValue: any } // Reject value type
>(
  'subscriptions/updateStatus',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/subscription/toggle/${id}`, { Status: Status });
      console.log('API Response for updating status:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update subscriptions status');
    }
  }
);