const prod = process.env.NEXT_PUBLIC_BASE_URL_PROD;
const dev = process.env.NEXT_PUBLIC_BASE_DEV;

const env = process.env.NEXT_PUBLIC_DEV_ENV

const getBaseURL = () => {
  return (env && env === 'development') ? dev : prod;
};

export default getBaseURL;