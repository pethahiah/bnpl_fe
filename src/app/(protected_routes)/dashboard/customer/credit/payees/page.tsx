"use client"
import CopyData from "@/components/CopyData";
import Table from "@/components/Table";
import FilterPane from "@/components/Table/FilterPane";
import { getBeneficiariesList } from "@/store/actions/credit/employees";
import { useAppSelector } from "@/store/hooks";
import { formatCurrency, shortenText } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const navigate = useRouter();
  const header = [
    // { field: 'transactionDate', headerName: 'Account Name' },
    // { field: 'transactionDate', headerName: 'Bank Name' },
    // {
    //   field: 'amount', headerName: 'Amount',
    //   cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.amount })}</span>)
    // },
    // {
    //   field: 'transactionRef', headerName: 'Account Number',
    //   cellRenderer: ({ data }: any) => (
    //     <span className="flex gap-3 items-center">
    //       {shortenText(data.transactionRef, 15)}
    //       <CopyData data={data.transactionRef} />
    //     </span>)
    // },
    { field: 'listName', headerName: 'Name' },
    { field: 'beneficiaryCount', headerName: 'No. Of Payments Items' },
    { field: 'createdBy', headerName: 'Creator' },
    { field: 'dateCreated', headerName: 'Created date' },
    {
      field: 'action',
      headerName: 'Action',
      lockPosition: 'left',
      pinned: "right",
      type: "actions",
      cellRenderer: ({ data }: any) => <button type='button' className='status link-btn !rounded-full' onClick={() => { navigate.push(`/payees/${data.listId}?name=${data.listName}`) }}>
        <p className='!w-20 h-8 flex flex-row justify-center items-center !bg-az-light-red text-az-teal !rounded-full'>Details</p>
      </button>
    }
  ];

  const paymentItemList = useAppSelector((state) => state.employees.beneficiariesList)

  useEffect(() => {
    getBeneficiariesList();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="w-full bg-white flex flex-col gap-5 rounded-[10px] py-3 px-5">
          <FilterPane />
          <div className="w-full h-[60vh]">
            <Table
              data={paymentItemList}
              header={header}
              fitStrategy="fitGridWidth"
            />
          </div>
        </div>
      </div>
    </>
  );
}