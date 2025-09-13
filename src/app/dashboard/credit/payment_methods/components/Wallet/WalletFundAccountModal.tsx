'use client'
import Modal from "@/components/Modal";
import { getFundingAccount } from "@/store/actions/credit/wallet";
import { useEffect, useState } from "react";
export default function WalletFundAccountModal({ 
  showAccDetails, 
  setShowAccDetails, 
  handleGetWalletDetails 
}: any) {
  const [fundingAccount, setFundingAccount] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showAccDetails) {
      getFundingAccount((resp: any) => {
        setFundingAccount(resp?.data)
      }, setLoading)
    }
  }, [showAccDetails])

  return (
    <Modal
      onClose={() => {
        setShowAccDetails(false);
        handleGetWalletDetails();
      }}
      open={showAccDetails}
      title={''}
      subTitle=""
      overrideStyle={{
        maxWidth: '450px',
        width: '90%',
        height: '55vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: '0',
        right: '0',
        top: '5%',
        borderRadius: '20px',
        padding: '20px'
      }}
      hideClose={false}
    >
      <div className="w-full h-full py-5 flex flex-col justify-center items-center">
        {/* {
          fundingAccount?.message ? (
            <p className="w-10/12 text-center my-5 text-sm">
              Please note a gateway charge of 1% to maximum of ₦100 applies.
            </p>
          ) : ''
        } */}
        <div className='flex flex-col justify-center items-start text-center pb-5'>
          <h3 className='text-3xl text-center capitalize w-full'>Fund your account</h3>
          <h3 className='text-xl text-center capitalize w-full my-4'>Fund your account with these details.</h3>
        </div>
        <div className="w-[100%] md:w-[90%] flex flex-col gap-5 mb-5">
          <div className="w-full flex flex-wrap justify-between gap-2">
            <p className="text-[14px] font-400 text-[#222222CC]">Bank Name: </p>
            <p className="text-base font-800">{loading ? "loading..." : fundingAccount?.bank}</p>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-2">
            <p className="text-[14px] font-400 text-[#222222CC]">Account Number: </p>
            <p className="text-base font-800">{loading ? "loading..." : fundingAccount?.accountNumber}</p>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-2">
            <p className="text-[14px] font-400 text-[#222222CC]">Account Name: </p>
            <p className="text-base font-800">{loading ? "loading..." : fundingAccount?.accountName}</p>
          </div>
        </div>
        <p className="w-10/12 text-center mb-5 text-base">
          {!loading && fundingAccount?.message}
        </p>
        <button
          className='text-white px-8 flex flex-row w-fit justify-around items-center h-10 bg-peth-red mb-5'
          onClick={() => {
            setShowAccDetails(false);
            handleGetWalletDetails();
          }}
        >
          I have funded the account.
        </button>
      </div>
    </Modal>
  )
}