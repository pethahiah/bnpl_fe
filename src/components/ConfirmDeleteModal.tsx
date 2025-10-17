import React from 'react'
import Modal from './Modal'
import Button from './Button'

function ConfirmDeleteModal({ open, handleClose, handleDelete, title, text }: { open: boolean, handleClose: () => void, handleDelete: () => void, title?: string, text?: string }) {
  return (
    <Modal
      onClose={handleClose}
      open={open}
      title={""}
      overrideStyle={{
        maxWidth: '450px',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: '0',
        right: '0',
        top: '5%',
        borderRadius: '20px'
      }}
    >
      <div className="flex flex-col w-full items-center justify-items-center p-6 px-8">
        <h1 className="mb-2 mt-1 text-2xl font-medium">{title || 'Confirm Delete'}</h1>
        <p className="my-5 text-center">{text ? text : "Are you sure you want to delete this item?"}</p>
        <div className='w-full flex justify-between'>
          <Button
            label="Cancel"
            type="contained"
            btnActionType="button"
            overrideStyle={{
              width: '48%'
            }}
            onClick={handleClose}
          />
          <Button
            label="Confirm Delete"
            type="flat"
            btnActionType="button"
            overrideStyle={{
              width: '48%'
            }}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteModal