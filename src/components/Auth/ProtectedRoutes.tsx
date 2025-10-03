"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";

export default function ProtectedRoute({ children }:{
  children: React.ReactNode;
}): any {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/login");
    
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="w-screen h-screen flex justify-center items-center"><LoaderIcon /></div>;
  }

  return session ? children : null;
}
