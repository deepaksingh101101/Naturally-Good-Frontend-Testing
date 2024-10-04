// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createZone = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'zone/create',
  async (cityData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/route/zone', cityData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create zone');
    }
  }
);

// Action to get a product by ID
export const getZoneById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'zone/getById',
  async (zoneId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/route/zone/${zoneId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch Zone');
    }
  }
);

// Action to update an existing product
export const updateZone = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; zoneData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'zone/update',
  async ({ id,zoneData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/route/zone/${id}`, zoneData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update zone');
    }
  }
);

// Action to get all products with pagination support
export const getAllZone = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; zones: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'zone/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/route/zones?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch products');
    }
  }
);


// Action to update the availability of a product
export const updateZoneServiceableStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Serviceable: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'zone/serviceable',
  async ({ id, Serviceable }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/route/zone/toggle/${id}`, { Serviceable: Serviceable });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update city serviceable status');
    }
  }
);