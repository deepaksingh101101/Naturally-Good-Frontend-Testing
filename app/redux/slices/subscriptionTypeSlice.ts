import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionType } from '@/types/Dropdown'; // Adjust the import according to your project structure
import { createSubscriptionType, deleteSubscriptionType } from '../actions/dropdownActions';
import { AxiosResponse } from 'axios';

interface SubscriptionTypeState {
    loading: boolean;
    subscriptionTypes: SubscriptionType[]; // Array to store subscription types
    error: string | null;
}

const initialState: SubscriptionTypeState = {
    loading: false,
    subscriptionTypes: [],
    error: null,
};

const subscriptionTypeSlice = createSlice({
    name: 'subscriptionTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createSubscriptionType.pending, (state) => {
            state.loading = true; // Set loading to true when the request is pending
        })
        .addCase(createSubscriptionType.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
            state.loading = false; // Set loading to false when the request is fulfilled
            const newSubscriptionType = action.payload.data; // Extract the product type data from the response
            state.subscriptionTypes.push(newSubscriptionType); // Add the new product type to the productTypes array
        })
        .addCase(createSubscriptionType.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false; // Set loading to false on rejection
            state.error = action.payload; // Set the error message from the payload
        })
        builder
            .addCase(deleteSubscriptionType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteSubscriptionType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Log the action type
                state.subscriptionTypes = state.subscriptionTypes.filter(subscriptionType => subscriptionType._id !== action.payload);
            })
            .addCase(deleteSubscriptionType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });
    },
});

// Export the reducer
export default subscriptionTypeSlice.reducer;