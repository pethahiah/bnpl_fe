import axios from "axios";
import { silentHTTPCaller, toastWrapper } from "../../../utils/toastWrapper";
import { IHandleDone, IHandleError } from "@/utils/type";
import getBaseURL from "@/utils/getBaseURL";
import { appDispatch } from "@/store/store";
import { addStore } from "@/store/slice/storesSlice";
import { IMerchantStore, IMerchantStoreActionBody } from "@/utils/types/merchantStoreTypes";

const url = getBaseURL();

export const getAllMerchantStores = ({ handleDone, handleError, isSilent = false }: { handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.get(`${url}merchant/stores`);

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Getting your stores...',
      (resp) => {
        appDispatch(addStore(resp.data as IMerchantStore[]));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Your Stores retrieved successfully!';
      },
      'Error getting stores!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting stores!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Getting your stores...',
      (resp) => {
        appDispatch(addStore(resp.data as IMerchantStore[]));
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Your Stores retrieved successfully!';
      },
      'Error getting stores!',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error getting stores!';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}


export const createMerchantStore = ({ data, handleDone, handleError, isSilent = false }: { data: IMerchantStoreActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.post(`${url}merchant/stores`, data)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Creating your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store created successfully!';
      },
      'Error creating store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error creating store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Creating your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store created successfully!';
      },
      'Error creating store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error creating store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const updateMerchantStore = ({ storeId, data, handleDone, handleError, isSilent = false }: { storeId: string, data: IMerchantStoreActionBody, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.put(`${url}merchant/stores/${storeId}`, data)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Updating your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store updated successfully!';
      },
      'Error updating store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Updating your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store updated successfully!';
      },
      'Error updating store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error updating store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}

export const deleteMerchantStore = ({ storeId, handleDone, handleError, isSilent = false }: { storeId: string, handleDone?: IHandleDone, handleError?: IHandleError, isSilent?: boolean }) => {
  const call = axios.delete(`${url}merchant/stores/${storeId}`)

  if (isSilent) {
    silentHTTPCaller(
      call,
      'Deleting your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store deleted successfully!';
      },
      'Error deleting store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error deleting store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  } else {
    toastWrapper(
      call,
      'Deleting your store...',
      (resp) => {
        if (handleDone) handleDone(resp?.data);
        return resp.data.message || 'Store deleted successfully!';
      },
      'Error deleting store. Please try again.',
      (err) => {
        //@ts-expect-error - This will error in strict mode
        return err?.response?.data?.message || 'Error deleting store. Please try again.';
      },
      () => {
        if (handleError) handleError();
      }
    )
  }
}