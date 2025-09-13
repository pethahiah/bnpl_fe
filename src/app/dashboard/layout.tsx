'use client'
import DashboardSideBar from "@/components/DashboardSideBar";
import BankSVG from "@/components/SVG/Bank";
import DashboardSVG from "@/components/SVG/Dashboard";
import HomeSVG from "@/components/SVG/Home";
import DocumentSVG from "@/components/SVG/DocumentsSVG";
import ScanSVG from "@/components/SVG/ScanSVG";
import TransactionsSVG from "@/components/SVG/TransactionsSVG";
import ProductSVG from "@/components/SVG/Product";
import MandatesSVG from "@/components/SVG/WalletSVG";
import { icons } from '../../assets';
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/Auth/ProtectedRoutes";
import { useSession } from "next-auth/react";
import { getAbbr } from "@/utils/common";
import { useEffect, useState } from "react";
import { appDispatch } from "@/store/store";
import { toggleSideNav } from "@/store/slice/dashboardSlice";


const navItems = [
  {
    name: "dashboard",
    path: `/dashboard`,
    title: "Home",
    img: icons.home,
    icon: () => <HomeSVG />,
    type: "link",
  },
  {
    name: "compliance",
    path: `/dashboard/compliance`,
    title: "Compliance",
    img: icons.overview,
    icon: () => <DocumentSVG />,
    type: "link",
  },
  // {
  //   name: "guide",
  //   path: `/dashboard/guide`,
  //   title: "Setup Guide",
  //   img: icons.overview,
  //   icon: () => <ScanSVG />,
  //   type: "link",
  // },
  {
    name: 'direct-debit',
    title: "Paythru Direct Debit",
    type: "collapse",
    children: [
      {
        name: 'directdebit_dashboard',
        path: `/dashboard/directdebit/directdebit_dashboard`,
        title: "Dashboard",
        img: icons.refundme,
        icon: () => <DashboardSVG />,
        type: "link"
      },
      {
        name: 'accounts',
        path: `/dashboard/directdebit/accounts`,
        title: "Accounts",
        img: icons.refundme,
        icon: () => <BankSVG />,
        type: "link"
      },
      {
        name: 'products',
        path: `/dashboard/directdebit/products`,
        title: "Products",
        img: icons.refundme,
        icon: () => <ProductSVG />,
        type: "link"
      },
      {
        name: 'transactions',
        path: `/dashboard/directdebit/transactions`,
        title: "Transactions",
        img: icons.refundme,
        icon: () => <TransactionsSVG />,
        type: "link"
      },
      {
        name: 'mandates',
        path: `/dashboard/directdebit/mandates`,
        title: "Mandates management",
        img: icons.refundme,
        icon: () => <MandatesSVG />,
        type: "link"
      },
    ]
  },
  {
    name: 'credit',
    title: "Paythru Credit",
    type: "collapse",
    children: [
      {
        name: 'credit_dashboard',
        path: `/dashboard/credit/credit_dashboard`,
        title: "Dashboard",
        img: icons.refundme,
        icon: () => <DashboardSVG />,
        type: "link"
      },
      {
        name: 'bankcodes',
        path: `/dashboard/credit/bankcodes`,
        title: "Bankcodes",
        img: icons.refundme,
        icon: () => <BankSVG />,
        type: "link"
      },
      {
        name: 'payees',
        path: `/dashboard/credit/payees`,
        title: "Payees",
        img: icons.refundme,
        icon: () => <TransactionsSVG />,
        type: "link"
      },
      {
        name: 'payments',
        path: `/dashboard/credit/payments`,
        title: "Payments",
        img: icons.refundme,
        icon: () => <MandatesSVG />,
        type: "link"
      },
      {
        name: 'payment_methods',
        path: `/dashboard/credit/payment_methods`,
        title: "Payment methods",
        img: icons.refundme,
        icon: () => <ProductSVG />,
        type: "link"
      },
    ]
  },
];
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname()
  const exactPath = pathName.split('/').at(-1);
  const { data: session } = useSession()

  const [userDetails, setUserDetails] = useState<{
    firstname: string | null;
    lastname: string | null;
    email: string | null | undefined;
    companyName: string | null | undefined;
  }>({
    firstname: null,
    lastname: null,
    email: null,
    companyName: null
  })

  useEffect(() => {
    setUserDetails({
      //@ts-expect-error - This will error in strict mode
      firstname: session?.user?.firstname,
      //@ts-expect-error - This will error in strict mode
      lastname: session?.user?.lastname,
      email: session?.user?.email,
      //@ts-expect-error - This will error in strict mode
      companyName: session?.user?.companyName
    })
  }, [session])

  const getTitle = (arr: Array<any>): string | undefined => {
    const res = arr.map((single) => {
      if (single.type === "collapse" && single.children) {
        return getTitle(single.children)
      } else {
        if (single.name === exactPath) {
          return single.title
        }
      }
    });

    return res.find((i: string | undefined) => i !== undefined);
  }
  const pathTitle = getTitle(navItems)

  return (
    <ProtectedRoute>
      <div className="w-[100vw] h-[100vh] flex flex-row justify-between items-start relative bg-[#F5F5F5]">
        <DashboardSideBar
          items={navItems} firstItem={""}
        />
        <div className="min-h-[100vh] h-full flex-1 flex flex-grow flex-col">
          <div className="!sticky top-0 z-[5] lg:!relative w-[100%] h-[80px] bg-white px-[20px] py-[10px] flex justify-between items-center shadow-sm">
            {/* desktop */}
            <div className="text-left hidden lg:block">
              <h4 className='text-[18px] font-[500] flex flex-row items-center capitalize'>

                {pathTitle || "PayThru Direct Debit"}
              </h4>
              <p className='w-max text-left text-[12px] font-[400] text-[#222222CC]'></p>
            </div>

            <div className="w-fit hidden lg:flex flex-row justify-between items-center">
              <div className="top-profile cursor-pointer flex  justify-center items-center p-[10px] rounded-full gap-[10px] lg:bg-[#F55F640D]">
                <div className="profile-pic w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#F55F64] text-[16px] font-[500] text-[white]">

                  {getAbbr(`${userDetails?.lastname} ${userDetails?.firstname}`)}
                </div>
                <div className="flex flex-col gap-1 text-left h-auto">

                  <p className="text-[14px] font-semibold leading-[100%]">{userDetails?.companyName}</p>
                  <p className="text-[12px] font-light leading-[100%] text-[#222222CC]">{userDetails?.email}</p>
                </div>
              </div>
            </div>

            {/* mobile */}
            <div className="flex lg:hidden justify-center items-center gap-[10px]">
              <div className="profile-pic w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#0898A0] text-[16px] font-[500] text-[white]">
                {getAbbr(`${userDetails?.lastname} ${userDetails?.firstname}`)}
              </div>
              <div className="flex flex-col gap-1 text-left h-auto">
                <h4 className="text-[16px] font-semibold leading-[100%] text-[#222222CC]">{userDetails?.companyName}</h4>
                <p className="text-[12px] font-light leading-[100%] text-[#222222CC]">{userDetails?.email}</p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              className='cursor-pointer flex lg:hidden'
              onClick={() => {
                appDispatch(toggleSideNav(true));
              }}
            >
              <path d="M19 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1C20 1.26522 19.8946 1.51957 19.7071 1.70711C19.5196 1.89464 19.2652 2 19 2ZM20 7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H1C0.734784 6 0.48043 6.10536 0.292893 6.29289C0.105357 6.48043 0 6.73478 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89464 0.734784 8 1 8H19C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7ZM20 13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13Z" fill="black" />
            </svg>
          </div>
          <div className="w-full h-full overflow-auto">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
