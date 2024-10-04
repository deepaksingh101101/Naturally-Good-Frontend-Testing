// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createProduct = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/product', productData);
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
export const getProductById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'products/getById',
  async (productId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/product/${productId}`);
      console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch product');
    }
  }
);

// Action to update an existing product
export const updateProduct = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; productData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/product/${id}`, productData);
      console.log('API Response:', response); // Log the response for debugging
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update product');
    }
  }
);

// Action to delete a product
export const deleteProduct = createAsyncThunk<
  string, // Return type is the product ID
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'products/delete',
  async (productId, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/admin/product/${productId}`);
      console.log('Product deleted:', productId); // Log the deleted product ID
      return productId; // Return the deleted product ID
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to delete product');
    }
  }
);

// Action to get all products with pagination support
export const getAllProducts = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; products: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'products/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/product?page=${page}&limit=${limit}`);
      console.log('API Response for all products:', response); // Log the response for debugging
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch products');
    }
  }
);


// Action to update the availability of a product
export const updateProductAvailability = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; available: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'products/updateAvailability',
  async ({ id, available }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/product//toggleAvailability/${id}`, { Available: available });
      console.log('API Response for updating availability:', response); // Log the response for debugging
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update product availability');
    }
  }
);