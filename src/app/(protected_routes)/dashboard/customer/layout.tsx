'use client'

import HomeSVG from "@/components/SVG/Home";
import { icons } from '@/assets';
import DashboardComponentWrapper from "@/components/DashboardComponentWrapper";


const navItems = [
  {
    name: "customer",
    path: `/dashboard/customer`,
    title: "Home",
    img: icons.home,
    icon: () => <HomeSVG />,
    type: "link",
  },
  // {
  //   name: "compliance",
  //   path: `/dashboard/compliance`,
  //   title: "Compliance",
  //   img: icons.overview,
  //   icon: () => <DocumentSVG />,
  //   type: "link",
  // },
  // {
  //   name: "guide",
  //   path: `/dashboard/guide`,
  //   title: "Setup Guide",
  //   img: icons.overview,
  //   icon: () => <ScanSVG />,
  //   type: "link",
  // },
  // {
  //   name: 'direct-debit',
  //   title: "Paythru BNPL",
  //   type: "collapse",
  //   children: [
  //     {
  //       name: 'directdebit_dashboard',
  //       path: `/dashboard/directdebit/directdebit_dashboard`,
  //       title: "Dashboard",
  //       img: icons.refundme,
  //       icon: () => <DashboardSVG />,
  //       type: "link"
  //     },
  //     {
  //       name: 'accounts',
  //       path: `/dashboard/directdebit/accounts`,
  //       title: "Accounts",
  //       img: icons.refundme,
  //       icon: () => <BankSVG />,
  //       type: "link"
  //     },
  //     {
  //       name: 'products',
  //       path: `/dashboard/directdebit/products`,
  //       title: "Products",
  //       img: icons.refundme,
  //       icon: () => <ProductSVG />,
  //       type: "link"
  //     },
  //     {
  //       name: 'transactions',
  //       path: `/dashboard/directdebit/transactions`,
  //       title: "Transactions",
  //       img: icons.refundme,
  //       icon: () => <TransactionsSVG />,
  //       type: "link"
  //     },
  //     {
  //       name: 'mandates',
  //       path: `/dashboard/directdebit/mandates`,
  //       title: "Mandates management",
  //       img: icons.refundme,
  //       icon: () => <MandatesSVG />,
  //       type: "link"
  //     },
  //   ]
  // },
];
export default function CuatomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardComponentWrapper navItems={navItems}>
      {children}
    </DashboardComponentWrapper>
  );
}
