import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import dashboardReducer from './slice/dashboardSlice';
import loaderReducer from './slice/loaderSlice';
import storesReducer from './slice/storesSlice';
import bankAccountsReducer from './slice/bankAccountsSlice';
import profileReducer from './slice/profileSlice';
import adminReducer from './slice/adminSlice';


export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    profile: profileReducer,
    stores: storesReducer,
    bankAccounts: bankAccountsReducer,
    dashboard: dashboardReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
