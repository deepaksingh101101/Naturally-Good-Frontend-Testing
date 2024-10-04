// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createRoute = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'route/create',
  async (routeData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/route/route', routeData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create route');
    }
  }
);

// Action to get a product by ID
export const getRouteById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'route/getById',
  async (routeId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/route/route/${routeId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch route');
    }
  }
);

// Action to update an existing product
export const updateRoute = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; routeData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'route/update',
  async ({ id,routeData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/route/route/${id}`, routeData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update route');
    }
  }
);

// Action to get all products with pagination support
export const getAllRoute = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; routes: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'route/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/route/routes?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch routes');
    }
  }
);


// Action to update the availability of a product
export const updateRouteServiceableStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'route/status',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/route/route/toggle/${id}`, { Status: Status });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update route status');
    }
  }
);