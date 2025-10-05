'use client'

import { useEffect, useState } from "react";
import WalletFundAccountModal from "./WalletFundAccountModal";
import { icons } from "@/assets";
import { getWallet } from "@/store/actions/credit/wallet";
import { formatCurrency } from "@/utils/common";

export interface IWalletData {
  name: string,
  availableBalance: number,
  linkedAccount: string,
  bank: string,
  accountName: string
}

const initialData = {
  name: '',
  availableBalance: 0,
  linkedAccount: '',
  bank: '',
  accountName: ''
}

export default function WalletDetailsCard({ showAccDetails, setShowAccDetails }: any) {
  const [walletData, setWalletData] = useState<IWalletData>(initialData)
  const [loadingWalletData, setLoadingWalletData] = useState(false)

  useEffect(() => {
    handleGetWalletDetails()
  }, [])

  const handleGetWalletDetails = () => {
    getWallet(setWalletData, setLoadingWalletData)
  }

  return (<>
    <div className="relative flex flex-col justify-center gap-3 w-full h-28 p-3 px-6 shadow-md rounded-lg bg-[#0898a0d3] text-white">
      <div className="w-fit flex justify-between absolute right-6">
        {
          loadingWalletData ? <span className="text-[12px] font-[400] cursor-pointer flex items-center gap-1">Loading...</span> : (<span className="text-[12px] font-[400] cursor-pointer flex items-center gap-1" onClick={handleGetWalletDetails}>
            <img src={icons.refreshWhite} className="w-[15px]" alt="" />
          </span>)
        }
      </div>
      <div className="flex w-[100%] items-start justify-center flex-col">
        <span className="text-[12px] font-[400]">Bal: </span>
        <h3 className="text-[30px] font-semibold leading-[100%] ">
          {formatCurrency({ num: walletData?.availableBalance })}
        </h3>
      </div>
    </div>

    <WalletFundAccountModal
      showAccDetails={showAccDetails}
      setShowAccDetails={setShowAccDetails}
      handleGetWalletDetails={handleGetWalletDetails}
    />
  </>
  )
}