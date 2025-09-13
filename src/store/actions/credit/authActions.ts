import { setShowVerificationPending, setProduct } from "@/store/slice/authSlice";
import { appDispatch } from "@/store/store";
import { toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";


const url = process.env.NEXT_PUBLIC_BASE_IDENTITY;

export const getAuthOTP = (data: {emailAddress: string}, handleDone: () => void) => {
  const call = axios.post(`${url}Otp/email`, data, {
    headers: {
      ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
    }
  })
  toastWrapper(call, 'Validating your email...', (resp) => {
    handleDone();
    return resp.data.message || 'OTP sent to the provided email!';
  }, 'Error validating email!');
}

export const registerBusiness = (data: Record<string, any>, handleDone: () => void) => {
  const call = axios.post(`${url}Onboarding/register`, data, {
    headers: {
      ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
    }
  })
  toastWrapper(call, 'Registering your business...', (resp) => {
    handleDone();
    return resp.data.message || 'Login details sent to your provided email address!';
  }, 'Error registering business!');
}

export const showVerificationPending = () => {
  appDispatch(setShowVerificationPending(true));
}

export const setSelectedProduct = (product: Record<string, string>) => {
  appDispatch(setProduct(product));
}
