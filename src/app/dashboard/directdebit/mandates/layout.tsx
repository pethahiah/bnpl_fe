'use client'
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateMandate from "./components/CreateMandate";
import CreateMandateRequest from "./components/NewMandateRequest";
import { icons } from "@/assets";
import TabComponent from "@/components/TabComponent";

export default function MandateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showCreateMandate, setShowCreateMandate] = useState(false);
    const [showCreateMandateRequest, setShowCreateMandateRequest] = useState(false);
    const navItems = [
        {
            name: undefined,
            path: `/dashboard/directdebit/mandates`,
            title: "All Mandates",
            action: [
                {
                    label: "Create Mandate",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreateMandate(true)
                },
            ]
        },
        {
            name: "requests",
            path: `/dashboard/directdebit/mandates/requests`,
            title: "Mandates Requests",
            action: [
                {
                    label: "New Request",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreateMandateRequest(true)
                },
            ]
        },
        {
            name: "wizard",
            path: `/dashboard/directdebit/mandates/wizard`,
            title: "Mandates Wizard",
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
                        <CreateMandate
                            handleClose={() => setShowCreateMandate(false)}
                        />
                    </Modal>
                )
            }
            {
                showCreateMandateRequest && (
                    <Modal
                        onClose={() => setShowCreateMandateRequest(false)}
                        open={showCreateMandateRequest}
                        title={""}
                        overrideStyle={{
                            width: '100vw',
                            height: '100vh',
                        }}
                        hideClose={true}
                    >
                        <CreateMandateRequest
                            handleClose={() => setShowCreateMandateRequest(false)}
                        />
                    </Modal>
                )
            }
        </>
    );
}
