'use client'

import Table from "@/components/Table";
import { formatCurrency } from "@/utils/common";

export default function Requests() {
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
    <div className="w-full h-[70vh] pt-4">
      <Table
        data={[]}
        header={header}
      />
    </div>
  );
}
