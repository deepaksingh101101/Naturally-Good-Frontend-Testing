// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createLocality = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'locality/create',
  async (localityData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/route/locality', localityData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create locality');
    }
  }
);

// Action to get a product by ID
export const getLocalityById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'locality/getById',
  async (localityId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/route/locality/${localityId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch locality');
    }
  }
);

// Action to update an existing product
export const updateLocality = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; localityData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'locality/update',
  async ({ id,localityData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/route/locality/${id}`, localityData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update locality');
    }
  }
);

// Action to get all products with pagination support
export const getAllLocality = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; localitys: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'locality/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/route/localitys?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch locality');
    }
  }
);


// Action to update the availability of a product
export const updateLocalityServiceableStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Serviceable: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'locality/serviceable',
  async ({ id, Serviceable }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/route/locality/toggle/${id}`, { Serviceable: Serviceable });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update city serviceable status');
    }
  }
);