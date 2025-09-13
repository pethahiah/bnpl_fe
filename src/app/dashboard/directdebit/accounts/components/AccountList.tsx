"use client"

import CopyData from "@/components/CopyData";
import StatusTag from "@/components/StatusTag";
import Table from "@/components/Table";
import { getAccounts } from "@/store/actions/debit/banking";
import { formatCurrency, shortenText } from "@/utils/common";
import { useEffect } from "react";

const dummyData = [
  {
    transactionDate: '2022-01-01',
    accountName: 'Paythru Credit Card',
    amount: 1000,
    bankName: 'credit',
    settlementRemark: 'Processed',
    accountNumber: 'TR123456789',
    status: 'validated'
  },
  {
    transactionDate: '2022-01-02',
    accountName: 'Paythru Debit Card',
    amount: 500,
    bankName: 'debit',
    settlementRemark: 'Failed',
    accountNumber: 'TR987654321',
    status: 'failed'
  },
  {
    transactionDate: '2022-01-03',
    accountName: 'Paythru Credit Card',
    amount: 2000,
    bankName: 'credit',
    settlementRemark: 'Processed',
    accountNumber: 'TR123456789wefwefwefwefwefwefwefwef',
    status: 'pending'
  }
]
export default function AccountList() {
  useEffect(() => {
    getAccounts(() => { },)
  }, [])

  const header = [
    { field: 'accountName', headerName: 'Account Name' },
    { field: 'bankName', headerName: 'Bank' },
    {
      field: 'accountNumber', headerName: 'Account Number',
      cellRenderer: ({ data }: any) => (
        <span className="flex gap-3 items-center">
          {data.accountNumber}
          <CopyData data={data.accountNumber} />
        </span>)
    },
    {
      field: 'status', headerName: 'Status',
      cellRenderer: ({ data }: any) => (
        <span>
          {data.status === "validated" ?
            (<StatusTag status="successful" statusText="Validated" />)
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
    <Table
      data={dummyData}
      header={header}
      fitStrategy="fitGridWidth"
    />
  );
}
