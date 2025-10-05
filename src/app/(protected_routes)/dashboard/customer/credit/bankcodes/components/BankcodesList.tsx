'use client'

import CopyData from "@/components/CopyData";
import Loader from "@/components/Loader";
import { getDDBanksSalary } from "@/store/actions/credit/salaryWallet";
import { useEffect, useState } from "react";

export default function AccountList() {
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    getDDBanksSalary((resp) => {
      setBanks(resp);
      setLoading(false);
    })
  }, []);
  
  if (loading) {
    return <Loader />
  }
  return (
    <div className="flex flex-row flex-wrap w-full h-full overflow-auto gap-1 justify-between items-start">
      {
        banks.map((bank: Record<string, string>, index: number) => (
          <div key={`${bank.bankCode}_${index}`} className="relative max-w-full w-[300px] p-4 border border-peth-red text-left flex flex-col gap-2 group">
            <div className="flex gap-1 flex-row w-full">
              <h4 className="!w-11/12 text-nowrap !text-ellipsis !overflow-hidden">{bank.name}</h4>
              <span className="hidden group-hover:flex top-[10px] right-[10px] absolute"><CopyData data={bank.name} /></span>
            </div>
            <div className="flex gap-2 items-center"><p>{bank.bankCode}</p>
              <span className="hidden group-hover:flex"> <CopyData data={bank.bankCode} /></span>
            </div>
          </div>
        ))
      }
    </div>
  );
}
  