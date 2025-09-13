const prod = process.env.NEXT_PUBLIC_BASE_URL_PROD;
const dev = process.env.NEXT_PUBLIC_BASE_DEV;

const env = process.env.NEXT_PUBLIC_DEV_ENV

const getBaseURL = () => {
  return (env && env === 'development') ? dev : prod;
};

export const getIDBaseURL = () => {
  return (env && env === 'development') ? process.env.NEXT_PUBLIC_ID_BASE_URL_DEV : process.env.NEXT_PUBLIC_ID_BASE_URL_PROD;
};

export default getBaseURL;

export const getTransferBaseURL = () => {
  return process.env.NEXT_PUBLIC_BASE_TRANSFER_SERVICE;
  // return (env && env === 'development') ? process.env.NEXT_PUBLIC_ID_BASE_URL_DEV : process.env.NEXT_PUBLIC_ID_BASE_URL_PROD;
};

