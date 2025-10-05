'use client'
import Modal from "@/components/Modal";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";
import CreatePaymentItem from "./components/CreatePaymentItem";
import TabComponent from "@/components/TabComponent";
import { icons } from "@/assets";

export default function PaymentItemLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showCreatePaymentItem, setShowCreatePaymentItem] = useState(false);
    const navItems = [
        {
            name: undefined,
            path: `/dashboard/credit/payees`,
            title: "All Payment items",
            action: [
                {
                    label: "Create Payment Item",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreatePaymentItem(true)
                },
            ]
        },
    ];
    
    return (
        <>
            <TabComponent navItems={navItems}>
                {children}
            </TabComponent>
            {
                showCreatePaymentItem && (
                    <Modal
                        onClose={() => setShowCreatePaymentItem(false)}
                        open={showCreatePaymentItem}
                        title={""}
                        overrideStyle={{
                            width: '100vw',
                            height: '100vh',
                        }}
                        hideClose={true}
                    >
                        <CreatePaymentItem handleClose={() => setShowCreatePaymentItem(false)} />
                    </Modal>
                )
            }
        </>
    );
}
