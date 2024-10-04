import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllDeliveryByDate, getOrderDetailsInDelivery, updateDeliveryDetails } from '../actions/DeliveryActions'; // Ensure you have an action for updating delivery

interface DeliveryState {
  loading: boolean;
  deliverys: any[]; // This could be typed more strictly if you have a Delivery type
  selectedDelivery: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalDeliverys: number; // Track the total number of deliveries
  totalPages: number; // Track the total number of pages
  Details: any | null; // Store details of a specific delivery
}

const initialState: DeliveryState = {
  loading: false,
  deliverys: [],
  selectedDelivery: null,
  error: null,
  currentPage: 1,
  totalDeliverys: 0,
  totalPages: 0,
  Details: null,
};



const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
    setSelectedDelivery(state, action: PayloadAction<any | null>) {
      state.selectedDelivery = action.payload; // Update selectedDelivery in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeliveryByDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeliveryByDate.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; deliverys: any[] }>>) => {
        state.loading = false;
        state.deliverys = action.payload.data.deliverys; // Set deliveries from response
        state.totalDeliverys = action.payload.data.total; // Total deliveries from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllDeliveryByDate.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add case for updating delivery
.addCase(updateDeliveryDetails.pending, (state) => {
  state.loading = true; // Set loading to true while updating
})
.addCase(updateDeliveryDetails.fulfilled, (state, action: PayloadAction<any>) => {
  state.loading = false; // Set loading to false
  
  // Assuming action.payload contains updated delivery data
  const updatedDelivery = action.payload.data; // Assuming the updated delivery data is in action.payload.data

  // Update the deliverys array with the updated delivery
  const index = state.deliverys.findIndex(delivery => delivery.id === updatedDelivery.id); // Replace 'id' with your unique identifier
  if (index !== -1) {
    state.deliverys[index] = updatedDelivery; // Update the specific delivery in the state
  }
})
.addCase(updateDeliveryDetails.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false; // Set loading to false
  state.error = action.payload; // Set error message
})

.addCase(getOrderDetailsInDelivery.pending, (state) => {
  state.loading = true; // Set loading to true when the request is pending
})
.addCase(getOrderDetailsInDelivery.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
  state.loading = false; // Set loading to false when the request is fulfilled
  
  // Extract delivery details from the response payload
  const deliveryDetails = action.payload.data;
// Format the Addons, if they exist in the delivery details
  const formattedAddons = deliveryDetails?.delivery.Addons?.map((addon: any) => ({
    itemName: {
      value: addon.ProductId._id,      // Extract the Product ID
      label: addon.ProductId.ProductName // Extract the Product Name
    },
    requiredUnits: addon.RequiredUnits  // Extract the required units
  })) || []; // Fallback to an empty array if Addons do not exist

  // Store the delivery details in the state
  state.Details = {
    ...deliveryDetails,               // Spread the remaining delivery details
    Addons: formattedAddons,          // Replace Addons with the formatted version
  };
})
.addCase(getOrderDetailsInDelivery.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false; // Set loading to false if the request is rejected
  state.error = action.payload; // Store the error message in the state
});

  },
});

export const { setCurrentPage, setSelectedDelivery } = deliverySlice.actions; // Export actions
export default deliverySlice.reducer; // Export the reducer
