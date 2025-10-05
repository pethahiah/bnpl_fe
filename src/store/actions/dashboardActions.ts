import { toggleSideNav } from "@/store/slice/dashboardSlice";
import { appDispatch } from "@/store/store";
import { signOut } from "next-auth/react";


export const handleSideNavToggle = (state: any) => {
  appDispatch(toggleSideNav(state));
}