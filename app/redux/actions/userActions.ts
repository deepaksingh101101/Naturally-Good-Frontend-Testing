// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';



// Action to create a new user/customer
export const createUser = createAsyncThunk<
  AxiosResponse<any>, // Change this to AxiosResponse<Employee>
  any,
  { rejectValue: any }
>(
  'user/create',
  async (userData, { rejectWithValue }) => {
    try {
      // Make API call to create an employee
      const response = await apiCall<any>('POST', '/admin/user', userData);
      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create employee');
    }
  }
);



// Action to get an user by ID
export const getUserById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the employee ID as a string
  { rejectValue: any } // Reject value type
>(
  'user/getById',
  async (userId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/user/${userId}`);
      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch employee');
    }
  }
);


// Action to update an existing user
export const updateUser = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; userData: any }, // Input type includes employee ID and data
  { rejectValue: any }
>(
  'user/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/admin/user/${id}`, userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update employee');
    }
  }
);
// Action to get all user with pagination support
export const getAllUsers = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; users: any[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'user/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/user?page=${page}&limit=${limit}`);
      return response; // Return full response including employees and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch employees');
    }
  }
);


// Action to update the availability of a product
export const toggleAccountStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; AccountStatus: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'user/updateAccountStatus',
  async ({ id, AccountStatus }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/admin/user/toggle/${id}`, { AccountStatus: AccountStatus });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update product availability');
    }
  }
);