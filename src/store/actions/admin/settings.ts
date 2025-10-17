import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { appDispatch } from "@/store/store";
import { ISettingsActionBody, ISettings } from "@/utils/types/settingsTypes";
import { addBNPLSettings } from "@/store/slice/adminSlice";

const url = getBaseURL();


export const getCurrentBNPLSettings = ({ handleDone, handleError, isSilent = false }: { handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.get(`${url}admin/bnpl-setting`);

  toastWrapper(
    call,
    'Getting BNPL settings...',
    (resp) => {
      if (handleDone) handleDone(resp?.data);
      appDispatch(addBNPLSettings(resp.data as ISettings));
      return resp.data.message || 'BNPL settings retrieved successfully!';
    },
    'Error getting BNPL settings!',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Error getting BNPL settings!';
    },
    () => {
      if (handleError) handleError();
    }
  )
}
export const updateBNPLSettings = ({ body, handleDone, handleError, isSilent = false }: { body: ISettingsActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.post(`${url}admin/bnpl-setting`, body);

  toastWrapper(
    call,
    'Updating BNPL settings...',
    (resp) => {
      if (handleDone) handleDone(resp?.data);
      return resp.data.message || 'BNPL settings updated successfully!';
    },
    'Error updating BNPL settings!',
    (err) => {
      //@ts-expect-error - This will error in strict mode
      return err?.response?.data?.message || 'Error updating BNPL settings!';
    },
    () => {
      if (handleError) handleError();
    }
  )
}