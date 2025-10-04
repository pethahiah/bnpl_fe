"use client"

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useGetBaseLink } from "@/hooks/useUserType";
import { completVerification } from "@/store/actions/auth/verficationAction";
import { getProfileDetails } from "@/store/actions/profile/profileActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

export default function BVNRedirect() {
  const [errorVerifying, setErrorVerifying] = useState(false);
  const search = useSearchParams();
  const router = useRouter();
  const linkBase = useGetBaseLink();

  useEffect(() => {
    handleGetAccessToken();
  }, [location?.search]);

  const handleGetAccessToken = async () => {
    const accessToken = search?.get("accessToken");

    if (!accessToken) {
      router.replace(`${linkBase}/settings/profile`);
      toast.error('BVN verification failed, please try again!');
      return
    }

    completVerification({
      accessToken,
      handleDone: () => {
        getProfileDetails({
          handleDone: () => {
            router.replace(`${linkBase}/settings/profile`);
          }, isSilent: true
        })

      },
      handleError: () => {
        setErrorVerifying(true);
      }
    });
  }

  return (
    <>
      {!errorVerifying ? (
        <div className="w-[100%] min-h-[40vh] flex justify-center items-center"><LoaderIcon /></div>
      ) : (
        <Modal
          open={errorVerifying}
          onClose={() => {
            setErrorVerifying(false);
            router.replace(`${linkBase}/settings/profile`);
          }}
          overrideStyle={{
            maxWidth: '400px',
            width: '100%',
            height: 'max-content',
            maxHeight: '70%',
            padding: "10px"
          }}
          title="Confirm data."
        >
          <div className="flex flex-col">
            <div className="my-4">
              We could not verify you according to CBN provided guidelines/policies. You will need to provide a government issued identification to verify you, click here to begin manual verification or check your profile data for any wrongly entered info. Thanks!
            </div>
            <div className="flex flex-row w-full justify-between items-center">
              <Button
                overrideStyle={{ width: '100px' }}
                type="flat"
                onClick={() => {
                  setErrorVerifying(false);
                  router.replace(`${linkBase}/settings/profile`);
                }}
                label="Confirm"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}