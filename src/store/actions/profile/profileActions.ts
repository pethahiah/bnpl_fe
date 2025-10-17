import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { IProfileDetails, IProfileUpdateActionBody } from "@/utils/types/profileTypes";
import { appDispatch } from "@/store/store";
import { saveProfile } from "@/store/slice/profileSlice";

const url = getBaseURL();


export const getProfileDetails = ({ handleDone, handleError, isSilent = false }: { handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.get(`${url}getProfile`)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Getting your profile...',
      (resp) => {
        appDispatch(saveProfile(resp.data as IProfileDetails));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Profile gotten successfully!';
      },
      'Error getting profile!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting profile!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Getting your profile...',
      (resp) => {
        appDispatch(saveProfile(resp.data as IProfileDetails));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Profile gotten successfully!';
      },
      'Error getting profile!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting profile!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const updateProfileDetails = ({ data, handleDone, handleError, isSilent = false }: { data: IProfileUpdateActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.put(`${url}update-profile`, data)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Updating your profile...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Profile updated successfully!';
      },
      'Error updating profile. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating profile. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Updating your profile...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Profile updated successfully!';
      },
      'Error updating profile. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating profile. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const updateProfileImage = ({ data, handleDone, handleError }: { data: FormData, handleDone?: IHandleDone, handleError?: IHandleError }) => {
  const call = axios.post(`${url}image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  toastWrapper(
    call,
    'Updating your profile image...',
    (resp) => {
      if (handleDone) handleDone(resp?.data);
      return resp.data.message || 'Profile image updated successfully!';
    },
    'Error updating profile image!',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Error updating profile image!';
    },
    () => {
      if (handleError) handleError();
    }
  )
}