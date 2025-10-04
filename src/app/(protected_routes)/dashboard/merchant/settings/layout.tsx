'use client'

import TabComponent from "@/components/TabComponent";
import { useGetBaseLink } from "@/hooks/useUserType";

export default function MerchantSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "profile",
      path: `${useGetBaseLink()}/settings/profile`,
      title: "Profile Update",
    },
    // {
    //   name: "bvn",
    //   path: `${useGetBaseLink()}/settings/bvn`,
    //   title: "BVN Verification",
    // },
  ];
  return (
    <>
      <TabComponent navItems={navItems}>
        {children}
      </TabComponent>
    </>
  );
}