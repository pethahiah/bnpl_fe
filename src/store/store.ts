import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import dashboardReducer from './slice/dashboardSlice';
import loaderReducer from './slice/loaderSlice';
import beneficiariesReducer from './slice/beneficiariesSlice';
import paymentsReducer from './slice/paymentsSlice';
import custodianReducer from './slice/custodianSlice';
import productReducer from './slice/productSlice';
import employeesReducer from './slice/employeesSlice';
import salaryPaymentReducer from './slice/salaryPaymentSlice'
import profileReducer from './slice/profileSlice';


export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    profile: profileReducer,

    // -----------------------

    beneficiaries: beneficiariesReducer,
    payments: paymentsReducer,
    custodians: custodianReducer,
    dashboard: dashboardReducer,
    products: productReducer,

    employees: employeesReducer,
    salaryPayment: salaryPaymentReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
