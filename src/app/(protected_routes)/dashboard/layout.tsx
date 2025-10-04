"use client"

import { useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDashboardRouteFor } from "@/hooks/useUserType"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { status, data: session } = useSession()

  const usertype = useMemo(() => session?.user?.usertype || null, [session, status])

  useEffect(() => {
    if (status !== "authenticated") return
    if (!pathname?.startsWith("/dashboard")) return

    const expectedRoot = useDashboardRouteFor(usertype)
    if (!pathname.startsWith(expectedRoot)) {
      // Replace so we don't pollute history and to avoid loops
      router.replace(expectedRoot)
    }
  }, [status, usertype, pathname, router])

  // Show loading state while checking authentication and access
  if (status === "loading" || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-peth-red mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  )
}
