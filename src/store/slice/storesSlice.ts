import { IMerchantStore } from "@/utils/types/merchantStoreTypes";
import { createSlice } from "@reduxjs/toolkit";

interface StoreState {
  merchantStores: IMerchantStore[] | []
}

const initialState: StoreState = {
  merchantStores: [],
}

export const storesSlice = createSlice({
  name: "merchantStores",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.merchantStores = action.payload;
    },
  },
})

export const {
  addStore,
} = storesSlice.actions;

export default storesSlice.reducer;
