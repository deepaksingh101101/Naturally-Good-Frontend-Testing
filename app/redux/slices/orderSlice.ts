import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProduct, getAllProducts, getProductById, updateProduct, updateProductAvailability } from '../actions/productActions';
import { createOrder, getAllOrders, getOrderById, updateOrder, updateOrderStatus } from '../actions/orderActions';

interface OrderState {
  loading: boolean;
  orders: any[];
  selectedOrder: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalOrders: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: OrderState = {
  loading: false,
  orders: [],
  selectedOrder: null,
  error: null,
  currentPage: 1,
  totalOrders: 0,
  totalPages: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newOrder = action.payload.data;
        state.orders.push(newOrder);
        state.totalOrders += 1; // Increment total products count
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedOrder = action.payload.data;
      })
      .addCase(getOrderById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; orders: any[] }>>) => {
        state.loading = false;
        state.orders = action.payload.data.orders; // Directly set products from response
        state.totalOrders = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map(c =>
          c._id === updatedOrder._id ? updatedOrder : c
        );
        if (state.selectedOrder && state.selectedOrder._id === updatedOrder._id) {
          state.selectedOrder = updatedOrder;
        }
      })
      .addCase(updateOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedOrder = action.payload;
      
        state.orders = state.orders.map(c => 
          c._id === updatedOrder?.data?._id 
            ? { ...c, Status: updatedOrder?.data?.Status } // Only update the Status field
            : c
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = orderSlice.actions; // Export the action

export default orderSlice.reducer; // Export the reducer
