import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BASE_IDENTITY}Users`
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
}

export const getUsers = (handleDone: (arg0: any) => void, isSilent = false) => {
  const call = axios.get(`${url}/list`)
  if (isSilent) {
    silentHTTPCaller(call, 'Loading users...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || 'Users loaded successfully!';
    }, 'Error loading users!');
  } else {
    toastWrapper(call, 'Loading users...', (resp) => {
      handleDone(resp.data);
      return resp.data.message || 'Users loaded successfully!';
    }, 'Error loading users!');
  }
}

export const createUser = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/create-user`, data)
  toastWrapper(call, 'Creating user', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error creating user!');
}

export const getRoles = (handleDone: (arg0: any) => void) => {
  const call = axios.get(`${url}/roles`)
  silentHTTPCaller(call, '', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error loading roles!');
}

export const deleteUser = (id: any, handleDone: (arg0: any) => void) => {
  const call = axios.delete(`${url}/remove/${id}`)
  toastWrapper(call, 'Deleting user', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'Error deleting user');
}

export const updateUser = (data: any, handleDone: (arg0: any) => void) => {
  const call = axios.post(`${url}/update-user`, data)
  toastWrapper(call, 'Updating user', (resp) => {
    handleDone(resp.data);
    return resp.data.message || '';
  }, 'User update failed');
}
