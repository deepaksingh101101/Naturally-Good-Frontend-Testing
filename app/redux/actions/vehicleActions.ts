// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createVehicle = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'vehicle/create',
  async (vehicleData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/route/vehicle', vehicleData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create vehicle');
    }
  }
);

// Action to get a product by ID
export const getVehicleById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'vehicle/getById',
  async (vehicleId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/route/vehicle/${vehicleId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch vehicle');
    }
  }
);

// Action to update an existing product
export const updateVehicle = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; vehicleData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'vehicle/update',
  async ({ id, vehicleData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/route/vehicle/${id}`, vehicleData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update vehicle');
    }
  }
);

// Action to get all vehicle with pagination support
export const getAllVehicle = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; vehicles: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'vehicle/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/route/vehicles?page=${page}&limit=${limit}`);
      return response; // Return the full response including vehicle and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch vehicle');
    }
  }
);


// Action to update the availability of a product
export const updateVehicleServiceableStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'vehicle/serviceable',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/route/vehicle/toggle/${id}`, { Status: Status });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update vehicle status');
    }
  }
);