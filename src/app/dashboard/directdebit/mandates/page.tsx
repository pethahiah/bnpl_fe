'use client'
import Table from "@/components/Table";
import FilterPane from "@/components/Table/FilterPane";
import { formatCurrency } from "@/utils/common";

export default function Home() {
  const header = [
    { field: 'accountNumber', headerName: 'Request Date' },
    { field: 'accountName', headerName: 'Service Identifier' },
    { field: 'bankName', headerName: 'Product Name' },
    { field: 'bankCode', headerName: 'Request Code' },
    { field: 'balance', headerName: 'Recipient', cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.balance })}</span>) },
    { field: 'displayName', headerName: 'Amount' },
    { field: 'accountStatus', headerName: 'Link Status' },
  ];
  return (
    <div className="w-full h-full px-5 pt-4">
      <FilterPane />
      <div className="w-full h-[70vh]  py-4">
        <Table
          data={[]}
          header={header}
        />
      </div>
    </div>
  );
}
