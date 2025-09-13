import { createSlice } from '@reduxjs/toolkit'
import { logout } from './authSlice';

interface IPayments {
  charges: number;
  employerCode: string;
  paymentItems: Array<any>;
  period: string;
  scheduleId: string;
  totalAmount: number;
  totalEmployee: number;
  totalPfa: number;
  transactionDate: string;
}

interface DashboardState {
  payments: Array<IPayments> | []
}

const initialState: DashboardState = {
  payments: []
}

export const paymentsSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addPaymentHistory: (state, action) => {
      state.payments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state = {...initialState};
      return state;
    })
  }
})

export const {
  addPaymentHistory
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
