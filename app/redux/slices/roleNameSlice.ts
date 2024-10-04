import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios'; // Import AxiosResponse
import { createRole } from '../actions/dropdownActions';
import { RoleName } from '@/types/Dropdown';

interface RoleState {
  loading: boolean;
  roles: RoleName[]; // Array to store role names
  error: string | null;
}

const initialState: RoleState = {
  loading: false,
  roles: [],
  error: null,
};

const roleNameSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRole.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<AxiosResponse<RoleName>>) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        const newRole = action.payload.data; // Extract the role data from the response
        state.roles.push(newRole); // Add the new role to the roles array
      })
      .addCase(createRole.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false; // Set loading to false on rejection
        state.error = action.payload; // Set the error message from the payload
      });
  },
});

// Export the reducer
export default roleNameSlice.reducer;