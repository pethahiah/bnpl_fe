"use client"

import Button from "@/components/Button";
import { getBVNConsentLink } from "@/store/actions/auth/verficationAction";
import toast from "react-hot-toast";

export default function BVNVerification() {

  const handeleGetConsentUrl = () => {
    getBVNConsentLink({
      handleDone: (resp) => {
        const bvnLink = resp?.responseData?.data?.url;
        bvnLink && window.open(bvnLink, '_self');
        if (!bvnLink) {
          toast.error('Verification link generation failed!');
        }
      }
    });
  }
  return (
    <div className="w-[100%] min-h-[70vh] flex justify-center items-center">
      <div className="max-w-[400px] flex justify-center items-center flex-col gap-5">
        <h2 className="text-xl font-semibold">BVN Verification</h2>
        <p className="text-sm text-[#666]">Start your BVN verification process by clicking the button below.</p>
        <Button label="Start Verification" type="flat" btnActionType="button" className="mt-4" onClick={() => handeleGetConsentUrl()} />
      </div>
    </div>
  )
}