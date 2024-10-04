// src/app/redux/actions/productActions.ts
import apiCall from '@/lib/axios'; // Import your axios instance
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new product
export const createCoupon = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  any, // Input type is the product data
  { rejectValue: any } // Reject value type
>(
  'coupon/create',
  async (couponData, { rejectWithValue }) => {
    try {
      // Make API call to create a product
      const response = await apiCall<any>('POST', '/coupons', couponData);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to create coupon');
    }
  }
);

// Action to get a product by ID
export const getCouponById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'coupon/getById',
  async (couponId, { rejectWithValue }) => {
    try {
      // Make API call to get the product by ID
      const response = await apiCall('GET', `/coupons/${couponId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch coupon');
    }
  }
);

// Action to update an existing product
export const updateCoupon = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; couponData: any }, // Input type includes product ID and data
  { rejectValue: any } // Reject value type
>(
  'coupon/update',
  async ({ id, couponData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/coupons/${id}`, couponData);
      return response; // Return the full response
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update coupon');
    }
  }
);

// Action to delete a product
export const deleteCoupon = createAsyncThunk<
  string, // Return type is the product ID
  string, // Input type is the product ID as a string
  { rejectValue: any } // Reject value type
>(
  'coupon/delete',
  async (couponId, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/coupons/${couponId}`);
      return couponId; // Return the deleted product ID
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to delete product');
    }
  }
);

// Action to get all products with pagination support
export const getAllCoupons = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; coupons: any[] }>, // Return type
  { page: number; limit: number }, // Input type for pagination
  { rejectValue: any } // Reject value type
>(
  'coupon/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/coupons?page=${page}&limit=${limit}`);
      return response; // Return the full response including products and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch products');
    }
  }
);


// Action to update the availability of a product
export const updateCouponStatus = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  { id: string; Status: boolean }, // Input type includes product ID and availability status
  { rejectValue: any } // Reject value type
>(
  'coupon/status',
  async ({ id, Status }, { rejectWithValue }) => {
    try {
      // Make API call to update product availability
      const response = await apiCall<any>('PUT', `/coupons/toggle/${id}`, { Status: Status });
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to update product availability');
    }
  }
);