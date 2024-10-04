import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createCity, getAllCity, getCityById, updateCity, updateCityServiceableStatus } from '../actions/cityActions';

interface CityState {
  loading: boolean;
  citys: any[];
  selectedCity: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalCitys: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: CityState = {
  loading: false,
  citys: [],
  selectedCity: null,
  error: null,
  currentPage: 1,
  totalCitys: 0,
  totalPages: 0,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCity.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newCity = action.payload.data;
        state.citys.push(newCity);
        state.totalCitys += 1; // Increment total products count
      })
      .addCase(createCity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCityById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedCity = action.payload.data;
      })
      .addCase(getCityById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCity.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; citys: any[] }>>) => {
        state.loading = false;
        console.log(action.payload)
        state.citys = action.payload.data.citys; // Directly set products from response
        state.totalCitys = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllCity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCity.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedCity = action.payload.data; // Extract updated city data
        
        // Update the cities array
        state.citys = state.citys.map(city =>
          city._id === updatedCity._id ? updatedCity : city
        );
        
        // Update selectedCity if it's the same as the updated city
        if (state.selectedCity && state.selectedCity._id === updatedCity._id) {
          state.selectedCity = updatedCity; // Corrected to use updatedCity
        }
      })
      .addCase(updateCity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCityServiceableStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const { _id, Serviceable } = action.payload.data;

        // Update only the status of the subscription while keeping other details intact
        state.citys = state.citys.map(city =>
          city._id === _id ? { ...city, Serviceable } : city
        );

        if (state.selectedCity && state.selectedCity._id === _id) {
          state.selectedCity = { ...state.selectedCity, Serviceable };
        }
      })
      .addCase(updateCityServiceableStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = citySlice.actions; // Export the action

export default citySlice.reducer; // Export the reducer
