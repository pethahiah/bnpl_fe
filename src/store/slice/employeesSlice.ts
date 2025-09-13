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

export const employeesSlice = createSlice({
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
} = employeesSlice.actions;

export default employeesSlice.reducer;
