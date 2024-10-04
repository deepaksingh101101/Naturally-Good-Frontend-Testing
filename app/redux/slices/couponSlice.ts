import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProduct, getAllProducts, getProductById, updateProduct, updateProductAvailability } from '../actions/productActions';
import { createCoupon, getAllCoupons, getCouponById, updateCoupon, updateCouponStatus } from '../actions/couponsActions';

interface CouponState {
  loading: boolean;
  coupons: any[];
  selectedCoupon: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalCoupons: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: CouponState = {
  loading: false,
  coupons: [],
  selectedCoupon: null,
  error: null,
  currentPage: 1,
  totalCoupons: 0,
  totalPages: 0,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newCoupon = action.payload.data;
        state.coupons.push(newCoupon);
        state.totalCoupons += 1; // Increment total products count
      })
      .addCase(createCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCouponById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedCoupon = action.payload.data;
      })
      .addCase(getCouponById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; coupons: any[] }>>) => {
        state.loading = false;
        state.coupons = action.payload.data.coupons; // Directly set products from response
        state.totalCoupons = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllCoupons.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedCoupon = action.payload.data;
        state.coupons = state.coupons.map(c =>
          c._id === updatedCoupon._id ? updateCoupon : c
        );
        if (state.selectedCoupon && state.selectedCoupon._id === updatedCoupon._id) {
          state.selectedCoupon = updateCoupon;
        }
      })
      .addCase(updateCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCouponStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCouponStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedCoupon = action.payload;
      
        state.coupons = state.coupons.map(c => 
          c._id === updatedCoupon?.data?._id 
            ? { ...c, Status: updatedCoupon?.data?.Status } // Only update the Status field
            : c
        );
      })
      
      .addCase(updateCouponStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = couponSlice.actions; // Export the action

export default couponSlice.reducer; // Export the reducer
