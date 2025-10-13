import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import dashboardReducer from './slice/dashboardSlice';
import loaderReducer from './slice/loaderSlice';
import beneficiariesReducer from './slice/beneficiariesSlice';
import paymentsReducer from './slice/paymentsSlice';
import custodianReducer from './slice/custodianSlice';
import storesReducer from './slice/storesSlice';
import employeesReducer from './slice/employeesSlice';
import salaryPaymentReducer from './slice/salaryPaymentSlice'
import profileReducer from './slice/profileSlice';


export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    profile: profileReducer,
    stores: storesReducer,
    dashboard: dashboardReducer,


    // -----------------------

    beneficiaries: beneficiariesReducer,
    payments: paymentsReducer,
    custodians: custodianReducer,

    employees: employeesReducer,
    salaryPayment: salaryPaymentReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
