import { IWalletData } from "@/app/dashboard/credit/payment_methods/components/Wallet/WalletDetailsCard";
import getBaseURL from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";
import { SetStateAction } from "react";
import { salaryHeader } from "./utils";

const url = (getBaseURL() as string) + "api/v1/payment/Wallet/";

export const getDebitAccounts = (handleDone: { (resp: any): void; (arg0: any): void; }, isSilent = false) => {
  const call = axios.get(`${url}accounts`)
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

export const getDDBanks = (handleDone: { (resp: { data: SetStateAction<never[]>; }): void; (arg0: any): void; }) => {
  const call = axios.get(`${url}banks`, {
    headers: salaryHeader
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading payments');
}

export const createDD = (data: { accountNumber: string; accountName: string; maximumDebitPerTransaction: string; bankCode: any; fileBase64String: string; fileExtension: string; startDate: string; endDate: string; }, handleDone: { (): void; (arg0: any): void; }) => {
  const call = axios.post(`${url}create-direct-debit`, data, {
    headers: salaryHeader
  })
  toastWrapper(call, 'Configuring BNPL...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error creating BNPL');
}

export const getWallet = (handleDone: { (value: SetStateAction<IWalletData>): void; (arg0: any): void; }, loading?: { (value: SetStateAction<boolean>): void; (arg0: boolean): any; }) => {
  loading && loading(true)
  const call = axios.get(`${url}get-create`, {
    headers: salaryHeader
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data.data);
    loading && loading(false)
    return resp.data.message || '';
  }, 'Error loading Wallet',
    (err) => { loading && loading(false); return 'Error loading Wallet' });
}

export const getFundingAccount = (handleDone: { (resp: any): void; (arg0: any): void; }, setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
  setLoading(true)
  const call = axios.get(`${url}funding`, {
    headers: salaryHeader
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


export const getWalletTransactionsHistory = (handleDone: { (value: SetStateAction<never[]>): void; (value: SetStateAction<never[]>): void; (arg0: never[]): void; }, startDate: string, endDate: string) => {
  const call = axios.get(`${url}history?StartDate=${startDate}&EndDate=${endDate}`, {
    headers: salaryHeader
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