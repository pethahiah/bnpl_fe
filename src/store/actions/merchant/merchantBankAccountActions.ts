import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { appDispatch } from "@/store/store";
import { IMerchantBankAccount, IMerchantBankAccountActionBody } from "@/utils/types/merchantBankAccountTypes";
import { addBankAccount } from "@/store/slice/bankAccountsSlice";

const url = getBaseURL();

export const getAllMerchantBankAccounts = ({ handleDone, handleError, isSilent = false }: { handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.get(`${url}merchant/store-bank-accounts`);

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Getting your bank accounts...',
      (resp) => {
        appDispatch(addBankAccount(resp.data as IMerchantBankAccount[]));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Your bank accounts retrieved successfully!';
      },
      'Error getting bank accounts!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting bank accounts!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Getting your bank accounts...',
      (resp) => {
        appDispatch(addBankAccount(resp.data as IMerchantBankAccount[]));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Your bank accounts retrieved successfully!';
      },
      'Error getting bank accounts!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting bank accounts!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}


export const createMerchantBankAccount = ({ data, handleDone, handleError, isSilent = false }: { data: IMerchantBankAccountActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.post(`${url}merchant/store-bank-accounts`, data)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Adding your bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account added successfully!';
      },
      'Error adding bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error adding bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Adding your bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account added successfully!';
      },
      'Error adding bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error adding bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const updateMerchantBankAccount = ({ accountId, data, handleDone, handleError, isSilent = false }: { accountId: string, data: IMerchantBankAccountActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.put(`${url}merchant/store-bank-accounts/${accountId}`, data)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Updating this bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account updated successfully!';
      },
      'Error updating bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Updating your bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account updated successfully!';
      },
      'Error updating bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const deleteMerchantBankAccount = ({ accountId, handleDone, handleError, isSilent = false }: { accountId: string, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.delete(`${url}merchant/store-bank-accounts/${accountId}`)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Deleting this bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account deleted successfully!';
      },
      'Error deleting bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error deleting bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Deleting your bank account...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Bank account deleted successfully!';
      },
      'Error deleting bank account. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error deleting bank account. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}