import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreDTO {
  documentId: 1,
  documentName: string,
  description: string,
  dateUploaded: string,
  documentStatus: 'UnderReview' | '',
  requiredFormat: string,
  uploadedFileName: string,
  remarks: string
}

interface StoreState {
  StoreData: StoreDTO[] | []
}

const initialState: StoreState = {
  StoreData: [],
}

export const storesSlice = createSlice({
  name: "StoreData",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.StoreData = action.payload;
    },
  },
})

export const {
  addStore,
} = storesSlice.actions;

export default storesSlice.reducer;
