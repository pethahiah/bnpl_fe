'use client'

import TabComponent from "@/components/TabComponent";

export default function MandateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "profile",
      path: `/dashboard/settings/profile`,
      title: "Profile Update",
    },
    {
      name: "bvn",
      path: `/dashboard/settings/bvn`,
      title: "BVN Verification",
    },
  ];
  return (
    <>
      <TabComponent navItems={navItems}>
        {children}
      </TabComponent>
    </>
  );
}