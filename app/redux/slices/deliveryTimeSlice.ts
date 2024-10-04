import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createDeliveryTimeSlot, deleteDeliveryTimeSlot } from '../actions/dropdownActions'; // Adjust the import according to your project structure

interface DeliveryTimeSlotState {
    loading: boolean;
    deliveryTimeSlots: any[]; // Array to store delivery time slots
    error: string | null;
}

const initialState: DeliveryTimeSlotState = {
    loading: false,
    deliveryTimeSlots: [],
    error: null,
};

const deliveryTimeSlice = createSlice({
    name: 'deliveryTimeSlots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Delivery Time Slot actions
        builder
            .addCase(createDeliveryTimeSlot.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
            })
            .addCase(createDeliveryTimeSlot.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                const newTimeSlot = action.payload.data; // Extract the delivery time slot data from the response
                state.deliveryTimeSlots.push(newTimeSlot); // Add the new delivery time slot to the deliveryTimeSlots array
            })
            .addCase(createDeliveryTimeSlot.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            })
            .addCase(deleteDeliveryTimeSlot.pending, (state) => {
                state.loading = true; // Set loading to true when the delete request is pending
            })
            .addCase(deleteDeliveryTimeSlot.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false; // Set loading to false when the delete request is fulfilled
                // Remove the deleted delivery time slot from the state array
                state.deliveryTimeSlots = state.deliveryTimeSlots.filter(timeSlot => timeSlot._id !== action.payload);
            })
            .addCase(deleteDeliveryTimeSlot.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload; // Set the error message from the payload
            });
    },
});

// Export the reducer
export default deliveryTimeSlice.reducer;
