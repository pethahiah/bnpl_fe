import { IMerchantBankAccount } from "@/utils/types/merchantBankAccountTypes";
import { createSlice } from "@reduxjs/toolkit";

interface BankAccountState {
  mercantBankAccounts: IMerchantBankAccount[] | []
}

const initialState: BankAccountState = {
  mercantBankAccounts: [],
}

export const bankAccountsSlice = createSlice({
  name: "mercantBankAccounts",
  initialState,
  reducers: {
    addBankAccount: (state, action) => {
      state.mercantBankAccounts = action.payload;
    },
  },
})

export const {
  addBankAccount,
} = bankAccountsSlice.actions;

export default bankAccountsSlice.reducer;
