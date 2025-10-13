import TabComponent from "@/components/TabComponent";
import MerchantStoresPage from "@/pages/merchant/Stores";

export default function StoresPage() {
  const navItems = [
    {
      name: "stores",
      path: `/dashboard/merchant/stores`,
      title: "Stores",
    },
  ];
  return (
    <TabComponent navItems={navItems}>
      <MerchantStoresPage />
    </TabComponent>
  )
}