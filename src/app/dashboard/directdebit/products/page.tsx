import FilterPane from "@/components/Table/FilterPane";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="w-full h-full px-5 pt-4">
     <FilterPane />
      <div className="w-full h-[70vh] py-4">
        <ProductList />
      </div>
    </div>
  );
}
