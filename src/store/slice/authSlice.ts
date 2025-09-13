import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface User {
  email: string;
  name: string;
  usertype: string;
  address: string;
  country: string;
  email_verified_at: string;
  first_name: string;
  id: number
  image: string;
  last_name: string;
  phone: string;
  state: string;
  bvn: string;
  nimc: string;
  Profile: string;
  AllMenuAccess: boolean;
  role: string;
  PENS_SCOPE: 'pfa' | 'pfc' | 'others'
}



interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showVerificationPending: boolean;
  ledger: Record<string, number>;
  withdrawalSource: 'refundMe' | 'kontribute' | 'transaction' | '';
  withdrawalHistory: {
    refundme: null | Record<string, string>,
    kontribute: null | Record<string, string>,
    business: null | Record<string, string>,
  },
  bvnDetails: Record<string, any> | null;
  referrals: Record<string, any> | null;
  selectedProductObj: Record<string, string>
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  showVerificationPending: false,
  ledger: {},
  withdrawalSource: '',
  withdrawalHistory: {
    refundme: null,
    kontribute: null,
    business: null,
  },
  bvnDetails: null,
  referrals: null,
  selectedProductObj: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setShowVerificationPending: (state, action: PayloadAction<boolean>) => {
      state.showVerificationPending = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.showVerificationPending = false;
      state.ledger = {};
      state.bvnDetails = null;
      state.withdrawalHistory = {
        refundme: null,
        kontribute: null,
        business: null,
      }
    },
    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUserType: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.usertype = action.payload;
      }
    },
    updateLedger: (state, action: PayloadAction<Record<string, number>>) => {
      if (state.user) {
        state.ledger = action.payload;
      }
    },
    setWithdrawalSource: (state, action: PayloadAction<'refundMe' | 'kontribute' | 'transaction' | ''>) => {
      state.withdrawalSource = action.payload;
    },
    getWithdrawalHistory: (state, action) => {
      state.withdrawalHistory[action.payload.entity] = action.payload.data;
    },
    setBVNDetails: (state, action) => {
      state.bvnDetails = action.payload;
    },
    setRefferals: (state, action) => {
      state.referrals = action.payload;
    },
    setProduct: (state, action) => {
      state.selectedProductObj = action.payload;
    }
  },
})

export const {
  login,
  logout, 
  update,
  updateUserType,
  setShowVerificationPending,
  updateLedger,
  setWithdrawalSource,
  getWithdrawalHistory,
  setBVNDetails,
  setProduct
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
