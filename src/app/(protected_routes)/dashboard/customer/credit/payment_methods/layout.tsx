'use client'
import Modal from "@/components/Modal";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";
import ConfigureDirectDebit from "./components/DirectDebit/ConfigureDirectDebit";
import WalletFundAccountModal from "./components/Wallet/WalletFundAccountModal";
// import CreateProduct from "./components/CreateProduct";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [ShowConfigureDD, setShowConfigureDD] = useState(false);
    const [showFundWallet, setShowFundWallet] = useState(false);
    const pathname = usePathname().split('/')[4];
  const navItems = [
    {
        name: undefined,
        path: `/dashboard/credit/payment_methods`,
        title: "Wallet",
    },
    {
        name: 'directdebit',
        path: `/dashboard/credit/payment_methods/directdebit`,
        title: "BNPL",
    },
  ];
  const checkIsActive = (route: string | undefined) => {
    return route === pathname;
  };
  return (
    <>
        <div className="w-full h-full flex flex-col justify-between items-start px-5 pt-4">
            <div className="w-full min-h-16 flex flex-row justify-between items-center">
                <div className="bg-white rounded-3xl h-14 flex flex-row justify-between items-center w-fit px-3 py-2 gap-2">
                    {
                        navItems.map((itm) => (
                            <Link
                                className="text-black px-6 h-full rounded-full flex justify-center items-center"
                                href={itm.path}
                                key={itm.path}
                                style={{
                                    background: checkIsActive(itm.name) ? '#F5F5F5' : 'transparent'
                                }}
                            >
                                {itm.title}
                            </Link>
                        ))
                    }
                </div>
                <div>
                    {
                        pathname === undefined && (
                            <button
                                onClick={() => setShowFundWallet(true)}
                                className="bg-[#F55F64] flex flex-row justify-evenly items-center text-white px-10 py-3 rounded">
                                <svg className="mr-5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 11H1.5C0.948 11 0.5 10.552 0.5 10C0.5 9.448 0.948 9 1.5 9H19.5C20.052 9 20.5 9.448 20.5 10C20.5 10.552 20.052 11 19.5 11Z" fill="white"/>
                                    <path d="M10.5 20C9.948 20 9.5 19.552 9.5 19V1C9.5 0.448 9.948 0 10.5 0C11.052 0 11.5 0.448 11.5 1V19C11.5 19.552 11.052 20 10.5 20Z" fill="white"/>
                                </svg>
                                <span className="font-medium">Fund Wallet</span>
                            </button>
                        )
                    }
                    {
                        pathname === 'directdebit' && (
                            <button
                                onClick={() => setShowConfigureDD(true)}
                                className="bg-[#F55F64] flex flex-row justify-evenly items-center text-white px-10 py-3 rounded">
                                <svg className="mr-5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 11H1.5C0.948 11 0.5 10.552 0.5 10C0.5 9.448 0.948 9 1.5 9H19.5C20.052 9 20.5 9.448 20.5 10C20.5 10.552 20.052 11 19.5 11Z" fill="white"/>
                                    <path d="M10.5 20C9.948 20 9.5 19.552 9.5 19V1C9.5 0.448 9.948 0 10.5 0C11.052 0 11.5 0.448 11.5 1V19C11.5 19.552 11.052 20 10.5 20Z" fill="white"/>
                                </svg>
                                <span className="font-medium">Configure BNPL</span>
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="w-full h-[calc(100%-5rem)] flex flex-col justify-between items-start bg-white">
                {children}
            </div>
        </div>
        {
            ShowConfigureDD && (
                <Modal
                    onClose={() => setShowConfigureDD(false)}
                    open={ShowConfigureDD}
                    title={""}
                    overrideStyle={{
                        maxWidth: '450px',
                        width: '90%',
                        height: '80vh',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        left: '0',
                        right: '0',
                        top: '5%',
                        borderRadius: '20px'
                    }}
                    hideClose={false}
                >
                    <ConfigureDirectDebit handleDone={() => setShowConfigureDD(false)} />
                </Modal>
            )
        }
        <WalletFundAccountModal
            showAccDetails={showFundWallet}
            setShowAccDetails={setShowFundWallet}
            handleGetWalletDetails={() => {}}
        />
    </>
  );
}
