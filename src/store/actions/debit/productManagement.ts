import { addProduct } from "@/store/slice/productSlice";
import { appDispatch } from "@/store/store";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BASE_DEBIT_SERVICE}/Product`;
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
}
export const getAll = (handleDone: any, isSilent = false) => {
  const call = axios.get(`${url}Product/list`, {
    headers
  })
  if (isSilent) {
    silentHTTPCaller(call, '', (resp) => {
      if (resp.data.data.status !== "Production") {
        goLive(() => { });
      }
      handleDone();
      appDispatch(addProduct(resp.data.data));
      return resp.data.message || 'Details loaded successfully!';
    }, 'Error loading details!');
  } else {
    toastWrapper(call, 'Getting product details...', (resp) => {
      if (resp.data.data.status !== "Production") {
        goLive(() => { });
      }
      handleDone();
      appDispatch(addProduct(resp.data.data));
      return resp.data.message || 'Details loaded successfully!';
    }, 'Error loading details!');
  }
}

export const create = (data: Record<string, any>, handleDone: any) => {
  const call = axios.post(`${url}/create`, data, {
    headers
  })
  toastWrapper(call, 'Creating product...', (resp) => {
    handleDone();
    return resp.data.message || 'Product created successfully!';
  }, 'Error creating product!');
}

export const getPackages = (productId: string, handleDone: any) => {
  const call = axios.get(`${url}/packages/${productId}`, {
    headers
  })
  silentHTTPCaller(call, 'Getting packages...', (resp) => {
    handleDone();
    return resp.data.message || 'Packages loaded successfully!';
  }, 'Error loading packages!');
}

export const addPackage = (productId: string, handleDone: any) => {
    const call = axios.post(`${url}/addpackages`, {
      headers
    })
    silentHTTPCaller(call, 'Getting packages...', (resp) => {
      handleDone();
      return resp.data.message || 'Packages loaded successfully!';
    }, 'Error loading packages!');
  }
