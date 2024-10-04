import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProductType, createRosterType, createSeasonType, deleteProductType, deleteRosterType, deleteSeasonType } from '../actions/dropdownActions';
import { ProductType, RosterType, SeasonType } from '@/types/Dropdown'; // Adjust the import according to your project structure

interface ProductTypeState {
    loading: boolean;
    productTypes: ProductType[]; // Array to store product types
    rosters: RosterType[]; // Array to store roster types
    seasons: SeasonType[]; // Array to store roster types
    error: string | null;
}

const initialState: ProductTypeState = {
    loading: false,
    productTypes: [],
    seasons: [],
    rosters: [], // Initialize rosters array
    error: null,
};

const productTypeSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Product Type actions
        builder
            .addCase(createProductType.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createProductType.fulfilled, (state, action: PayloadAction<AxiosResponse<ProductType>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const newProductType = action.payload.data; // Extract the product type data from the response
                state.productTypes.push(newProductType); // Add the new product type to the productTypes array
            })
            .addCase(createProductType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteProductType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteProductType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted product type from the state array
                state.productTypes = state.productTypes.filter(productType => productType._id !== action.payload);
            })
            .addCase(deleteProductType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });

        // Roster actions
        builder
            .addCase(createRosterType.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createRosterType.fulfilled, (state, action: PayloadAction<AxiosResponse<RosterType>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const newRoster = action.payload.data; // Extract the roster data from the response
                state.rosters.push(newRoster); // Add the new roster to the rosters array
            })
            .addCase(createRosterType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteRosterType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteRosterType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted roster from the state array
                state.rosters = state.rosters.filter(roster => roster._id !== action.payload);
            })
            .addCase(deleteRosterType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });
            // Season actions
            builder
            .addCase(createSeasonType.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createSeasonType.fulfilled, (state, action: PayloadAction<AxiosResponse<SeasonType>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const season = action.payload.data; // Extract the roster data from the response
                state.seasons.push(season); // Add the new roster to the rosters array
            })
            .addCase(createSeasonType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteSeasonType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteSeasonType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted roster from the state array
                state.seasons = state.seasons.filter(season => season._id !== action.payload);
            })
            .addCase(deleteSeasonType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });
    },
});

// Export the reducer
export default productTypeSlice.reducer;