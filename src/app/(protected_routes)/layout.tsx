"use client"

import ProtectedRoute from "@/components/Auth/ProtectedRoutes";
import React from "react";

export default function ProtectedPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}