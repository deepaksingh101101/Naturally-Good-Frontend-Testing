// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { Employee } from '@/types/Employee';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';



// Action to create a new employee
// Action to create a new employee
export const createEmployee = createAsyncThunk<
  AxiosResponse<Employee>, // Change this to AxiosResponse<Employee>
  Employee,
  { rejectValue: any }
>(
  'employees/create',
  async (employeeData, { rejectWithValue }) => {
    try {
      // Make API call to create an employee
      const response = await apiCall<Employee>('POST', '/admin/employee', employeeData);
      console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create employee');
    }
  }
);



// Action to get an employee by ID
export const getEmployeeById = createAsyncThunk<
  AxiosResponse<Employee>, // Return type is the entire Axios response
  string, // Input type is the employee ID as a string
  { rejectValue: any } // Reject value type
>(
  'employees/getById',
  async (employeeId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/employee/${employeeId}`);
      console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch employee');
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
// Action to get all employees with pagination support
export const getAllEmployees = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; employees: Employee[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'employees/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/employee?page=${page}&limit=${limit}`);
      console.log('API Response for all employees:', response);
      return response; // Return full response including employees and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch employees');
    }
  }
);