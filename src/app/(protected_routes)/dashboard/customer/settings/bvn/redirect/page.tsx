import BVNRedirect from "@/pages/BVN/BVNRedirect";
import { Suspense } from "react";
import { LoaderIcon } from "react-hot-toast";

export default function BVNRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex justify-center items-center"><LoaderIcon /></div>
      }>
      <BVNRedirect />
    </Suspense>
  )
}