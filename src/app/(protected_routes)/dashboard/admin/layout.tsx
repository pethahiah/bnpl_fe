'use client'

import { icons } from '@/assets';
import DashboardComponentWrapper from "@/components/DashboardComponentWrapper";
import SettingsSVG from "@/components/SVG/Settings";


const navItems = [
  {
    name: "admin",
    path: `/dashboard/admin`,
    title: "BNPL Settings",
    img: icons.home,
    icon: () => <SettingsSVG />,
    type: "link",
  },

];
export default function CuatomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardComponentWrapper navItems={navItems}>
      {children}
    </DashboardComponentWrapper>
  );
}
