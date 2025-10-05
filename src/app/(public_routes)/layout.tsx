"use client"

import PublicRoutes from "@/components/Auth/PublicRoutes";
import React from "react";

export default function ProtectedPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicRoutes>
      {children}
    </PublicRoutes>
  )
}