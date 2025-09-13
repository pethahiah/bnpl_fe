import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { store } from "../store/store";
import { updateLoader } from "../store/slice/loaderSlice";
import { trackAction, trackErrors } from "./tracker";

export const controller = new AbortController();

export const signalObj = { signal: controller.signal };

// axios.get('/foo/bar', {
//    signal: controller.signal
// }).then(function(response) {
//    //...
// });
// // cancel the request
// controller.abort()

export const toastWrapper = (
  axiosCall: Promise<unknown>, 
  loadingText: string, 
  successCB?: (resp?: any) => any, 
  errorText?: string,
  errorCallBack?: ((error: AxiosError) => string),
  errorAction?: () => void,
) => {
  store.dispatch(updateLoader(true));
  toast.promise(
    axiosCall,
      {
        loading: loadingText,
        success: (resp) => {
          store.dispatch(updateLoader(false));
          trackAction(`${loadingText} - Done`, loadingText);
          return successCB && successCB(resp);
        },
        error: (error) => {
          store.dispatch(updateLoader(false));
          errorAction && errorAction();
          if (error?.message === 'Network Error') {
            trackErrors(`Network Error - ${loadingText}`, true);
            return 'Network Error';
          }
          if (error?.response?.status) {
            trackErrors(`${error.response.data.message || errorText} - ${loadingText}`, true);
            return errorCallBack ? errorCallBack(error) : error.response.data.message || error.response.data.error || errorText;
          }
          if (error.message) {
            return error.message;
          }
          trackErrors(`${errorText} - ${loadingText}`, true);
          return errorCallBack ? errorCallBack(error) : errorText;
        },
      },
      {
      style: {
        minWidth: '250px',
        fontWeight: 'bold',
      },
    }
  );
};

export const silentHTTPCaller = async (
  axiosCall: Promise<unknown>, 
  loadingText: string, 
  successCB?: (resp: any) => any, 
  errorText?: string,
  errorCallBack?: ((error: AxiosError) => string),
  errorAction?: () => void,
) => {
  store.dispatch(updateLoader(true));
  try {
    const resp = await axiosCall;
    store.dispatch(updateLoader(false));
    trackAction(`${loadingText} - Done`, loadingText);
    return successCB && successCB(resp);
  } catch (error) {
    store.dispatch(updateLoader(false));
    errorAction && errorAction();
    // @ts-ignore
    if (error?.message === 'Network Error') {
      trackErrors(`Network Error - ${loadingText}`, true);
      toast.error('Network Error');
      return 'Network Error';
    }
    // @ts-ignore
    if (error?.response?.status) {
      // @ts-ignore
      trackErrors(`${error.response.data.message || errorText} - ${loadingText}`, true);
      // @ts-ignore
      toast.error(`${error.response.data.message || errorText} - ${loadingText}`);
      // @ts-ignore
      return errorCallBack ? errorCallBack(error) : error.response.data.message || errorText;
    }
    trackErrors(`${errorText} - ${loadingText}`, true);
    toast.error(`${errorText} - ${loadingText}`);
    // @ts-ignore
    return errorCallBack ? errorCallBack(error) : errorText;
  }
};
