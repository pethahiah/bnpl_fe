import { createSlice } from "@reduxjs/toolkit";
import { IBeneficiary, IBneficiariesList } from "../../types";

interface DashboardState {
  beneficiariesList: Array<IBneficiariesList> | []
  beneficiaries: Array<IBeneficiary> | []
}

const initialState: DashboardState = {
  beneficiariesList: [],
  beneficiaries: []
}

export const beneficiariesSlice = createSlice({
  name: "Beneficiary",
  initialState,
  reducers: {
    addBeneficiariesList:(state, action)=>{
      state.beneficiariesList = action.payload;
    },
    addBeneficiareies: (state, action) => {
      state.beneficiaries = action.payload;
    },
  },
})

export const {
  addBeneficiariesList,
  addBeneficiareies
} = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
