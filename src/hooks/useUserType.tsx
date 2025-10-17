import { useSession } from "next-auth/react"
import { useMemo } from "react"

export const useGetBaseLink = () => {
  const { status, data: session } = useSession()
  const usertype = useMemo(() => session?.user?.usertype || null, [session, status])

  if (status !== "authenticated") return "/dashboard"
  return useDashboardRouteFor(usertype || "customer")
}

export const useDashboardRouteFor = (type: "customer" | "merchant" | "admin" | null) => {
  if (!type) return "/dashboard"
  switch (type) {
    case "customer": return "/dashboard/customer"
    case "merchant": return "/dashboard/merchant"
    case "admin": return "/dashboard/admin"
    default: return "/dashboard"
  }
}