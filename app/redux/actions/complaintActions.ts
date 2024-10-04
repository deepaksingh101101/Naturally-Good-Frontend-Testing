// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new complain type
export const createComplainType = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'complainType/create',
  async (complainTypeData, { rejectWithValue }) => {
    try {
      // Make API call to create a complain Type
      const response = await apiCall<any>('POST', '/complain/type', complainTypeData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create product');
    }
  }
);

// Action to get a product by ID
export const getComplainTypeById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'complainType/getById',
  async (complainTypeId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/complain/type/${complainTypeId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch product');
    }
  }
);

// Action to update an existing product
export const updateComplainType = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; complainTypeData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'complainType/update',
  async ({ id, complainTypeData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/complain/type/${id}`, complainTypeData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update complain Type');
    }
  }
);

// Action to get all products with pagination support
export const getAllComplainType = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; complainTypes: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'complainType/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/complain/types?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch products');
    }
  }
);


// Action to update the availability of a product
export const updateComplainTypeStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'complainType/status',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/complain/type/toggle${id}`, { Status: Status });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update product availability');
    }
  }
);