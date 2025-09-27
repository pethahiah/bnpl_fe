import { FormEvent, useState } from "react"
import Input, { Select as SelectComponent } from '../../../../../components/Input';
import AddEmployees from "./AddEmployees";


const Step1 = () => {
    return (
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 3C25.0608 3 27.5965 3.50438 29.9623 4.48435C32.3282 5.46432 34.4778 6.90068 36.2886 8.71142C38.0993 10.5222 39.5357 12.6718 40.5157 15.0377C41.4956 17.4035 42 19.9392 42 22.5C42 25.0608 41.4956 27.5965 40.5156 29.9623C39.5357 32.3282 38.0993 34.4778 36.2886 36.2886C34.4778 38.0993 32.3282 39.5357 29.9623 40.5157C27.5965 41.4956 25.0608 42 22.5 42C19.9392 42 17.4035 41.4956 15.0377 40.5156C12.6718 39.5357 10.5222 38.0993 8.71141 36.2886C6.90067 34.4778 5.46431 32.3282 4.48435 29.9623C3.50438 27.5965 3 25.0608 3 22.5C3 19.9392 3.50439 17.4035 4.48435 15.0377C5.46432 12.6718 6.90068 10.5222 8.71143 8.71141C10.5222 6.90067 12.6718 5.46431 15.0377 4.48434C17.4035 3.50438 19.9392 3 22.5 3L22.5 3Z" stroke="#F55F64" strokeOpacity="0.15" strokeWidth="6"/>
            <path d="M22.5 3C26.3567 3 30.1269 4.14366 33.3336 6.28634C36.5404 8.42903 39.0397 11.4745 40.5157 15.0377C41.9916 18.6008 42.3777 22.5216 41.6253 26.3043C40.8729 30.0869 39.0157 33.5615 36.2886 36.2886" stroke="#F55F64" strokeWidth="6"/>
        </svg>
    )
}

const Step2 = () => {
    return (
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 3C25.0608 3 27.5965 3.50438 29.9623 4.48435C32.3282 5.46432 34.4778 6.90068 36.2886 8.71142C38.0993 10.5222 39.5357 12.6718 40.5157 15.0377C41.4956 17.4035 42 19.9392 42 22.5C42 25.0608 41.4956 27.5965 40.5156 29.9623C39.5357 32.3282 38.0993 34.4778 36.2886 36.2886C34.4778 38.0993 32.3282 39.5357 29.9623 40.5157C27.5965 41.4956 25.0608 42 22.5 42C19.9392 42 17.4035 41.4956 15.0377 40.5156C12.6718 39.5357 10.5222 38.0993 8.71141 36.2886C6.90067 34.4778 5.46431 32.3282 4.48435 29.9623C3.50438 27.5965 3 25.0608 3 22.5C3 19.9392 3.50439 17.4035 4.48435 15.0377C5.46432 12.6718 6.90068 10.5222 8.71143 8.71141C10.5222 6.90067 12.6718 5.46431 15.0377 4.48434C17.4035 3.50438 19.9392 3 22.5 3L22.5 3Z" stroke="#F55F64" strokeOpacity="0.15" strokeWidth="6"/>
            <path d="M22.5 3C25.7068 3 28.8641 3.79086 31.6922 5.30253C34.5204 6.81421 36.9321 9.00003 38.7137 11.6664C40.4953 14.3327 41.5918 17.3973 41.9061 20.5887C42.2204 23.78 41.7428 26.9996 40.5157 29.9623C39.2885 32.925 37.3496 35.5393 34.8707 37.5737C32.3918 39.6081 29.4494 40.9997 26.3043 41.6253C23.1591 42.2509 19.9082 42.0912 16.8394 41.1603C13.7707 40.2295 10.979 38.5561 8.71142 36.2886" stroke="#F55F64" strokeWidth="6"/>
        </svg>
    )
}

