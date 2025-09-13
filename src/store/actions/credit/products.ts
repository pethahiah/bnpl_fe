import { addProduct } from "@/store/slice/productSlice";
import { appDispatch } from "@/store/store";
import { silentHTTPCaller, toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_IDENTITY;
const headers = {
  ApplicationId: process.env.NEXT_PUBLIC_API_KEY || ''
}
export const getProducts = (handleDone: () => void, isSilent = false) => {
  const call = axios.get(`${url}Product/my-product`, {
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

export const uploadDoc = (data: Record<string, any>, handleDone: () => void) => {
  const call = axios.post(`${url}Product/kyc/docs/upload`, data, {
    headers
  })
  toastWrapper(call, 'Uploading...', (resp) => {
    handleDone();
    return resp.data.message || 'Document uploaded successfully!';
  }, 'Error uploading document!');
}

export const goLive = (handleDone: { (): void; (): void; (): void; }) => {
  const call = axios.get(`${url}Product/go-live`, {
    headers
  })
  silentHTTPCaller(call, 'Going live...', (resp) => {
    handleDone();
    return resp.data.message || 'Action succeeded!';
  }, 'Action failed!');
}
