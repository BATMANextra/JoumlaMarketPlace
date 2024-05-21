import { configureStore } from '@reduxjs/toolkit';
import { loadersSlice } from './loadersSlice';
import { usersSlice } from './userSlice';
import { customerssSlice } from './customerSlice';

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: usersSlice.reducer,
    customer: customerssSlice.reducer,
  },
});

export default store;
