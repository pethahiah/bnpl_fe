"use client";

import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
  <SessionProvider>
    <TokenProvider>{children}</TokenProvider>
  </SessionProvider>
  );
}

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }, [session]);
  return (
    <>{children}</>
  )
}