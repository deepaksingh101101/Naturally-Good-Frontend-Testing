import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new bag
export const createBag = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the bag data
  { rejectValue: any } // Reject value type
>(
  'bags/create',
  async (bagData, { rejectWithValue }) => {
    try {
      const response = await apiCall('POST', '/bag', bagData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to create bag');
    }
  }
);

// Action to get a bag by ID
export const getBagById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the bag ID as a string
  { rejectValue: any } // Reject value type
>(
  'bags/getById',
  async (bagId, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/bag/${bagId}`);
      console.log('API Response:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch bag');
    }
  }
);

// Action to update an existing bag
export const updateBag = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; bagData: any }, // Input type includes bag ID and data
  { rejectValue: any } // Reject value type
>(
  'bags/update',
  async ({ id, bagData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/bag/${id}`, bagData);
      console.log('API Response:', response); // Ensure this logs the full response
      return response; // Return the entire response
    } catch (error: any) {
      console.error('Failed to update bag:', error); // Log error for debugging
      return rejectWithValue(error || 'Failed to update bag');
    }
  }
);

// Action to delete a bag
export const deleteBag = createAsyncThunk<
  string, // Return type is the bag ID
  string, // Input type is the bag ID as a string
  { rejectValue: any } // Reject value type
>(
  'bags/delete',
  async (bagId, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/bag/${bagId}`);
      console.log('Bag deleted:', bagId);
      return bagId;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to delete bag');
    }
  }
);

// Action to get all bags with pagination support
export const getAllBags = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; bags: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'bags/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/bag/bags?page=${page}&limit=${limit}`);
      console.log('API Response for all bags:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch bags');
    }
  }
);

// Action to update the status of a bag
export const updateBagStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes bag ID and availability status
  { rejectValue: any } // Reject value type
>(
  'bags/updateStatus',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/bag/toggleStatus/${id}`, { Status: Status });
      console.log('API Response for updating status:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update bag status');
    }
  }
);