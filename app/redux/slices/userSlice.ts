import { Employee } from '@/types/Employee';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../actions/employeeActions';
import { AxiosResponse } from 'axios';
import { createUser, getAllUsers, getUserById, toggleAccountStatus, updateUser } from '../actions/userActions';

interface UserState {
  loading: boolean;
  users: any[];
  selectedUser: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalUsers: number; // Track the total number of users
  totalPages: number; // Track the total number of pages
}

const initialState: UserState = {
  loading: false,
  users: [],
  selectedUser: null,
  error: null,
  currentPage: 1,
  totalUsers: 0,
  totalPages: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const newUser = action.payload.data;
        state.users.push(newUser);
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<AxiosResponse<Employee>>) => {
        state.loading = false;
        state.selectedUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
    //   .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; users: any[] }>>) => {
    //     state.loading = false;
    //     state.users = [...state.users, ...action.payload.data.users]; // Append new users to the existing ones
    //     state.totalUsers = action.payload.data.total; // Total users from the response
    //     state.currentPage = action.payload.data.currentPage; // Current page from response
    //     state.totalPages = action.payload.data.totalPages; // Total pages from response
    // })
    .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; users: any[] }>>) => {
      state.loading = false;
      state.users = action.payload.data.users; // Directly set employees from response
      state.totalUsers = action.payload.data.total; // Total employees from response
      state.currentPage = action.payload.data.currentPage; // Current page from response
      state.totalPages = action.payload.data.totalPages; // Total pages from response
    })
    
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

            .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        state.users = state.users.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.selectedUser = updatedUser;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(toggleAccountStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleAccountStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedUser = action.payload;

        state.users = state.users.map(user =>
          user._id === updatedUser?.data?._id ? updatedUser?.data : user
        );
      })
      .addCase(toggleAccountStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = userSlice.actions; // Export the action

export default userSlice.reducer;
