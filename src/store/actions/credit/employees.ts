import { addBeneficiariesList, addBeneficiareies } from "@/store/slice/beneficiariesSlice";
import { appDispatch } from "@/store/store";
import { getTransferBaseURL } from "@/utils/getBaseURL";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import { IAddBeneficiaryReqData } from "@/utils/type";
import axios from "axios";

const url = (getTransferBaseURL() as string) + "Beneficiary";
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_CREDIT_APP_ID || ''
};

export const getBeneficiariesList = (isSilent: boolean = false, handleDone = () => {}) => {
  const call = axios.get(`${url}/list`, {
    headers
  });
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      appDispatch(addBeneficiariesList(resp.data.data))
      return resp.data.message || 'Employees loaded successfully!';
    }, 'Error loading employees!');
  } else {
    toastWrapper(call, 'Loading employee lists...', (resp) => {
      appDispatch(addBeneficiariesList(resp.data.data))
      return resp.data.message || 'Employees loaded successfully!';
    }, 'Error loading employees!');
  }
}

export const getBeneficiaries = (id: string, isSilent = false, handleDone = (data: any) => {}) => {
  const call = axios.get(`${url}/${id}/details`, {
    headers
  })
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      appDispatch(addBeneficiareies(resp.data.data));
      handleDone(resp);
      return resp.data.message || 'Employees loaded successfully!';
    }, 'Error loading employees!');
  } else {
    toastWrapper(call, 'Loading employees...', (resp) => {
      appDispatch(addBeneficiareies(resp.data.data));
      handleDone(resp);
      return resp.data.message || 'Employees loaded successfully!';
    }, 'Error loading employees!');
  }
}

export const addBeneficiary = (data: IAddBeneficiaryReqData, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/add`, data, {
    headers
  })
  toastWrapper(call, 'Adding employee...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Employee added successfully!';
  }, 'Error adding employee!');
}

export const deleteBeneficiaryList = (id: string, handleDone: (arg0: any) => void) => {
  const call = axios.delete(`${url}/remove/${id}`, {
    headers
  })
  toastWrapper(call, 'Deleting employee\'s list...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Employee\'s list deleted successfully!';
  }, 'Error deleting employee list!');
}

export const deleteBeneficiaryItem = (id: string, handleDone: (arg0: any) => void) => {
  const call = axios.delete(`${url}/item/${id}/remove`, {
    headers
  });
  toastWrapper(call, 'Deleting employee...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Employee deleted successfully!';
  }, 'Error deleting employee!');
}

export const updateBeneficiary = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.put(`${url}/update`, data, {
    headers
  });
  toastWrapper(call, 'Updating employee...', (resp) => {
    handleDone(resp.data);
    return resp.data.message || 'Employees updated successfully!';
  }, 'Error updating employee!');
}
