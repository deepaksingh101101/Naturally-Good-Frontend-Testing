import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProduct, getAllProducts, getProductById, updateProduct, updateProductAvailability } from '../actions/productActions';

interface ProductState {
  loading: boolean;
  products: any[];
  selectedProduct: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalProducts: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: ProductState = {
  loading: false,
  products: [],
  selectedProduct: null,
  error: null,
  currentPage: 1,
  totalProducts: 0,
  totalPages: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newProduct = action.payload.data;
        state.products.push(newProduct);
        state.totalProducts += 1; // Increment total products count
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(getProductById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; products: any[] }>>) => {
        state.loading = false;
        state.products = action.payload.data.products; // Directly set products from response
        state.totalProducts = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedProduct = action.payload.data;
        state.products = state.products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        if (state.selectedProduct && state.selectedProduct._id === updatedProduct._id) {
          state.selectedProduct = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAvailability.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedProduct = action.payload;

        state.products = state.products.map(product =>
          product._id === updatedProduct?.data?._id ? updatedProduct?.data : product
        );
      })
      .addCase(updateProductAvailability.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = productSlice.actions; // Export the action

export default productSlice.reducer; // Export the reducer
