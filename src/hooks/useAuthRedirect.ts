"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email || !email.toLocaleLowerCase().match(emailPattern)) {
      localStorage.removeItem('email');
      router.replace('/login');
    }
  }, []);
};

export default useAuthRedirect;
