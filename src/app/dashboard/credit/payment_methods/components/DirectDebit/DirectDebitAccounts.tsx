'use client'
import Table from "@/components/Table";
import { formatCurrency } from "@/utils/common";


export default function DirectDebitAccounts({items}: any) {
  const header = [
    // { field: 'institutionId', headerName: 'Institution Id'},
    { field: 'accountNumber', headerName: 'Account Number' },
    { field: 'accountName', headerName: 'Account Name' },
    { field: 'bankName', headerName: 'Bank Name' },
    { field: 'bankCode', headerName: 'Bank Code' },
    { field: 'balance', headerName: 'Balance', cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.balance })}</span>) },
    { field: 'displayName', headerName: 'Display name' },
    { field: 'accountStatus', headerName: 'Status' },
  ];


  return (
    <div className="accordion !w-full h-[65vh] text-left mt-6">
      <Table
        data={items as unknown as Record<string, string | number | boolean>[] || []}
        header={header}
        fitStrategy="fitCellContents"
      />
    </div>
  )
}
