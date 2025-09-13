'use client'
import { icons } from "@/assets";
import Button from "@/components/Button";
import { Select } from "@/components/Input";
import Modal from "@/components/Modal";
import { getWalletTransactionsHistory } from "@/store/actions/credit/wallet";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WalletTransactionsAccordion from "./WalletTransactionsAccordion";
import useVerificationDone from "@/hooks/useVerificationDone";
import dayjs from "dayjs";
import NotFound from "@/components/NotFound";
import { months, years } from '@/utils/data';

export default function WalletHistory() {
  const { isVerificationDone } = useVerificationDone();
  const [transactionsHistory, setTransactionsHistory] = useState([])
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month').format("YYYY-MM-DDTHH:mm").toString());
  // const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DDTHH:mm").toString());
  // const [endDate, setEndDate] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [data, setData] = useState({
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: ''
  });

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const DateIsValid = () => {
    const startDate = `${data.startMonth} ${data.startYear}`;
    const endDate = `${data.endMonth} ${data.endYear}`;
    if (startDate && endDate && dayjs(endDate).isBefore(startDate)) {
      toast.error("End date cannot come before start date!")
      return false;
    }
    return true
  }

  const getHistoryHandler = (manualDate?: { startDate: any; endDate: any; } | undefined) => {
    if (isVerificationDone) {
      if (manualDate) {
        getWalletTransactionsHistory(
          setTransactionsHistory,
          manualDate.startDate, manualDate.endDate
        )
      } else {
        if (DateIsValid()) {
          const startDate = `${data.startMonth} ${data.startYear}`;
          const endDate = `${data.endMonth} ${data.endYear}`;
          getWalletTransactionsHistory(
            setTransactionsHistory,
            dayjs(startDate).format("YYYY-MM-DDTHH:mm"), dayjs(endDate).format("YYYY-MM-DDTHH:mm")
          )
        }
      }

    }
  }

  useEffect(() => {
    getHistoryHandler()
  }, [isVerificationDone])

  const handleFilterSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowFilterModal(false);
    getHistoryHandler()
  }

  const resetFilter = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setStartDate("")
    setEndDate("")
    getHistoryHandler({ startDate: "", endDate: "" })
    setShowFilterModal(false);
  }

  return (
    <>
      <div className="w-full flex flex-col justify-around">
        {
          transactionsHistory.length === 0 ?
            (
              <NotFound
                text1="No Transactions to show for this date range!"
                text2='Begin the Journey by funding your account.'
              />
            ) : (
              <>
                <div className="flex justify-end">
                  <Button type="contained" label="Filter by date" leftIcon={<img src={icons.filterIcon} />}
                    className="!m-0 !my-2" onClick={() => setShowFilterModal(true)}
                  />
                </div>
                <div className="!w-full h-fit">
                  <WalletTransactionsAccordion
                    items={transactionsHistory}
                  />
                </div>
              </>
            )
        }
      </div>

      <Modal
        onClose={() => {
          setShowFilterModal(false);
        }}
        open={showFilterModal}
        title={'Filter History'}
        subTitle="Select start and end date to filter your transactions history."
        className="!h-fit !w-[95%] md:!w-[80%]"
      >
        <form className="" onSubmit={handleFilterSubmit}>
          <div className="input-grp-wrapper relative">
            <Select
              data={months}
              label="Start month"
              placeholder=""
              name="startMonth"
              required
              value={data.startMonth}
              onChange={handleChange}
            />
            <Select
              data={years as unknown as string[]}
              label="Start year"
              placeholder=""
              name="startYear"
              required
              value={data.startYear}
              onChange={handleChange}
            />
          </div>
          <div className="input-grp-wrapper relative">
            <Select
              data={months}
              label="End month"
              placeholder=""
              name="endMonth"
              required
              value={data.endMonth}
              onChange={handleChange}
            />
            <Select
              data={years as unknown as string[]}
              label="End year"
              placeholder=""
              name="endYear"
              required
              value={data.endYear}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex gap-3 justify-center">
            <button
              className='text-peth-red px-8 ml-4 flex flex-row w-fit justify-around items-center h-10 bg-[transparent] border border-peth-red'
              onClick={resetFilter}
              type="reset"
            >
              Reset
            </button>
            <button
              className='text-white px-8 ml-4 flex flex-row w-fit justify-around items-center h-10 bg-peth-red'
            >
              Apply filter
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}