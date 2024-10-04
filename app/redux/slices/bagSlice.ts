import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createBag, getAllBags, getBagById, updateBag, deleteBag, updateBagStatus } from '../actions/bagActions';

interface BagState {
  loading: boolean;
  bags: any[];
  selectedBag: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalBags: number; // Track the total number of bags
  totalPages: number; // Track the total number of pages
}

const initialState: BagState = {
  loading: false,
  bags: [],
  selectedBag: null,
  error: null,
  currentPage: 1,
  totalBags: 0,
  totalPages: 0,
};

const bagSlice = createSlice({
  name: 'bags',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBag.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newBag = action.payload.data;
        state.bags.push(newBag);
        state.totalBags += 1;
      })
      .addCase(createBag.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBagById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBagById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedBag = action.payload.data;
      })
      .addCase(getBagById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBags.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBags.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; bags: any[] }>>) => {
        state.loading = false;
        state.bags = action.payload.data.bags;
        state.totalBags = action.payload.data.total;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getAllBags.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBag.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBag.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false; // Set loading to false
        const updatedBag = action.payload.data; // Access the data field correctly
      
        // Update the bags array
        state.bags = state.bags.map(bag => (bag._id === updatedBag._id ? updatedBag : bag));
      
        // Update selectedBag if it matches the updated bag
        if (state.selectedBag && state.selectedBag._id === updatedBag._id) {
          state.selectedBag = updatedBag; // Update selected bag
        }
      })
      .addCase(updateBag.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBag.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.bags = state.bags.filter(bag => bag._id !== action.payload);
        state.totalBags -= 1;
      })
      .addCase(deleteBag.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBagStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBagStatus.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedBag = action.payload.data; // This should now include full bag details with allowed items
      
        // Update the bags array with the full details of the updated bag
        state.bags = state.bags.map(bag =>
          bag._id === updatedBag._id ? { ...bag, Status: updatedBag.Status } : bag
        );
      
        // Update selectedBag if it matches the updated bag
        if (state.selectedBag && state.selectedBag._id === updatedBag._id) {
          state.selectedBag = { ...state.selectedBag, Status: updatedBag.Status };
        }
      })
      .addCase(updateBagStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = bagSlice.actions;

export default bagSlice.reducer;