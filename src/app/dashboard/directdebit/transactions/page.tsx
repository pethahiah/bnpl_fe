"use client"
import CopyData from "@/components/CopyData";
import { OverViewCards } from "@/components/Overview/OverViewCards";
import StatusTag from "@/components/StatusTag";
import Table from "@/components/Table";
import FilterPane from "@/components/Table/FilterPane";
import { formatCurrency, shortenText } from "@/utils/common";
import { useState } from "react";

const dummyData = [
  {
    transactionDate: '2022-01-01',
    productName: 'Paythru Credit Card',
    amount: 1000,
    type: 'credit',
    settlementRemark: 'Processed',
    transactionRef: 'TR123456789',
    status: 'successful'
  },
  {
    transactionDate: '2022-01-02',
    productName: 'Paythru Debit Card',
    amount: 500,
    type: 'debit',
    settlementRemark: 'Failed',
    transactionRef: 'TR987654321',
    status: 'failed'
  },
  {
    transactionDate: '2022-01-03',
    productName: 'Paythru Credit Card',
    amount: 2000,
    type: 'credit',
    settlementRemark: 'Processed',
    transactionRef: 'TR123456789wefwefwefwefwefwefwefwef',
    status: 'pending'
  }
]

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
    { field: 'transactionDate', headerName: 'Transaction Date' },
    { field: 'productName', headerName: 'Product Name' },
    {
      field: 'amount', headerName: 'Amount',
      cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.amount })}</span>)
    },
    {
      field: 'bankCode', headerName: 'Type',
      cellRenderer: ({ data }: any) => (
        <span>
          {data.type === "credit" ?
            (<StatusTag status="successful" statusText="Credit" />)
            : data.type === "debit" ?
              (<StatusTag status="failed" statusText="Debit" />)
              : null}
        </span>
      )
    },
    {
      field: 'settlementRemark', headerName: 'Settlement Remarks',
    },
    {
      field: 'transactionRef', headerName: 'Transaction Ref.',
      cellRenderer: ({ data }: any) => (
        <span className="flex gap-3 items-center">
          {shortenText(data.transactionRef, 15)}
          <CopyData data={data.transactionRef} />
        </span>)
    },
    {
      field: 'status', headerName: 'Status',
      cellRenderer: ({ data }: any) => (
        <span>
          {data.status === "successful" ?
            (<StatusTag status="successful" />)
            : data.status === "pending" ?
              (<StatusTag status="pending" />)
              : data.status === "failed" ?
                (<StatusTag status="failed" />)
                : null}
        </span>
      )
    },
  ];

  return (
    <>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col gap-5 p-5">
        <OverViewCards cards={cardsArr} />
        <div className="w-full bg-white flex flex-col gap-5 rounded-[10px] px-5 py-3">
          <FilterPane />
          <div className="w-full h-[60vh]">
            <Table
              data={dummyData}
              header={header}
            />
          </div>
        </div>
      </div>
    </>
  );
}