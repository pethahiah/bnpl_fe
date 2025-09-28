import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { IAttemptLoginActionBody, IRegisterActionBody } from "@/utils/types/authTypes";
import { signOut } from "next-auth/react";

const url = getBaseURL();

export const registerAccount = (data: IRegisterActionBody, handleDone: IHandleDone) => {
  const call = axios.post(`${url}register`, data)

  toastWrapper(call, 'Creating your account...', (resp) => {
    handleDone();
    return resp.data.message || 'Account created successfully!';
  }, 'Error creating account!');
}


export const attemptLogin = ({ data, handleDone, handleError, isSilent = false }: { data: IAttemptLoginActionBody, handleDone?: IHandleDone, handleError?: IHandleDone, isSilent?: boolean }) => {
  const call = axios.post(`${url}AttemptLogin`, data)

  if (isSilent) {
    silentHTTPCaller(
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
  } else {
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
}

export const requestPasswordReset = (data: { email: string }, handleDone?: IHandleDone, handleError?: IHandleError) => {
  const call = axios.post(`${url}forgot`, data)
  toastWrapper(call, 'Getting your reset information ready...', (resp) => {
    if (handleDone) handleDone(resp?.data);
    return resp.data.message || 'Please check your email for further instructions!';
  },
    'Error getting the reset information.',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Error getting the reset information.';
    },
    () => {
      if (handleError) handleError()
    }
  );
}

export const resetPassword = (data: { token: string, password: string }, handleDone?: IHandleDone, handleError?: IHandleError) => {
  const call = axios.post(`${url}reset`, data)
  toastWrapper(call, 'Resetting your password...', (resp) => {
    if (handleDone) handleDone(resp?.data);
    return resp.data.message || 'Password reset successfully!';
  },
    'Error resetting your password.',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Error getting the reset information.';
    },
    () => {
      if (handleError) handleError()
    }
  );
}

export const handleLogout = async () => {
  await signOut({ redirect: true, callbackUrl: "/" });
  localStorage.removeItem('tazat');
  localStorage.clear();
  return 'Logged out Successful!';
}
