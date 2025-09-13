import FilterPane from "@/components/Table/FilterPane";
import WalletHistory from "./components/Wallet/WalletTransactionsHistory";

export default function Home() {
  return (
    <div className="w-full h-full px-5 pt-4">
      <FilterPane />
      <div className="w-full h-[70vj] py-4">
        <WalletHistory />
      </div>
    </div>
  );
}
