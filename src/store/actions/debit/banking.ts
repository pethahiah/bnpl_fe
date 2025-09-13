import { addProduct } from "@/store/slice/productSlice";
import { appDispatch } from "@/store/store";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BASE_DEBIT_SERVICE}/payout`;
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_BASE_DEBIT_APP_ID || ''
}
export const getDDBanks = (handleDone: any, isSilent = false) => {
  const call = axios.get(`${url}/banks/list`, {
    headers
  })
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      if (resp.data.data.status !== "Production") {
        // goLive(() => { });
      }
      handleDone();
      appDispatch(addProduct(resp.data.data));
      return resp.data.message || 'Banks loaded successfully!';
    }, 'Error loading banks!');
  } else {
    toastWrapper(call, 'Getting banks...', (resp) => {
      if (resp.data.data.status !== "Production") {
        // goLive(() => { });
      }
      handleDone();
      appDispatch(addProduct(resp.data.data));
      return resp.data.message || 'Banks loaded successfully!';
    }, 'Error Banks!');
  }
}

export const getAccounts = (handleDone: any) => {
  const call = axios.get(`${url}/accounts`, {
    headers
  })
  toastWrapper(call, 'Getting collection accounts...', (resp) => {
    handleDone();
    return resp.data.message || 'Collection accounts loaded successfully!';
  }, 'Error loading collection accounts!');
}

export const addAccounts = (data: any, handleDone: any) => {
  const call = axios.post(`${url}/addaccounts`, data, {
    headers
  })
  silentHTTPCaller(call, 'Adding accounts...', (resp) => {
    handleDone();
    return resp.data.message || 'Account added successfully!';
  }, 'Error adding accounts!');
}
