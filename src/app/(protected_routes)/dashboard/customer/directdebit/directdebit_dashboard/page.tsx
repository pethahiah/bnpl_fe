"use client"

import { icons } from "@/assets";
import Button from "@/components/Button";
import BarChart from "@/components/Charts/BarChart";
import ChartContainer from "@/components/Charts/ChartContainer";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import CopyData from "@/components/CopyData";
import Input, { Select } from "@/components/Input";
import { OverViewCards } from "@/components/Overview/OverViewCards";
import StatusTag from "@/components/StatusTag";
import Table from "@/components/Table";
import { formatCurrency, shortenText } from "@/utils/common";

const cardsArr = [
  {
    label: "Total Active Mandates",
    value: "234",
    iconColor: "#F55F64",
    withBg: true,
  },
  {
    label: "Pending Mandates",
    value: "4",
    iconBg: "#FF8C00",
  },
  {
    label: "Failed Mandates",
    value: "24",
    iconBg: "#4560ED",
  },
  {
    label: "Incomplete Mandates",
    value: "4",
    iconBg: "#1DADEB",
  },
]

// bar chart data
const barLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const barData = [
  {
    label: 'Successful Transactions',
    data: barLabels.map(() => Math.random() * 100),
    backgroundColor: "#6AD19F",
    hoverBackgroundColor: '#00B05B',
  },
  {
    label: 'Failed Transactions',
    data: barLabels.map(() => Math.random() * 100),
    backgroundColor: '#FFDEDF',
    hoverBackgroundColor: "#FF6166",
  },
]

// DoughnutChart data
const douLabels = ["150 Successful Transactions", '24 Failed Transactions']
const douDataSet = {
  label: 'transactions',
  data: [150, 24],
  backgroundColor: [
    '#AFF8D4',
    '#FF9EA1',
  ],
}

const header = [
  { field: 'transactionDate', headerName: 'transaction date' },
  { field: 'productName', headerName: 'Product name' },
  { field: 'productId', headerName: 'product id' },
  {
    field: 'mandateCode', headerName: 'Mandate code',
    cellRenderer: ({ data }: any) => (
      <span className="flex gap-3 items-center">
        {shortenText(data.mandateCode, 15)}
        <CopyData data={data.mandateCode} />
      </span>)
  },
  {
    field: 'amount', headerName: 'Amount',
    cellRenderer: ({ data }: any) => (<span>{formatCurrency({ num: data?.amount })}</span>)
  },
  {
    field: 'description', headerName: 'Description',
    cellRenderer: ({ data }: any) => (
      shortenText(data.description, 20)
    )
  },
  {
    field: 'mandateStatus', headerName: 'Mandate Status',
    cellRenderer: ({ data }: any) => (<StatusTag status={data.mandateStatus} statusText="Debit" />)
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col gap-5  p-5">
      <OverViewCards cards={cardsArr} title="BNPL Overview" />
      <div className="w-full flex gap-5 justify-start lg:justify-start flex-wrap  flex-col lg:flex-row items-center lg:items-start">
        <ChartContainer
          className="flex-[1.5] max-w-[800px] "
          title="Overview"
          filterComponents={[
            <Input
              value=""
              name="date"
              type="date"
              className="!w-[135px] h-[40px] text-sm"
              placeholder="Select a date"
            />,
            <Select
              data={["Daily", "Weekly", "Monthly", "Yearly"]}
              name="date"
              icon={icons.time_circle}
              className="!w-[120px] h-[40px] text-sm"
              placeholder="Select a date"
            />
          ]}
          showDataTitles={true}
          dataTitle="Average per month"
          amount={formatCurrency({ num: 148560, currencyDisplay: "code" }) as string | undefined}
          percentage={12.5}
          chart={<BarChart labels={barLabels} datasets={barData} height={100} />}
        />

        <ChartContainer
          className="flex-[1] min-w-[350px]"
          title="Average Overview"
          filterComponents={[
            <Select
              data={["Daily", "Weekly", "Monthly", "Yearly"]}
              name="date"
              icon={icons.time_circle}
              className="!w-[120px] h-[40px] text-sm"
              placeholder="Select a date"
            />
          ]}
          showDataTitles={false}
          chart={<DoughnutChart labels={douLabels} datasets={douDataSet} />}
        />
      </div>
      <div className="w-full h-[60vh] p-0">
        <div className="w-full flex items-center justify-between mb-5">
          <h2 className="font-[500] ">Recent Transaction</h2>
          <Button
            label="View more"
            type="flat"
            className="!w-auto !m-0"
          />
        </div>
        <Table
          data={[]}
          header={header}
        />
      </div>
    </div>
  );
}