const Step3 = () => {
    return (
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 3C25.0608 3 27.5965 3.50438 29.9623 4.48435C32.3282 5.46432 34.4778 6.90068 36.2886 8.71142C38.0993 10.5222 39.5357 12.6718 40.5157 15.0377C41.4956 17.4035 42 19.9392 42 22.5C42 25.0608 41.4956 27.5965 40.5156 29.9623C39.5357 32.3282 38.0993 34.4778 36.2886 36.2886C34.4778 38.0993 32.3282 39.5357 29.9623 40.5157C27.5965 41.4956 25.0608 42 22.5 42C19.9392 42 17.4035 41.4956 15.0377 40.5156C12.6718 39.5357 10.5222 38.0993 8.71141 36.2886C6.90067 34.4778 5.46431 32.3282 4.48435 29.9623C3.50438 27.5965 3 25.0608 3 22.5C3 19.9392 3.50439 17.4035 4.48435 15.0377C5.46432 12.6718 6.90068 10.5222 8.71143 8.71141C10.5222 6.90067 12.6718 5.46431 15.0377 4.48434C17.4035 3.50438 19.9392 3 22.5 3L22.5 3Z" stroke="#F55F64" strokeOpacity="0.15" strokeWidth="6"/>
            <path d="M19.6364 3.21141C24.315 2.51682 29.0866 3.5464 33.0624 6.10839C37.0383 8.67039 39.9475 12.5901 41.2482 17.1376C42.5489 21.6851 42.1524 26.5504 40.1325 30.8273C38.1127 35.1042 34.6072 38.5011 30.269 40.3856C25.9307 42.27 21.0554 42.5134 16.551 41.0704C12.0467 39.6274 8.22028 36.5965 5.78452 32.542C3.34875 28.4876 2.46965 23.686 3.31094 19.0316C4.15222 14.3772 6.65654 10.1871 10.3575 7.2419" stroke="#F55F64" strokeWidth="6"/>
        </svg>
    )
}


