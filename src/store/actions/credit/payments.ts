import { addPaymentHistory } from "@/store/slice/paymentsSlice";
import { appDispatch } from "@/store/store";
import getBaseURL from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = getBaseURL() as string;

export const getPaymentHistory = (period: string, isSilent = false) => {
  const periodSplit = period.split(' ');
  const params = period ? `?Year=${periodSplit[1]}&Month=${periodSplit[0].toUpperCase()}` : ''
  const call = axios.get(`${url}api/v1/pension/payment/history${params}`)

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
  const call = axios.get(`${url}api/v1/pension/Payment/${id}/pfa/items`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading PFA beneficiaries!');
}

export const getPayments = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}Payment/${id}/items`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading payments');
}

export const createSchedule = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}api/v1/pension/Payment/schedule/create`, data)
  toastWrapper(call, 'Creating payment schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Payment schedule created successfully!';
  }, 'Error creating schedule!');
}

export const removeItemFromSchedule = (beneficiaryId: any, scheduleId: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}api/v1/pension/Payment/schedule/items/remove`, {
    scheduleId,
    beneficiaryId
  });
  toastWrapper(call, 'Removing item from schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Item removed successfully!';
  }, 'Error removing item!');
}

export const addItemToSchedule = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}api/v1/pension/Payment/schedule/items/add`, data)
  toastWrapper(call, 'Adding item(s) to schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Item(s) added successfully!';
  }, 'Error adding item!');
}

export const pfaList = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/pfa/list`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data.data);
    return resp.data.message || '';
  }, 'Error getting PFAs!');
}
export const loudPfaListGetter = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/pfa/list`)
  toastWrapper(call, 'Getting PFA data...', (resp) => {
    handleDone(resp.data.data);
    return resp.data.message || '';
  }, 'Error getting PFAs!');
}

export const getEmployerInfo = (employerCode: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/employer/${employerCode}/info`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error getting employer\'s info');
}

export const getPFAInfo = (pfaCode: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}Payment/pfainfo/${pfaCode}`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error getting employer\'s info');
}

export const getSchedule = (id: any, handleDone: (arg0: any) => void, isSilent = false) => {
  const call = axios.get(`${url}api/v1/pension/Payment/schedule/${id}`)
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
  const call = axios.get(`${url}api/v1/pension/Payment/confirm/${scheduleId}`)
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
  const call = axios.post(`${url}api/v1/pension/Payment/validate`, data)
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const validatePayment = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/schedule/validate/${id}`)
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const reValidateCardPayment = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}api/v1/pension/Payment/schedule/${id}/verify/card-payment`)
  toastWrapper(call, 'Validating schedule', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule validated successfully';
  }, 'Error validating schedule');
}

export const updateScheduleBeneficiary = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}api/v1/pension/Payment/schedule/update/item`, data)
  toastWrapper(call, 'Updating beneficary...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Beneficary updated successfully!';
  }, 'Error updating beneficary!');
}