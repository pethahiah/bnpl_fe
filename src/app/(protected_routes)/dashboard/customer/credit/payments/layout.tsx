'use client'

import Modal from "@/components/Modal";
import { useState } from "react";
import TabComponent from "@/components/TabComponent";
import { icons } from "@/assets";
import CreatePayment from "./components/CreatePayment";

export default function MandateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showCreateMandate, setShowCreateMandate] = useState(false);
    const navItems = [
        {
            name: undefined,
            path: `/dashboard/credit/payments`,
            title: "All Payments",
            action: [
                {
                    label: "Create Payment",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreateMandate(true)
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
                showCreateMandate && (
                    <Modal
                        onClose={() => setShowCreateMandate(false)}
                        open={showCreateMandate}
                        title={""}
                        overrideStyle={{
                            width: '100vw',
                            height: '100vh',
                        }}
                        hideClose={true}
                    >
                        <CreatePayment
                            handleClose={() => setShowCreateMandate(false)}
                        />
                    </Modal>
                )
            }
        </>
    );
}
