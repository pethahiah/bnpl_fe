import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    updateLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
})

export const { updateLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
