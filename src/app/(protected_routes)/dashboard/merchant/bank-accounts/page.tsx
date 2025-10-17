"use client"

import { icons } from "@/assets";
import TabComponent from "@/components/TabComponent";
import MerchantBankAccountsPage from "@/pages/merchant/BankAccounts";
import AddBankAccountModal from "./components/AddBankAccountModal";
import { useState } from "react";

export default function BankAccountsPage() {
  const [showAddBankAccountModal, setShowAddBankAccountModal] = useState(false);

  const navItems = [
    {
      name: "bank-accounts",
      path: `/dashboard/merchant/bank-accounts`,
      title: "Your Bank Accounts",
      action: [
        {
          label: "Add account",
          icon: icons.createIcon,
          onClick: () => setShowAddBankAccountModal(true)
        },
      ]
    },
  ];
  return (
    <>
      <TabComponent navItems={navItems}>
        <MerchantBankAccountsPage />
      </TabComponent>
      {
        showAddBankAccountModal && (
          <AddBankAccountModal
            open={showAddBankAccountModal}
            handleClose={() => setShowAddBankAccountModal(false)}
          />
        )
      }
    </>
  )
}