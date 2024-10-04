import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createProductType, createRosterType, createSeasonType, createSourceType, deleteProductType, deleteRosterType, deleteSeasonType, deleteSourceType } from '../actions/dropdownActions';
import { ProductType, RosterType, SeasonType } from '@/types/Dropdown'; // Adjust the import according to your project structure

interface SourceTypeState {
    loading: boolean;
    sourceTypes: any[]; // Array to store product types
    error: string | null;
}

const initialState: SourceTypeState = {
    loading: false,
    sourceTypes: [],
    error: null,
};

const sourceTypeSlice = createSlice({
    name: 'sourceTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Product Type actions
        builder
            .addCase(createSourceType.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createSourceType.fulfilled, (state, action: PayloadAction<AxiosResponse<ProductType>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const newsourceType = action.payload.data; // Extract the product type data from the response
                state.sourceTypes.push(newsourceType); // Add the new product type to the productTypes array
            })
            .addCase(createProductType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteSourceType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteSourceType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted product type from the state array
                state.sourceTypes = state.sourceTypes.filter(sourceType => sourceType._id !== action.payload);
            })
            .addCase(deleteSourceType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });

      
    },
});

// Export the reducer
export default sourceTypeSlice.reducer;