import { createSlice } from '@reduxjs/toolkit'
import { logout } from './authSlice';


interface DashboardState {
  showNav: boolean;
}

const initialState: DashboardState = {
  showNav: true,
}

export const dashboardSlice = createSlice({
  name: 'dasboard',
  initialState,
  reducers: {
    toggleSideNav: (state, action) => {
      state.showNav = action.payload;
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
  toggleSideNav,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
