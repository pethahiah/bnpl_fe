import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { appDispatch } from "../../store";
import { setProduct, setShowVerificationPending } from "../../slice/authSlice";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { IAttemptLoginActionBody, IRegisterActionBody } from "@/utils/types/authTypes";

const url = getBaseURL();

export const registerAccount = (data: IRegisterActionBody, handleDone: IHandleDone) => {
  const call = axios.post(`${url}register`, data, {
    headers: {
      ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
    }
  })

  toastWrapper(call, 'Creating your account...', (resp) => {
    handleDone();
    return resp.data.message || 'Account created successfully!';
  }, 'Error creating account!');
}


export const attemptLogin = (data: IAttemptLoginActionBody, handleDone?: IHandleDone, handleError?: IHandleDone) => {
  const call = axios.post(`${url}AttemptLogin`, data)

  toastWrapper(
    call,
    'Logging you in...',
    (resp) => {
      if (handleDone) handleDone(resp?.data);
      return resp.data.message || 'Login Successful, OTP sent to your email!';
    },
    'Invalid Credentials!',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Invalid Credentials!';
    },
    () => {
      if (handleError) handleError();
    }
  )
}

// ------------------------------------------------------------------------------------------
export const getAuthOTP = (data: { emailAddress: string }, handleDone: IHandleDone, handleError: IHandleError) => {

  const call = axios.post(`${url}Otp/email`, data, {
    headers: {
      ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
    }
  })
  toastWrapper(call, 'Validating your email...', (resp) => {
    handleDone();
    return resp.data.message || 'OTP sent to the provided email!';
  }, 'Error validating email!', undefined, () => handleError());
}

export const registerBusiness = (data: Record<string, any>, handleDone: IHandleDone) => {
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

export const getAllServices = (handleDone: IHandleDone) => {
  const call = axios.get(`${url}Onboarding/list/services`, {
    headers: {
      ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
    }
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone();
    return resp.data.message;
  }, 'Error loading services!');
}

export const showVerificationPending = () => {
  appDispatch(setShowVerificationPending(true));
}

export const setSelectedProduct = (product: Record<string, string>) => {
  appDispatch(setProduct(product));
}
