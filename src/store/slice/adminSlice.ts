import { ISettings } from "@/utils/types/settingsTypes";
import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  bnplSettings: ISettings[] | []
}

const initialState: AdminState = {
  bnplSettings: [],
}

export const adminSlice = createSlice({
  name: "bnplSettings",
  initialState,
  reducers: {
    addBNPLSettings: (state, action) => {
      state.bnplSettings = action.payload;
    },
  },
})

export const {
  addBNPLSettings,
} = adminSlice.actions;

export default adminSlice.reducer;
