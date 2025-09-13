"use client";

import axios, { AxiosError } from "axios";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";

// axios.interceptors.response.use((response) => {
//   return response;
// }, function (error: AxiosError) {
  // if (error?.response?.status === 401) {
  //   signOut();
  //   window.location.href = '/';
  // }
  // return Promise.reject(error);
// });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (<SessionProvider>
    <TokenProvider>{children}</TokenProvider>
  </SessionProvider>);
}

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    //@ts-expect-error - This will error in strict mode
    axios.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }, [session]);
  return (
    <>{children}</>
  )
}