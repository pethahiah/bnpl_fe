import getBaseURL from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import { IHandleDone } from "@/utils/type";
import axios from "axios";

const url = getBaseURL();

export const getBVNConsentLink = ({ handleDone, handleError, isSilent = false }: { handleDone?: IHandleDone, handleError?: IHandleDone, isSilent?: boolean }) => {
  const call = axios.get(`${url}auth`)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Getting consent link...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Success!';
      },
      'Error getting link!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting link!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Getting consent link...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Success!';
      },
      'Error getting link!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting link!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const completVerification = ({ accessToken, handleDone, handleError, isSilent = false }: { accessToken: string, handleDone?: IHandleDone, handleError?: IHandleDone, isSilent?: boolean }) => {
  const call = axios.get(`${url}getBvnDetails`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Verifying your account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Verified your account successfully!';
      },
      'Error verifying your account!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error verifying your account!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Updating your details...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Verified your account successfully!!';
      },
      'Error verifying your account!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error verifying your account!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}