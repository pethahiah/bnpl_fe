import { useEffect, useState } from "react";
import Input, { Select as SelectComponent } from '../../../../../../components/Input';
import { getDDBanks } from "@/store/actions/debit/banking";

export default function CreateProduct() {
  const [ddBanks, setDDBanks] = useState([]);
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

  useEffect(() => {
    getDDBanks((resp) => {
      console.log(resp, '-==-=-resp=-=-=-')
    });
  }, []);

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
      <h1 className="mb-2 mt-1 text-2xl font-medium">Add New Account</h1>
      <form onSubmit={handleSubmit} className="!w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <SelectComponent
              data={ddBanks}
              label="Select bank"
              placeholder="0"
              name="bankCode"
              required
              value={data.bankCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <Input
          label="Account number"
          placeholder="0000000000"
          name="accountNumber"
          type="text"
          required
          value={data.accountNumber}
          onChange={handleChange}
        />
        <Input
          label="Account name"
          placeholder="Ayo Chide Hassan"
          name="accountName"
          type="text"
          required
          value={data.accountName}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-end items-center mt-5 !w-full">
          <button type="submit" className="py-2 rounded bg-peth-red text-white !w-full">Submit</button>
        </div>
      </form>
    </div>
  );
}
