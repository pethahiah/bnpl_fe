'use client'
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { documents } from '@/assets';
import { Select } from '@/components/Input';
import { getDDBanks, createDD } from '@/store/actions/credit/wallet';
import Input from '@/components/Input';


const ConfigureDirectDebit = ({ handleDone }: { handleDone: () => void }) => {
  const [base64, setBase64] = useState('');
  const [ddBanks, setDDBanks] = useState([]);
  const [data, setData] = useState({
    accountNumber: '',
    accountName: '',
    maximumDebitPerTransaction: '',
    bankCode: '',
    fileBase64String: '',
    fileExtension: '',
    mandate: '',
    startDate: "",
    endDate: "",
  });

  const handleChange = useCallback((name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  useEffect(() => {
    getDDBanks((resp: { data: SetStateAction<never[]>; }) => {
      setDDBanks(resp.data);
    });
  }, []);

  const handleImageChange = (name: any, files: Blob) => {
    if (files?.size > 5000000) {
      toast.error('Mandate must be less than 5mb');
      return;
    }
    handleChange('fileExtension', files.name.split('.').pop())
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      // @ts-ignore
      setBase64(base64String);
    };
    reader.readAsDataURL(files);
  };

  const submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    createDD({
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      maximumDebitPerTransaction: data.maximumDebitPerTransaction,
      // @ts-ignore
      bankCode: ddBanks.find((itm) => itm.name === data.bankCode)?.bankCode,
      fileBase64String: base64,
      fileExtension: data.fileExtension,
      startDate: data.startDate,
      endDate: data.endDate,
    }, () => {
      handleDone();
    });
  }

  return (
    <div className="w-full flex flex-col justify-between items-center p-7 py-8">
      <div className='flex flex-col justify-center items-start'>
        <h3 className='text-3xl text-center capitalize'>Configure direct debit</h3>
      </div>
      <form onSubmit={submitForm} className='py-5 flex w-full flex-col flex-grow flex-auto items-center '>
        <div className='flex flex-row w-full justify-between'>
          <div className='w-[48%]'>
            <Input
              label="Account name"
              placeholder="Audu Ezeoke Abike"
              name="accountName"
              required
              value={data.accountName}
              onChange={handleChange}
            />
          </div>
          <div className='w-[48%]'>
            <Input
              label="Account number"
              placeholder="0099887788"
              name="accountNumber"
              required
              pattern={'([0-9]){10}'}
              value={data.accountNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <div className='w-[48%]'>
            <Select
              // @ts-ignore
              data={Array.isArray(ddBanks) ? ddBanks?.map((itm) => itm.name) : []}
              label="Select bank"
              placeholder=""
              name="bankCode"
              required
              value={data.bankCode}
              onChange={handleChange}
            />
          </div>
          <div className='w-[48%]'>
            <Input
              label="Max. allowed debit"
              placeholder="1"
              name="maximumDebitPerTransaction"
              required
              value={data.maximumDebitPerTransaction}
              onChange={handleChange}
            />
          </div>
        </div>
        <Input
          label="Upload mandate"
          placeholder="1"
          name="mandate"
          required
          value={data.mandate}
          onChange={handleImageChange}
          ctaText='Download sample'
          handleCTAClick={() => {
            window.open(documents.sample_mandate, '__blank');
          }}
          type='file'
        />
        <div className="flex gap-2 w-full justify-between">
          <Input
            label='Start Date'
            name='startDate'
            type='date'
            required
            onChange={handleChange}
            value={data.startDate}
          />
          <Input
            label='End Date'
            name='endDate'
            type='date'
            required
            onChange={handleChange}
            value={data.endDate}
          />
        </div>
        <p className='text-sm font-bold text-center'><span className='text-red-500'>*</span>The start and end dates should correspond with what you specified on your mandate document</p>
        <button
          className={`w-full h-10 px-10 rounded-md border-peth-red bg-peth-red text-white !my-5`}
          type="submit"
        >Submit</button>
      </form>
    </div>
  );
};

export default ConfigureDirectDebit;
