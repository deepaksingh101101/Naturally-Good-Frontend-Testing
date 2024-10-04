import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createCity, getAllCity, getCityById, updateCity, updateCityServiceableStatus } from '../actions/cityActions';
import { createZone, getAllZone, getZoneById, updateZone, updateZoneServiceableStatus } from '../actions/zoneActions';
import { createLocality, getAllLocality, getLocalityById, updateLocality, updateLocalityServiceableStatus } from '../actions/localityActions';

interface LocalityState {
  loading: boolean;
  localitys: any[];
  selectedLocality: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalLocalitys: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: LocalityState = {
  loading: false,
  localitys: [],
  selectedLocality: null,
  error: null,
  currentPage: 1,
  totalLocalitys: 0,
  totalPages: 0,
};

const LocalitySlice = createSlice({
  name: 'locality',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLocality.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLocality.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newLocality = action.payload.data;
        state.localitys.push(newLocality);
        state.totalLocalitys += 1; // Increment total products count
      })
      .addCase(createLocality.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLocalityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLocalityById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedLocality = action.payload.data;
      })
      .addCase(getLocalityById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllLocality.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLocality.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; localitys: any[] }>>) => {
        state.loading = false;
        state.localitys = action.payload.data.localitys; // Directly set products from response
        state.totalLocalitys = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllLocality.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocality.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocality.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedLocality = action.payload.data; // Extract updated city data
        // Update the cities array
        state.localitys = state.localitys.map(c =>
          c._id === updatedLocality._id ? updatedLocality : c
        );
        
        // Update selectedCity if it's the same as the updated city
        if (state.selectedLocality && state.selectedLocality._id === updatedLocality._id) {
          state.selectedLocality = updatedLocality; // Corrected to use updatedCity
        }
      })
      .addCase(updateLocality.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocalityServiceableStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocalityServiceableStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedLocality = action.payload;
      
        state.localitys = state.localitys.map(c => 
          c._id === updatedLocality?.data?._id 
            ? { ...c, Serviceable: updatedLocality?.data?.Serviceable } // Only update the Status field
            : c
        );
      })
      .addCase(updateLocalityServiceableStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = LocalitySlice.actions; // Export the action

export default LocalitySlice.reducer; // Export the reducer
