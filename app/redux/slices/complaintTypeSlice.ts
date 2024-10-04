import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProduct, getAllProducts, getProductById, updateProduct, updateProductAvailability } from '../actions/productActions';
import { createComplainType, getAllComplainType, getComplainTypeById, updateComplainType, updateComplainTypeStatus } from '../actions/complaintActions';

interface ComplainTypeState {
  loading: boolean;
  complainTypes: any[];
  selectedComplaint: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalComplaintTypes: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: ComplainTypeState = {
  loading: false,
  complainTypes: [],
  selectedComplaint: null,
  error: null,
  currentPage: 1,
  totalComplaintTypes: 0,
  totalPages: 0,
};

const complainTypeSlice = createSlice({
  name: 'complainType',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComplainType.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComplainType.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newComplainType = action.payload.data;
        state.complainTypes.push(newComplainType);
        state.totalComplaintTypes += 1; // Increment total products count
      })
      .addCase(createComplainType.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getComplainTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComplainTypeById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedComplaint = action.payload.data;
      })
      .addCase(getComplainTypeById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllComplainType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComplainType.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; complainTypes: any[] }>>) => {
        state.loading = false;
        console.log(action.payload)
        state.complainTypes = action.payload.data.complainTypes; // Directly set products from response
        state.totalComplaintTypes = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllComplainType.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComplainType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComplainType.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedComplainType = action.payload.data;
        state.complainTypes = state.complainTypes.map(complaintType =>
          complaintType._id === updatedComplainType._id ? updatedComplainType : complaintType
        );
        if (state.selectedComplaint && state.selectedComplaint._id === updatedComplainType._id) {
          state.selectedComplaint = updatedComplainType;
        }
      })
      .addCase(updateComplainType.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateComplainTypeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComplainTypeStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedComplainType = action.payload;

        state.complainTypes = state.complainTypes.map(complainType =>
          complainType._id === updatedComplainType?.data?._id ? updatedComplainType?.data : complainType
        );
      })
      .addCase(updateComplainTypeStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = complainTypeSlice.actions; // Export the action

export default complainTypeSlice.reducer; // Export the reducer
