import FilterPane from "@/components/Table/FilterPane";
import AccountList from "./components/AccountList";

export default function Accounts() {
  return (
    <div className="w-full h-full pt-4 px-5">
      <FilterPane />
      <div className="w-full h-[70vh] py-4">
        <AccountList />
      </div>
    </div>
  );
}
