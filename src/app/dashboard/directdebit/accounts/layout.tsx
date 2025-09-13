'use client'
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import TabComponent from "@/components/TabComponent";
import { icons } from "@/assets";

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const navItems = [
        {
            name: undefined,
            path: `/dashboard/directdebit/accounts`,
            title: "All Accounts",
            action: [
                {
                    label: "New Account",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreateAccount(true)
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
                showCreateAccount && (
                    <Modal
                        onClose={() => setShowCreateAccount(false)}
                        open={showCreateAccount}
                        title={""}
                        overrideStyle={{
                            maxWidth: '450px',
                            width: '90%',
                            height: 'fit-content',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            left: '0',
                            right: '0',
                            top: '5%',
                            borderRadius: '20px'
                        }}
                        hideClose={true}
                    >
                        <CreateAccount
                            // @ts-ignore
                            handleClose={() => setShowCreateAccount(false)}
                        />
                    </Modal>
                )
            }
        </>
    );
}
