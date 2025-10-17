import Input, { AdvancedSelect, Select } from '@/components/Input';
import Modal from '@/components/Modal'
import { createMerchantBankAccount, getAllMerchantBankAccounts, updateMerchantBankAccount } from '@/store/actions/merchant/merchantBankAccountActions';
import { getAllMerchantStores } from '@/store/actions/merchant/merchantStoresActions';
import { useAppSelector } from '@/store/hooks';
import { IMerchantBankAccountActionBody } from '@/utils/types/merchantBankAccountTypes';
import React, { type FormEvent, useEffect, useState } from 'react'


const AddBankAccountModal = (
  { open, handleClose, editMode = false, editData }:
    { open: boolean, editMode?: boolean, editData?: Record<string, any>, handleClose: () => void }
) => {
  const { merchantStores } = useAppSelector((state) => state.stores);

  const initialData = {
    store_id: merchantStores?.[0]?.id || 0,
    account_name: "",
    account_number: "",
    bank_name: "",
    bank_code: "",
    reference_id: "",
  }

  const [data, setData] = useState<IMerchantBankAccountActionBody>(() => {
    if (editMode && editData) {
      return editData as IMerchantBankAccountActionBody;
    }
    return initialData
  });

  useEffect(() => {
    if (merchantStores.length === 0) {
      getAllMerchantStores({ isSilent: true })
    }
  }, [])

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editMode) {
      updateMerchantBankAccount({
        accountId: editData?.id,
        data: { ...data, store_id: Number(data.store_id) } as IMerchantBankAccountActionBody,
        handleDone: () => {
          setData(initialData);
          getAllMerchantBankAccounts({ isSilent: true });
          handleClose();
        }
      })
    }
    else {
      createMerchantBankAccount({
        data: { ...data, store_id: Number(data.store_id) } as IMerchantBankAccountActionBody,
        handleDone: () => {
          setData(initialData);
          getAllMerchantBankAccounts({ isSilent: true });
          handleClose();
        }
      });
    }
  }

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title={""}
      overrideStyle={{
        maxWidth: '500px',
        width: '90%',
        margin: "auto",
        borderRadius: '20px',
        top: '50%',
        height: 'fit-content',
      }}
      hideClose={true}
    >
      <div className="flex flex-col w-full items-center justify-items-center p-0">
        <h1 className="mb-2 mt-1 text-2xl font-medium">{editMode ? 'Edit Bank Account' : 'Add New Bank Account'}</h1>
        <form onSubmit={handleSubmit} className="!w-full">
          <AdvancedSelect
            data={
              merchantStores.map((store) => ({
                value: store.id,
                label: store.name,
              }))
            }
            label="Associated Store"
            placeholder="Select associated store..."
            name="store_id"
            required
            value={data.store_id.toString()}
            onChange={handleChange}
          />
          <Input
            label="Account Name"
            placeholder="Enter acount name..."
            name="account_name"
            type="text"
            required
            value={data.account_name}
            onChange={handleChange}
          />
          <Input
            label="Account Number"
            placeholder="Enter acount name..."
            name="account_number"
            type="text"
            required
            value={data.account_number}
            onChange={handleChange}
          />
          <Input
            label="Bank Name"
            placeholder="Enter bank name..."
            name="bank_name"
            type="text"
            required
            value={data.bank_name}
            onChange={handleChange}
          />
          <Input
            label="Bank Code"
            placeholder="Enter bank code..."
            name="bank_code"
            type="text"
            required
            value={data.account_name}
            onChange={handleChange}
          />
          <Input
            label="Reference ID (Optional)"
            placeholder="Enter reference ID..."
            name="reference_id"
            type="text"
            value={data?.reference_id || ""}
            onChange={handleChange}
          />

          <div className="flex flex-row justify-end items-center mt-5 !w-full gap-2">
            {
              editMode && (
                <button type="button" onClick={handleClose} className="py-2 rounded bg-gray-300 text-black !w-full">Cancel</button>
              )
            }
            <button type="submit" className="py-2 rounded bg-peth-red text-white !w-full">{
              editMode ? "Confirm" : "Submit"
            }</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AddBankAccountModal