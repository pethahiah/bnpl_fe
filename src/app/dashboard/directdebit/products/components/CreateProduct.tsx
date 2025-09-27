import { useState } from "react";
import Input, { Select as SelectComponent } from '../../../../../components/Input';

export default function CreateProduct() {
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
    "mandateType": "",
    "routingOption": "Default",
    "requestCode": ""
  });

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
  }
  return (
    <div className="flex flex-col w-full items-center justify-items-center p-6 px-8">
      <h1 className="mb-2 mt-1 text-2xl font-medium">Add new product</h1>
      <form onSubmit={handleSubmit} className="!w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="w-[48%]">
            <Input
              label="Product Name"
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
              data={['Subscription service', 'Fixed Amount']}
              label="Product Type"
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
        <Input
          label="Product Description"
          placeholder="customer@directdebit.com"
          name="emailAddress"
          type="email"
          required
          min={1}
          value={data.emailAddress}
          onChange={handleChange}
          maxLength={140}
        />
        <Input
          label="Remarks"
          placeholder="0"
          name="phoneNumber"
          type="tel"
          required
          min={1}
          value={data.phoneNumber}
          onChange={handleChange}
        />
        <SelectComponent
          data={['Wallet', 'BNPL', 'Card payment', 'Cheque deposit']}
          label="Collection account"
          placeholder=""
          name="productId"
          required
          value={data.productId}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-start items-center w-full gap-3 mb-3">
          <input type="checkbox" name="" id="" className="!w-5 h-5 !m-0 accent-black" />
          <p className="!w-10/12">This product has a subscription package?</p>
        </div>
        <div className="flex flex-row justify-start items-center w-full gap-3 mb-3">
          <input type="checkbox" name="" id="" className="!w-5 h-5 !m-0 accent-black" />
          <p className="!w-10/12">I want to enable partial debit</p>
        </div>
        <div className="flex flex-row justify-start items-center w-full gap-3 mb-3">
          <input type="checkbox" name="" id="" className="!w-5 h-5 !m-0 accent-black" />
          <p className="!w-10/12">I want the customer to bear the fee</p>
        </div>
        <div className="flex flex-row justify-end items-center mt-5 !w-full">
          <button type="submit" className="py-2 rounded bg-peth-red text-white !w-full">Submit</button>
        </div>
      </form>
    </div>
  );
}
