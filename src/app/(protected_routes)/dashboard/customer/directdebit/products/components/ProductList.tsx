import CopyData from "@/components/CopyData";
import StatusTag from "@/components/StatusTag";
import Table from "@/components/Table";
import { formatCurrency, shortenText } from "@/utils/common";

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
export default function ProductList() {
  const header = [
    { field: 'transactionDate', headerName: 'Transaction Date' },
    { field: 'productName', headerName: 'Product Name' },
    // {
    //   field: 'amount', headerName: 'Amount',
    //   cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.amount })}</span>)
    // },
    {
      field: 'bankCode', headerName: 'Type',
      // cellRenderer: ({ data }: any) => (
      //   <span>
      //     {data.type === "credit" ?
      //       (<StatusTag status="successful" statusText="Credit" />)
      //       : data.type === "debit" ?
      //         (<StatusTag status="failed" statusText="Debit" />)
      //         : null}
      //   </span>
      // )
    },
    {
      field: 'settlementRemark', headerName: 'Settlement Remarks',
    },
    {
      field: 'transactionRef', headerName: 'Transaction Ref.',
      // cellRenderer: ({ data }: any) => (
      //   <span className="flex gap-3 items-center">
      //     {shortenText(data.transactionRef, 15)}
      //     <CopyData data={data.transactionRef} />
      //   </span>)
    },
    {
      field: 'status', headerName: 'Status',
      // cellRenderer: ({ data }: any) => (
      //   <span>
      //     {data.status === "successful" ?
      //       (<StatusTag status="successful" />)
      //       : data.status === "pending" ?
      //         (<StatusTag status="pending" />)
      //         : data.status === "failed" ?
      //           (<StatusTag status="failed" />)
      //           : null}
      //   </span>
      // )
    },
  ];
    return (
      <Table
        data={dummyData}
        header={header}
      />
    );
  }
  