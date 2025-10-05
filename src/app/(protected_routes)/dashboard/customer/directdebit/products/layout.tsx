'use client'
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateProduct from "./components/CreateProduct";
import { icons } from "@/assets";
import TabComponent from "@/components/TabComponent";

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    const navItems = [
        {
            name: undefined,
            path: `/dashboard/directdebit/products`,
            title: "All Products",
            action: [
                {
                    label: "New Product",
                    icon: icons.plusIcon,
                    onClick: () => setShowCreateProduct(true)
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
                showCreateProduct && (
                    <Modal
                        onClose={() => setShowCreateProduct(false)}
                        open={showCreateProduct}
                        title={""}
                        overrideStyle={{
                            maxWidth: '450px',
                            width: '90%',
                            height: '90vh',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            left: '0',
                            right: '0',
                            top: '5%',
                            borderRadius: '20px'
                        }}
                        hideClose={true}
                    >
                        <CreateProduct
                            // @ts-ignore
                            handleClose={() => setShowCreateProduct(false)}
                        />
                    </Modal>
                )
            }
        </>
    );
}
