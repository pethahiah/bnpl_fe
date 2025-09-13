import { addProduct } from "@/store/slice/productSlice";
import { appDispatch } from "@/store/store";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BASE_DEBIT_SERVICE}/DirectDebit/mandate`;
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
}


export const validateRequest = (requestCode: string, handleDone: any, isSilent = false) => {
  const call = axios.get(`${url}/request/validate${requestCode}`, {
    headers
  })
  toastWrapper(call, 'Validating mandate request...', (resp) => {
    handleDone();
    appDispatch(addProduct(resp.data.data));
    return resp.data.message || 'Request validated!';
  }, 'Error validating request!');
}

export const create = (data: Record<string, any>, handleDone: any) => {
  const call = axios.post(`${url}/create`, data, {
    headers
  })
  toastWrapper(call, 'Creating mandate...', (resp) => {
    handleDone();
    return resp.data.message || 'Mandate created successfully!';
  }, 'Error creating mandate!');
}

export const getMandates = (body, handleDone: any) => {
  const call = axios.post(`${url}/list`, body, {
    headers
  })
  silentHTTPCaller(call, 'Getting mandates...', (resp) => {
    handleDone();
    return resp.data.message || 'Mandates loaded successfully!';
  }, 'Error loading mandates!');
}

export const getMandateDetails = (body, handleDone: any) => {
    const call = axios.post(`${url}/details`, body, {
      headers
    })
    silentHTTPCaller(call, 'Getting mandate details...', (resp) => {
      handleDone();
      return resp.data.message || 'Details loaded successfully!';
    }, 'Error loading details!');
  }

export const updateMandate = (body, handleDone: any) => {
    const call = axios.post(`${url}/update`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}


export const fetchMandateTransactions = (body, handleDone: any) => {
    const call = axios.post(`${url}/transactions`, body, {
      headers
    })
    silentHTTPCaller(call, 'Fetching mandate transactions...', (resp) => {
      handleDone();
      return resp.data.message || 'Transactions loaded successfully!';
    }, 'Error fetching mandate transactions!');
}

export const getSettlments = (body, handleDone: any) => {
    const call = axios.post(`${url}/settlements`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}

export const getStatus = (id, handleDone: any) => {
    const call = axios.get(`${url}/${id}/status`, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}

export const getPaymentSchedules = (body, handleDone: any) => {
    const call = axios.post(`${url}/schedules`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}

export const requestMandate = (body, handleDone: any) => {
    const call = axios.post(`${url}/request/initiate`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}

export const bulkInitiateRequest = (body, handleDone: any) => {
    const call = axios.post(`${url}/request/bulk/initiate`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}

export const closeMandate = (body, handleDone: any) => {
    const call = axios.post(`${url}/closeschedule`, body, {
      headers
    })
    silentHTTPCaller(call, 'Updating mandate...', (resp) => {
      handleDone();
      return resp.data.message || 'Updated successfully!';
    }, 'Error updating mandate!');
}
