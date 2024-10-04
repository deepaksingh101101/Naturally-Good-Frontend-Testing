import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createCustomerType, createProductType, createRosterType, createSeasonType, createSourceType, deleteCustomerTypeFromState, deleteProductType, deleteRosterType, deleteSeasonType, deleteSourceType } from '../actions/dropdownActions';
import { ProductType, RosterType, SeasonType } from '@/types/Dropdown'; // Adjust the import according to your project structure

interface CustomerTypeState {
    loading: boolean;
    customerTypes: any[]; // Array to store product types
    error: string | null;
}

const initialState: CustomerTypeState = {
    loading: false,
    customerTypes: [],
    error: null,
};

const customerTypeSlice = createSlice({
    name: 'customerTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Product Type actions
        builder
            .addCase(createCustomerType.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createCustomerType.fulfilled, (state, action: PayloadAction<AxiosResponse<ProductType>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const newCustomerType = action.payload.data; // Extract the product type data from the response
                state.customerTypes.push(newCustomerType); // Add the new product type to the productTypes array
            })
            .addCase(createCustomerType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteCustomerTypeFromState.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteCustomerTypeFromState.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted product type from the state array
                state.customerTypes = state.customerTypes.filter(customerType => customerType._id !== action.payload);
            })
            .addCase(deleteCustomerTypeFromState.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });

      
    },
});

// Export the reducer
export default customerTypeSlice.reducer;