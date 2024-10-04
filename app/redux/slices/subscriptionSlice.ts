import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription, updateSubscriptionsStatus } from '../actions/subscriptionActions';

interface SubscriptionState {
  loading: boolean;
  subscriptions: any[];
  selectedSubscription: any | null;
  error: string | null;
  currentPage: number;
  totalSubscriptions: number;
  totalPages: number;
}

const initialState: SubscriptionState = {
  loading: false,
  subscriptions: [],
  selectedSubscription: null,
  error: null,
  currentPage: 1,
  totalSubscriptions: 0,
  totalPages: 0,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubscription.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newSubscription = action.payload.data;
        state.subscriptions.push(newSubscription);
        state.totalSubscriptions += 1;
      })
      .addCase(createSubscription.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSubscriptionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptionById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedSubscription = action.payload.data;
      })
      .addCase(getSubscriptionById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>>) => {
        state.loading = false;
        state.subscriptions = action.payload.data.subscriptions;
        state.totalSubscriptions = action.payload.data.total;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getAllSubscriptions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscription.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedSubscription = action.payload.data;
        state.subscriptions = state.subscriptions.map(subscription =>
          subscription._id === updatedSubscription._id ? updatedSubscription : subscription
        );
        if (state.selectedSubscription && state.selectedSubscription._id === updatedSubscription._id) {
          state.selectedSubscription = updatedSubscription;
        }
      })
      .addCase(updateSubscription.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubscriptionsStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriptionsStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const { _id, Status } = action.payload.data;

        // Update only the status of the subscription while keeping other details intact
        state.subscriptions = state.subscriptions.map(subscription =>
          subscription._id === _id ? { ...subscription, Status } : subscription
        );

        if (state.selectedSubscription && state.selectedSubscription._id === _id) {
          state.selectedSubscription = { ...state.selectedSubscription, Status };
        }
      })
      .addCase(updateSubscriptionsStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;