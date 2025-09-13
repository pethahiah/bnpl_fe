import { logout } from "@/store/slice/authSlice";
import { toggleSideNav } from "@/store/slice/dashboardSlice";
import { appDispatch } from "@/store/store";


export const handleSideNavToggle = (state: any) => {
  appDispatch(toggleSideNav(state));
}

export const handleLogout = (navigate?: any) => {
  appDispatch(logout());
  localStorage.removeItem('tazat');
  localStorage.clear();
  return 'Logged out Successful!';
}
