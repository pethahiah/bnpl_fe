import { IProfileDetails } from "@/utils/types/profileTypes";
import { createSlice } from "@reduxjs/toolkit";


interface IInitialState {
  profile: IProfileDetails | null
}

const initialState: IInitialState = {
  profile: null
}

export const profileSlice = createSlice({
  name: "ProductData",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
})

export const {
  saveProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
