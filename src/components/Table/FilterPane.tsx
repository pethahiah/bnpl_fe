'use client'
import { icons } from "@/assets"
import Button from "../Button"
import Input, { Select } from "../Input"
import Modal from "../Modal"
import SearchInputComponent from "../SearchInputComponent"
import TopLayout from "../TopLayout"
import { useState } from "react"
import Image from "next/image"

const FilterPane = () => {
    const [showFilterModal, setShowFilterModal] = useState(false)
    return (
        <>
            <TopLayout
                leftComponents={[
                    <SearchInputComponent />
                ]}
                rightComponents={[
                    <Button label="Filter by" type="containedBlack" className="!bg-[#2222220D] !border-none !m-0" leftIcon={<Image src={icons.filterIcon} width={18} height={18} alt="filter" />}
                        onClick={() => setShowFilterModal(true)}
                    />,
                    <Button label="Export" type="containedBlack" className="!bg-[#222222] !text-white !border-none !m-0" leftIcon={<Image src={icons.download} width={18} height={18} alt="export" />} />
                ]}
            />
            <Modal
                onClose={() => setShowFilterModal(false)}
                open={showFilterModal}
                title={"Filter by"}
                className="!w-[90vw] sm:!w-[400px] !h-auto"
                overrideStyle={{
                    top: '10%',
                    marginLeft: '40%',
                    padding: '20px'
                }}
            >
                <form className="">
                    <Select
                        label="Transaction Type"
                        data={["Credit", "Debit"]}
                        type="text"
                        name="type"
                        placeholder="Select Type"
                        selectClassName="!border-[#2222221A] !bg-[transparent] !px-3 !rounded-[5px]"
                    />
                    <Select
                        label="Status"
                        data={["Successful", "Pending", "failed"]}
                        type="text"
                        name="status"
                        placeholder="Select Status"
                        selectClassName="!border-[#2222221A] !bg-[transparent] !px-3 !rounded-[5px]"
                    />

                    <div className="w-full flex flex-wrap justify-between">
                        <label htmlFor="" className="w-full text-[#66676d] text-[14px]" >Date Range</label>
                        <Input
                            type="date" name="date-range" value="" label="Start Date"
                            className="!border-[#2222221A] !bg-[transparent] !px-3 !rounded-[5px] !w-[49%] !m-o" 
                        />
                        <Input
                            type="date" name="date-range" value="" label="End Date"
                            className="!border-[#2222221A] !bg-[transparent] !px-3 !rounded-[5px] !w-[49%] !m-o"
                        />
                    </div>

                    <div className="flex justify-center gap-2 w-full mt-3">
                        <Button label="Reset" type="contained" className="!w-[130px] !m-0 " />
                        <Button label="Apply Filter" type="flat" className="!w-[130px] !m-0" />
                    </div>
                </form>
            </Modal>
        </>
    )
};

export default FilterPane;
