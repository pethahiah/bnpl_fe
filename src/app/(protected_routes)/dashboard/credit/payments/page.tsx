'use client'
import { OverViewCards } from "@/components/Overview/OverViewCards";
import Table from "@/components/Table";
import FilterPane from "@/components/Table/FilterPane";
import { formatCurrency } from "@/utils/common";

const cardsArr = [
  {
    label: "Available Balance",
    value: formatCurrency({ num: "242342", currencyDisplay: "code" }) as string,
    iconColor: "#F55F64",
    withBg: true,
  },
  {
    label: "Paythru Debits",
    value: formatCurrency({ num: "20", currencyDisplay: "code" }) as string,
    iconBg: "#FF8C00",
  },
  {
    label: "Settled Amount",
    value: formatCurrency({ num: "0", currencyDisplay: "code" }) as string,
    iconBg: "#4560ED",
  },
  {
    label: "Offline Collections",
    value: formatCurrency({ num: "0", currencyDisplay: "code" }) as string,
    iconBg: "#1DADEB",
  },
]

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
    <div className="w-full h-full  px-5 pt-4 flex flex-col gap-5">
      <OverViewCards cards={cardsArr} />
      <FilterPane />
      <div className="w-full h-[70vh]">
        <Table
          data={[]}
          header={header}
        />
      </div>
    </div>
  );
}
