import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createCity, getAllCity, getCityById, updateCity, updateCityServiceableStatus } from '../actions/cityActions';
import { createZone, getAllZone, getZoneById, updateZone, updateZoneServiceableStatus } from '../actions/zoneActions';

interface ZoneState {
  loading: boolean;
  zones: any[];
  selectedZone: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalZones: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: ZoneState = {
  loading: false,
  zones: [],
  selectedZone: null,
  error: null,
  currentPage: 1,
  totalZones: 0,
  totalPages: 0,
};

const zoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createZone.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newZone = action.payload.data;
        state.zones.push(newZone);
        state.totalZones += 1; // Increment total products count
      })
      .addCase(createZone.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getZoneById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getZoneById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedZone = action.payload.data;
      })
      .addCase(getZoneById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllZone.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; zones: any[] }>>) => {
        state.loading = false;
        state.zones = action.payload.data.zones; // Directly set products from response
        state.totalZones = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllZone.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateZone.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedZone = action.payload.data; // Extract updated city data
        // Update the cities array
        state.zones = state.zones.map(zone =>
          zone._id === updatedZone._id ? updatedZone : zone
        );
        
        // Update selectedCity if it's the same as the updated city
        if (state.selectedZone && state.selectedZone._id === updatedZone._id) {
          state.selectedZone = updatedZone; // Corrected to use updatedCity
        }
      })
      .addCase(updateZone.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateZoneServiceableStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateZoneServiceableStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedZone = action.payload;
      
        state.zones = state.zones.map(c => 
          c._id === updatedZone?.data?._id 
            ? { ...c, Serviceable: updatedZone?.data?.Serviceable } // Only update the Status field
            : c
        );
      })
      .addCase(updateZoneServiceableStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = zoneSlice.actions; // Export the action

export default zoneSlice.reducer; // Export the reducer
