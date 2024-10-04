import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createRoute, getAllRoute, getRouteById, updateRoute, updateRouteServiceableStatus } from '../actions/RouteActions';

interface RouteState {
  loading: boolean;
  routes: any[];
  selectedRoute: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalRoutes: number; // Track the total number of products
  totalPages: number; // Track the total number of pages
}

const initialState: RouteState = {
  loading: false,
  routes: [],
  selectedRoute: null,
  error: null,
  currentPage: 1,
  totalRoutes: 0,
  totalPages: 0,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRoute.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newRoute = action.payload.data;
        state.routes.push(newRoute);
        state.totalRoutes += 1; // Increment total products count
      })
      .addCase(createRoute.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRouteById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRouteById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedRoute = action.payload.data;
      })
      .addCase(getRouteById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRoute.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; routes: any[] }>>) => {
        state.loading = false;
        state.routes = action.payload.data.routes; // Directly set products from response
        state.totalRoutes = action.payload.data.total; // Total products from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllRoute.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoute.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedRoute = action.payload.data; // Extract updated city data
        // Update the cities array
        state.routes = state.routes.map(route =>
          route._id === updatedRoute._id ? updatedRoute : route
        );
        // Update selectedCity if it's the same as the updated city
        if (state.selectedRoute && state.selectedRoute._id === updatedRoute._id) {
          state.selectedRoute = updatedRoute; // Corrected to use updatedCity
        }
      })
      .addCase(updateRoute.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRouteServiceableStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRouteServiceableStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedRoute = action.payload;
        state.routes = state.routes.map(c => 
          c._id === updatedRoute?.data?._id 
            ? { ...c, Status: updatedRoute?.data?.Status } // Only update the Status field
            : c
        );
      })
      .addCase(updateRouteServiceableStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = routeSlice.actions; // Export the action

export default routeSlice.reducer; // Export the reducer