const CreatePaymentItem = ({ handleClose }: any) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [data, setData] = useState({
       "productId": '',
        "paymentAmount": '',
        "serviceReference": "",
        "remarks": "",
        "accountNumber": "",
        "bankCode": "",
        "accountName": "",
        "phoneNumber": "",
        "homeAddress": "",
        "fileName": "",
        "description": "",
        "fileBase64String": "",
        "fileExtension": "",
        "startDate": "",
        "endDate": "",
        "emailAddress": "",
        "paymentFrequency": "",
        "packageId": 0,
        "referenceCode": "",
        "collectionAccountNumber": "",
        "collectionAccountName": "",
        "Payment ItemType": "",
        "routingOption": "Default",
        "requestCode": ""
    });
    const stepper = {
        1: {
            title: 'Item information',
            Icon: Step1,
            formTitle: 'Setup Payment Item'
        },
        2: {
            title: 'Bank Details',
            Icon: Step2,
            formTitle: 'Bank Details'
        },
        3: {
            title: 'Settlement Account',
            Icon: Step3,
            formTitle: 'Settlement Account'
        }
    }
    const currentStep = stepper[step];
    const Icon = currentStep.Icon;

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }

    const handlePrev = () => {
        setStep((step - 1) as 1 | 2 | 3);
    }

    const handleStep1Submit = (event: FormEvent) => {
        event.preventDefault();
        setStep(2);
    }

    const handleStep2Submit = (event: FormEvent) => {
        event.preventDefault();
        setStep(3);
    }
    return (
        <div className="w-screen h-screen bg-[#F9F9F9]">
            <div className="h-20 w-screen bg-white drop-shadow-sm px-12 flex flex-row justify-between items-center">
                <button onClick={handleClose} className="flex flex-row">
                    <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 12.2744L19.25 12.2744" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2998 18.299L4.2498 12.275L10.2998 6.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Go back
                </button>
                <div className="flex flex-row justify-end items-center">
                    <div className="flex flex-col justify-center items-end mr-2">
                        <span>Step {step}/3</span>
                        <span>{currentStep.title}</span>
                    </div>
                    <Icon />
                </div>
            </div>
            <div className="m-auto max-w-[450px] w-[90vw] bg-white max-h-[800px] h-fit mt-8 rounded-2xl px-8 py-6"> 
                {/* <h2 className="w-full text-center text-pretty mb-2">{currentStep.formTitle}</h2> */}
                {/* { step === 1 && (
                    <form onSubmit={handleStep1Submit}>
                        <SelectComponent
                            data={['Wallet', 'BNPL', 'Card payment', 'Cheque deposit']}
                            label="Target Product"
                            placeholder=""
                            name="productId"
                            required
                            value={data.productId}
                            onChange={handleChange}
                        />
                        <Input
                            label="Customer Email Address"
                            placeholder="customer@directdebit.com"
                            name="emailAddress"
                            type="email"
                            required
                            min={1}
                            value={data.emailAddress}
                            onChange={handleChange}
                        />
                        <Input
                            label="Phone Number"
                            placeholder="0"
                            name="phoneNumber"
                            type="tel"
                            required
                            min={1}
                            value={data.phoneNumber}
                            onChange={handleChange}
                        />
                        <div className="w-full flex flex-row justify-between">
                            <div className="w-[48%]">
                                <Input
                                    label="Amount Limit"
                                    placeholder="0.00"
                                    name="paymentAmount"
                                    type="number"
                                    required
                                    min={1}
                                    value={data.paymentAmount}
                                    onChange={handleChange}
                                    info={`If the product you select below requires user to bear the
transaction cost, the specified transaction commission for
this product will automatically be included to the amount
limit per transaction.`}
                                />
                            </div>
                            <div className="w-[48%]">
                                <SelectComponent
                                    data={['Daily', 'Weekly', 'Monthly']}
                                    label="Payment Frequency"
                                    placeholder="0"
                                    name="paymentFrequency"
                                    required
                                    value={data.paymentFrequency}
                                    onChange={handleChange}
                                    info={`How often should this payment be proceed? Please
ensure this selection corresponds with your selected 
                                        product payment plan.`}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="w-[48%]">
                                <Input
                                    label="Start Date"
                                    placeholder="0"
                                    name="startDate"
                                    type="date"
                                    required
                                    min={1}
                                    value={data.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[48%]">
                                <Input
                                    label="End Date"
                                    placeholder="0"
                                    name="endDate"
                                    type="date"
                                    required
                                    min={1}
                                    value={data.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-end items-center mt-5 w-full">
                            <button type="submit" className="py-2 rounded bg-peth-red text-white">Next</button>
                        </div>
                    </form>
                )}
                { step === 2 && (
                    <form onSubmit={handleStep2Submit}>
                        <Input
                            label="Service Identifier"
                            placeholder=""
                            name="serviceReference"
                            required
                            value={data.serviceReference}
                            onChange={handleChange}
                            info="This should be your unique customer ID, reference
numbers or any identification specific to this customer on
your own platform."
                        />
                        <Input
                            label="Remarks"
                            placeholder="0"
                            name="remarks"
                            type="text"
                            required
                            min={1}
                            value={data.remarks}
                            onChange={handleChange}
                            info='Brief description of the purpose of this Payment Item. Example
Cable Tv, subscription.'
                        />
                        <SelectComponent
                            data={['Ayo bank']}
                            label="Bank Name"
                            placeholder="0"
                            name="bankCode"
                            type="tel"
                            required
                            value={data.bankCode}
                            onChange={handleChange}
                        />
                        <Input
                            label="Account Number"
                            placeholder="0"
                            name="accountNumber"
                            type="text"
                            required
                            value={data.accountNumber}
                            onChange={handleChange}
                        />
                        <Input
                            label="Home Address"
                            placeholder="0"
                            name="homeAddress"
                            type="text"
                            required
                            value={data.homeAddress}
                            onChange={handleChange}
                        />
                        <div className="flex flex-row justify-between items-center mt-5 w-full">
                            <button type="button" className="py-2 rounded border border-peth-red text-black !w-[48%]" onClick={handlePrev}>Previous</button>
                            <button type="submit" className="py-2 rounded bg-peth-red text-white !w-[48%]">Next</button>
                        </div>
                    </form>
                )}
                { step === 3 && (
                    <form onSubmit={handleStep1Submit}>
                        <div className="w-full p-3 bg-[#4560ED1A] text-xs rounded text-[#222222] mb-4">
                            Your institution has specified that collection for this Payment Item should be
                            remitted to specific account in their selected Financial Institution. 
                            Please specify a collection account for this Payment Item.
                        </div>
                        <SelectComponent
                            data={['Wallet', 'BNPL', 'Card payment', 'Cheque deposit']}
                            label="Collection bank name"
                            placeholder=""
                            name="collectionBankName"
                            required
                            value={data.collectionAccountName}
                            onChange={handleChange}
                        />
                        <Input
                            label="Collection bank account"
                            placeholder="0"
                            name="collectionAccountNumber"
                            type="month"
                            required
                            min={1}
                            value={data.collectionAccountNumber}
                            onChange={handleChange}
                        />
                        <Input
                            label="Upload your Payment Item Document"
                            placeholder="0"
                            name="fileName"
                            type="file"
                            required
                            min={1}
                            value={data.fileName}
                            onChange={handleChange}
                        />
                        <div className="flex flex-row justify-between items-center mt-5 w-full">
                            <button type="button" className="py-2 rounded border border-peth-red text-black !w-[48%]"  onClick={handlePrev}>Previous</button>
                            <button type="submit" className="py-2 rounded bg-peth-red text-white !w-[48%]">Create Payment Item</button>
                        </div>
                    </form>
                )} */}
                <AddEmployees handleDone={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>
        </div>
    );
};

export default CreatePaymentItem;
