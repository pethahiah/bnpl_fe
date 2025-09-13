import { addPaymentHistory } from "@/store/slice/paymentsSlice";
import { appDispatch } from "@/store/store";
import { getTransferBaseURL } from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";


const url = getTransferBaseURL() as string + "Payment";
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_CREDIT_APP_ID || ''
};

export const getPaymentHistory = (period: string, isSilent = false) => {
  const periodSplit = period.split(' ');
  const params = period ? `?Year=${periodSplit[1]}&Month=${periodSplit[0].toUpperCase()}` : ''
  const call = axios.get(`${url}/history${params}`, {
    headers
  })

  if (isSilent) {
    silentHTTPCaller(call, 'loading payment history...', (resp) => {
      appDispatch(addPaymentHistory(resp.data.data))
      return resp.data.message || '';
    }, 'Error loading payment history');
  } else {
    toastWrapper(call, 'loading payment history...', (resp) => {
      appDispatch(addPaymentHistory(resp.data.data))
      return resp.data.message || '';
    }, 'Error loading payment history');
  }
}

export const getPFABeneficiaries = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}Payment/${id}/pfa/items`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading PFA beneficiaries!');
}

export const getPayments = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/${id}/items`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading payments');
}

export const createSchedule = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/schedule/create`, data, {
    headers
  })
  toastWrapper(call, 'Creating payment schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Payment schedule created successfully!';
  }, 'Error creating schedule!');
}

export const removeItemFromSchedule = (beneficiaryId: any, scheduleId: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/schedule/items/remove`, {
    scheduleId,
    beneficiaryId
  }, {
    headers
  });
  toastWrapper(call, 'Removing item from schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Item removed successfully!';
  }, 'Error removing item!');
}

export const addItemToSchedule = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}/schedule/items/add`, data, {
    headers
  })
  toastWrapper(call, 'Adding item(s) to schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Item(s) added successfully!';
  }, 'Error adding item!');
}

export const pfaList = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/pfa/list`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data.data);
    return resp.data.message || '';
  }, 'Error getting PFAs!');
}
export const loudPfaListGetter = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/pfa/list`, {
    headers
  })
  toastWrapper(call, 'Getting PFA data...', (resp) => {
    handleDone(resp.data.data);
    return resp.data.message || '';
  }, 'Error getting PFAs!');
}

export const getEmployerInfo = (employerCode: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/employer/${employerCode}/info`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error getting employer\'s info');
}

export const getPFAInfo = (pfaCode: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}Payment/pfainfo/${pfaCode}`, {
    headers
  })
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error getting employer\'s info');
}

export const getSchedule = (id: any, handleDone: (arg0: any) => void, isSilent = false) => {
  const call = axios.get(`${url}/schedule/${id}`, {
    headers
  })
  if (isSilent) {
    silentHTTPCaller(call, 'loading payments...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || '';
    }, 'Error loading payments');
  } else {
    toastWrapper(call, 'loading payments...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || '';
    }, 'Error loading payments');
  }
}

export const confirmSchedule = (scheduleId: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/confirm/${scheduleId}`, {
    headers
  })
  toastWrapper(call, 'Submiting schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule submitted successfully';
  }, 'Error submitting schedule');
}

export const validatePaymentOTP = (data: {
  otp?: string,
  paymentReference?: string,
  scheduleId: string,
  otherDetails?: string
}, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/validate`, data, {
    headers
  })
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const validatePayment = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/schedule/validate/${id}`, {
    headers
  })
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const reValidateCardPayment = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/schedule/${id}/verify/card-payment`, {
    headers
  })
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const updateScheduleBeneficiary = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}/schedule/update/item`, data, {
    headers
  })
  toastWrapper(call, 'Updating beneficary...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Beneficary updated successfully!';
  }, 'Error updating beneficary!');
}
