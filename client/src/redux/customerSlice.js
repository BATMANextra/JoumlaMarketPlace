import { createSlice } from '@reduxjs/toolkit';

export const customerssSlice = createSlice({
  name: 'customers',
  initialState: {
    customer: null,
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { setCustomer } = customerssSlice.actions;
