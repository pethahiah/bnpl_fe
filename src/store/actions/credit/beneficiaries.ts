import { addBeneficiariesList, addBeneficiareies } from "@/store/slice/beneficiariesSlice";
import { appDispatch } from "@/store/store";
import getBaseURL from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import { IAddBeneficiaryReqData } from "@/utils/type";
import axios from "axios";

const url = (getBaseURL() as string) + "api/v1/pension/Beneficiary";

export const getBeneficiariesList = (isSilent: boolean = false) => {
  const call = axios.get(`${url}/list`)
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      appDispatch(addBeneficiariesList(resp.data.data))
      return resp.data.message || 'Schedules loaded successfully!';
    }, 'Error loading schedules!', undefined, () => {
      appDispatch(addBeneficiariesList([]));
    });
  } else {
    toastWrapper(call, 'Loading schedules...', (resp) => {
      appDispatch(addBeneficiariesList(resp.data.data))
      return resp.data.message || 'Sc loaded successfully!';
    }, 'Error loading employees!', undefined, () => {
      appDispatch(addBeneficiariesList([]));
    });
  }
}

export const getBeneficiaries = (id: string, isSilent = false, handleDone = (data: any) => {}) => {
  const call = axios.get(`${url}/${id}/details`)
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      appDispatch(addBeneficiareies(resp.data.data));
      handleDone(resp);
      return resp.data.message || 'Schedule loaded successfully!';
    }, 'Error loading schedule!');
  } else {
    toastWrapper(call, 'Loading schedule...', (resp) => {
      appDispatch(addBeneficiareies(resp.data.data))
      return resp.data.message || 'Schedule loaded successfully!';
    }, 'Error loading schedule!');
  }
}

export const addBeneficiary = (data: IAddBeneficiaryReqData, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/add`, data)
  toastWrapper(call, 'Adding schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule added successfully!';
  }, 'Error adding schedule!');
}

export const deleteBeneficiaryList = (id: string, handleDone: (arg0: any) => void) => {
  const call = axios.delete(`${url}/remove/${id}`)
  toastWrapper(call, 'Deleting schedule...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Schedule deleted successfully!';
  }, 'Error deleting schedule list!');
}

export const deleteBeneficiaryItem = (id: string, handleDone: (arg0: any) => void) => {
  const call = axios.delete(`${url}/item/${id}/remove`)
  toastWrapper(call, 'Deleting beneficiary...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Beneficary deleted successfully!';
  }, 'Error deleting beneficiary!');
}

export const updateBeneficiary = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}/update`, data)
  toastWrapper(call, 'Updating beneficary...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Beneficary updated successfully!';
  }, 'Error updating beneficary!');
}
