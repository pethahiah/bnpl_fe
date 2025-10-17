"use client"

import TabComponent from "@/components/TabComponent";
import MerchantStoresPage from "@/pages/merchant/Stores";
import { useState } from "react";
import AddStoreModal from "./components/AddStoreModal";
import { icons } from "@/assets";

export default function StoresPage() {
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);

  const navItems = [
    {
      name: "stores",
      path: `/dashboard/merchant/stores`,
      title: "Your Stores",
      action: [
        {
          label: "Add Store",
          icon: icons.createIcon,
          onClick: () => setShowAddStoreModal(true)
        },
      ]
    },
  ];
  return (
    <>
      <TabComponent navItems={navItems}>
        <MerchantStoresPage />
      </TabComponent>
      {
        showAddStoreModal && (
          <AddStoreModal
            open={showAddStoreModal}
            handleClose={() => setShowAddStoreModal(false)}
          />
        )
      }
    </>
  )
}