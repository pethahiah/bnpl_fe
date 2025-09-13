'use client'
import Table from "@/components/Table";
import { formatCurrency } from "@/utils/common";

export default function WalletTransactionsAccordion({ items }: any) {
  const header = [
    {
      field: 'credit',
      headerName: 'Credit',
      cellRenderer: ({ data }: any) => (formatCurrency({ num: data.credit }))
    },
    {
      field: 'debit',
      headerName: 'Debit',
      cellRenderer: ({ data }: any) => (formatCurrency({ num: data.debit }))
    },
    { field: 'reference', headerName: 'Reference' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'transactionDate', headerName: 'Transaction Date', cellRenderer: ({ data }: any) => data.transactionDate?.split('T')[0] },
    {
      field: 'currentBalance', headerName: 'Wallet Balance',
      cellRenderer: ({ data }: any) => (formatCurrency({ num: data.currentBalance }))
    },
  ];

  const mobileConfig = {
    topLeft: {
      field: 'credit',
      renderer: (data: any) => (
        <div className="flex gap-1 items-center">
          {formatCurrency({ num: data?.credit !== 0 && data.debit === 0 ? data.credit : data.debit })}
          <span
            className={`p-[4px] px-[10px]  rounded-full text-[10px] font-500 
        ${data?.credit !== 0 && data.debit === 0 ? "bg-green-200 text-[green]" : "bg-red-200 text-[red]"}`}
          >
            {data?.credit !== 0 && data.debit === 0 ? "Credit" : "Debit"}
          </span>
        </div>
      ),
    },
    bottomLeft: {
      field: "remarks"
    },
    bottomRight: {
      field: "transactionDate",
    },
  }

  return (
    <div className="!h-[350px] overflow-auto !w-full text-left">
      <Table
        data={items as unknown as Record<string, string | number | boolean>[] || []}
        header={header}
        fitStrategy="fitCellContents"
      // mobileConfig={mobileConfig}
      />
    </div>
  )
}
