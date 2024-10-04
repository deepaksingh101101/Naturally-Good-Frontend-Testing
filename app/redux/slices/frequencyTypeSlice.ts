import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FrequencyType, SubscriptionType } from '@/types/Dropdown'; // Adjust the import according to your project structure
import { createFrequencyType, createSubscriptionType, deleteFrequencyType, deleteSubscriptionType } from '../actions/dropdownActions';
import { AxiosResponse } from 'axios';

interface FrequencyTypeState {
    loading: boolean;
    frequencyTypes: FrequencyType[]; // Array to store subscription types
    error: string | null;
}

const initialState: FrequencyTypeState = {
    loading: false,
    frequencyTypes: [],
    error: null,
};

const frequencyTypeSlice = createSlice({
    name: 'frequencyTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createFrequencyType.pending, (state) => {
            state.loading = true; // Set loading to true when the request is pending
        })
        .addCase(createFrequencyType.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
            state.loading = false; // Set loading to false when the request is fulfilled
            const newFrequencyType = action.payload.data; // Extract the product type data from the response
            state.frequencyTypes.push(newFrequencyType); // Add the new product type to the productTypes array
        })
        .addCase(createFrequencyType.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false; // Set loading to false on rejection
            state.error = action.payload; // Set the error message from the payload
        })
        builder
            .addCase(deleteFrequencyType.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteFrequencyType.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Log the action type
                state.frequencyTypes = state.frequencyTypes.filter(frequencyType => frequencyType._id !== action.payload);
            })
            .addCase(deleteFrequencyType.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });
    },
});

// Export the reducer
export default frequencyTypeSlice.reducer;