import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createCity, getAllCity, getCityById, updateCity, updateCityServiceableStatus } from '../actions/cityActions';
import { createVehicle, getAllVehicle, getVehicleById, updateVehicle, updateVehicleServiceableStatus } from '../actions/vehicleActions';

interface VehicleState {
  loading: boolean;
  vehicles: any[];
  selectedVehicle: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalVehicle: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: VehicleState = {
  loading: false,
  vehicles: [],
  selectedVehicle: null,
  error: null,
  currentPage: 1,
  totalVehicle: 0,
  totalPages: 0,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVehicle.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newVehicle = action.payload.data;
        state.vehicles.push(newVehicle);
        state.totalVehicle += 1; // Increment total products count
      })
      .addCase(createVehicle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVehicleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicleById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedVehicle = action.payload.data;
      })
      .addCase(getVehicleById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVehicle.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; vehicles: any[] }>>) => {
        state.loading = false;
        state.vehicles = action.payload.data.vehicles; // Directly set products from response
        state.totalVehicle = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllVehicle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedVehicle = action.payload.data; // Extract updated city data
        
        // Update the cities array
        state.vehicles = state.vehicles.map(vehicle =>
          vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle
        );
        
        // Update selectedCity if it's the same as the updated city
        if (state.selectedVehicle && state.selectedVehicle._id === updatedVehicle._id) {
          state.selectedVehicle = updateVehicle; // Corrected to use updatedCity
        }
      })
      .addCase(updateVehicle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVehicleServiceableStatus.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action)
        const { _id, Status } = action.payload.data;

        // Update only the status of the subscription while keeping other details intact
        state.vehicles = state.vehicles.map(vehicle =>
          vehicle._id === _id ? { ...vehicle, Status } : vehicle
        );

        if (state.selectedVehicle && state.selectedVehicle._id === _id) {
          state.selectedVehicle = { ...state.selectedVehicle, Status };
        }
      })
      .addCase(updateVehicleServiceableStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = vehicleSlice.actions; // Export the action

export default vehicleSlice.reducer; // Export the reducer
