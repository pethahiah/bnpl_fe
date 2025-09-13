import toast from "react-hot-toast";
// import { open } from "../pages/Share/shareSlice";

export const scrollUp = () => {
  window.scroll({ top: 0, behavior: 'smooth' });
};

// export const navigatorShare = async (payload, dispatch) => {
//   if(navigator.share) {
//     try {
//       await navigator.share(payload);
//       toast.success('Share successfull');
//     } catch(err) {
//       toast.error('Error Sharing Item.');
//     }
//   } else {
//     dispatch(open({
//       open: true,
//       title: payload.title,
//       url: payload.url,
//       text: payload.text,
//       email: payload.email,
//     }));
//   }
// }

export const formateDateForReport = (date: string) => {
  date = new Date(date).toISOString().replaceAll('Z', ' ').replaceAll('T', ' ').split('.')[0];
  return date;
}

// export const handleShareAzatMe = (dispatch) => {
//   navigatorShare({
//     title: 'You are invited to Experience Pensphere',
//     text: 'Join the numerous satisfied Nigerians managing their finances and collecting funds for their business with Azatme. Click the link to begin your new Journey.',
//     url: window.location,
//     email: '',
//   }, dispatch);
// }

// export const sortDateHandler = (a, b) => {
//   return 1;
// }

export const formatCurrency = ({ num, currency = "NGN", withSymbol = true, locale = "en-US", currencyDisplay = 'narrowSymbol' }: { num: string | number | null | undefined, currency?: string, withSymbol?: boolean, locale?: string, currencyDisplay?: 'narrowSymbol' | 'symbol' | 'code' | 'name' }): string | null => {
  if (num === null || num === undefined) {
    return null;
  }

  const numInt = parseFloat(num.toString());

  const res = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay
  }).format(numInt)

  if (!withSymbol) {
    return res.substring(1);
  }

  return res
}

export const shortenText = (text: string, by: number) => {
  if (text?.length > by) {
    return `${text.slice(0, by)}...`;
  }
  return text;
}

export const getAbbr = (text: string | null) => {
  if (!text) return null
  const arr = text.split(" ");
  const resArr: string[] = [];
  arr.forEach((i, index) => {
    if (i.length > 2 || index === 0) {
      resArr.push(i[0])
    }
  })
  return resArr[1] ? `${resArr[0]}${resArr[1]}`.toUpperCase() : `${resArr[0]}`.toUpperCase()
}
