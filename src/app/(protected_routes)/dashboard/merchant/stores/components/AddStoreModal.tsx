import Input from '@/components/Input';
import Modal from '@/components/Modal'
import { createMerchantStore, getAllMerchantStores, updateMerchantStore } from '@/store/actions/merchant/merchantStoresActions';
import { IMerchantStoreActionBody } from '@/utils/types/merchantStoreTypes';
import React, { type FormEvent, useState } from 'react'

const AddStoreModal = (
  { open, handleClose, editMode = false, editData }:
    { open: boolean, editMode?: boolean, editData?: Record<string, any>, handleClose: () => void }
) => {

  const [data, setData] = useState(() => {
    if (editMode && editData) {
      return editData;
    }
    return {
      "name": '',
      // "description": '',
    }
  });

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editMode) {
      updateMerchantStore({
        storeId: editData?.id,
        data: data as IMerchantStoreActionBody,
        handleDone: () => {
          setData({
            name: '',
          });
          getAllMerchantStores({ isSilent: true });
          handleClose();
        }
      })
    }
    else {
      createMerchantStore({
        data: data as IMerchantStoreActionBody,
        handleDone: () => {
          setData({
            "name": '',
            "description": '',
          });
          getAllMerchantStores({ isSilent: true });
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
        height: 'fit-content',
      }}
      hideClose={true}
    >
      <div className="flex flex-col w-full items-center justify-items-center p-6 px-8">
        <h1 className="mb-2 mt-1 text-2xl font-medium">{editMode ? 'Edit store' : 'Add new store'}</h1>
        <form onSubmit={handleSubmit} className="!w-full">
          <Input
            label="Store Name"
            placeholder="Enter store name..."
            name="name"
            type="text"
            required
            value={data.name}
            onChange={handleChange}
          />
          {/* <Input
            label="Store Description"
            placeholder="Enter Store description..."
            name="description"
            type="text"
            required
            min={1}
            value={data.description}
            onChange={handleChange}
            maxLength={255}
          /> */}

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

export default AddStoreModal