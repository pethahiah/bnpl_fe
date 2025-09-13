import { getTransferBaseURL } from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = (getTransferBaseURL() as string) + "payment/Wallet/";
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_CREDIT_APP_ID || ''
};

export const getDebitAccountsSalary = (handleDone: (arg0: any) => void, isSilent = false) => {
  const call = axios.get(`${url}accounts`, {
    headers
  })
  if (isSilent) {
    silentHTTPCaller(call, 'Loading debit accounts...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || '';
    }, 'Error loading payments');
  } else {
    toastWrapper(call, 'Loading debit accounts...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || '';
    }, 'Error loading payments');
  }
}

export const getDDBanksSalary = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}banks`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data.data);
    return resp.data.message || '';
  }, 'Error loading payments');
}

export const createDDSalary = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}create-direct-debit`, data, {
    headers
  })
  toastWrapper(call, 'Configuring direct debit...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error creating direct debit');
}

export const getWalletSalary = (handleDone: (arg0: any) => void, loading?: (arg0: boolean) => any) => {
  loading && loading(true)
  const call = axios.get(`${url}get-create`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data.data);
    loading && loading(false)
    return resp.data.message || '';
  }, 'Error loading Wallet',
    (err) => { loading && loading(false); return 'Error loading Wallet' });
}

export const getFundingAccountSalary = (handleDone: (arg0: any) => void, setLoading: (arg0: boolean) => void) => {
  setLoading(true)
  const call = axios.get(`${url}funding`, {
    headers
  });
  silentHTTPCaller(call, "", (resp) => {
    handleDone(resp.data);
    setLoading(false)
    return resp.data
  }, "Error loading account details", (error) => {
    setLoading(false)
    return "Error loading account details"
  })
}


export const getWalletTransactionsHistorySalary = (handleDone: (arg0: never[]) => void, startDate: any, endDate: any) => {
  const call = axios.get(`${url}history?StartDate=${startDate}&EndDate=${endDate}`, {
    headers
  })
  toastWrapper(call, 'Loading wallet history...', (resp) => {
    if (Array.isArray(resp.data.data)) {
      handleDone(resp.data.data.reverse());
    } else {
      handleDone([])
    }
    return resp.data.message || '';
  }, 'Error loading Wallet');
}
