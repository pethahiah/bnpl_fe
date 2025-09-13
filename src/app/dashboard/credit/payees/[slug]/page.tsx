import CopyData from "@/components/CopyData";
import GoBackBtn from "@/components/GoBackBtn";
import StatusTag from "@/components/StatusTag";
import TopLayout from "@/components/TopLayout";
import { formatCurrency, shortenText } from "@/utils/common";

const initialDetailsData = [
  {
    title: "Date & Time",
    data: "12th Nov; 2024 02:24pm",
  },
  {
    title: "Product Name",
    data: "Astronaut SpacePod"
  },
  {
    title: "Amount",
    data: formatCurrency({ num: 500023 })
  },
  {
    title: "Transaction Type",
    customData: <StatusTag status="failed" statusText="Debit" />,
  },
  {
    title: "Settlement Remarks",
    data: shortenText("This amount has been settled, kindly confirm the transaction.", 30)
  },
  {
    title: "Transaction Reference",
    customData: <div className="flex gap-2"><span className="text-[13px] font-[500] items-center">ea881df6-6e75-4djf-ie9e-939d</span> <CopyData data="ea881df6-6e75-4djf-ie9e-939d" /> </div>
  },
  {
    title: "Credit Account",
    data: "0123456789"
  },
  {
    title: "Account Name",
    data: "Bidemi Bamidele"
  },
  {
    title: "Bank Name",
    data: "Guaranty Trust Bank"
  },
  {
    title: "Payment Reference",
    customData: <div className="flex gap-2"><span className="text-[13px] font-[500] items-center">ea881df6-6e75-4djf-ie9e-939d</span> <CopyData data="ea881df6-6e75-4djf-ie9e-939d" /> </div>
  },
  {
    title: "Status",
    customData: <StatusTag status="pending" />,
  },
]

export default function SingleTransactionPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col gap-5">
      <TopLayout
        filled={true}
        leftComponents={[<GoBackBtn />]}
      />
      <div className="p-5">
        <div className='w-[100%] rounded-[10px] bg-[#FFFFFF]'>
          <div className="w-full flex justify-between p-[20px] bg-[#FFF3F3] rounded-t-[inherit] rounded-b-none">
            <div className="flex flex-col gap-1 w-[full] text-left">
              <h4 className="text-[12px] font-[400] leading-[100%]">TRANSACTION DETAILS</h4>
            </div>
          </div>
          <div className="w-full p-[20px] flex flex-wrap gap-x-5 gap-y-10">
            {
              initialDetailsData.map((detail, index) => {
                return (
                  <div key={index} className='flex flex-col justify-center items-start gap-2 min-w-[45%] sm:min-w-[200px] w-fit'>
                    <h5 className='text-[12px] font-[400] uppercase'>{detail.title}</h5>
                    {
                      detail.customData ? detail.customData : (<div className='text-[13px] font-[500]'>{detail.data}</div>)
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}