'use client'

import HomeSVG from "@/components/SVG/Home";
import { icons } from '@/assets';
import DashboardComponentWrapper from "@/components/DashboardComponentWrapper";
import DocumentSVG from "@/components/SVG/DocumentsSVG";
import RefundMeSVG from "@/components/SVG/Product";


const navItems = [
  {
    name: "merchant",
    path: `/dashboard/merchant`,
    title: "Home",
    img: icons.home,
    icon: () => <HomeSVG />,
    type: "link",
  },
  {
    name: "stores",
    path: `/dashboard/merchant/stores`,
    title: "Stores",
    icon: () => <RefundMeSVG />,
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
export default function MerchantDashboardLayout({
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
