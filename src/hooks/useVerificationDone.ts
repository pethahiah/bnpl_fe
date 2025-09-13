import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react"

const useVerificationDone = () => {
  const {status} = useAppSelector((state) => state.products.productData);
  const [isVerificationDone, setIsVerificationDone] = useState(true);

  useEffect(() => {
    if (status === 'Production') {
      setIsVerificationDone(true);
    }
  }, [status]);
  return {isVerificationDone, status};
};

export default useVerificationDone;
