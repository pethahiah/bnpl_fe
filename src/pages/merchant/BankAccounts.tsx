"use client"

import AddBankAccountModal from '@/app/(protected_routes)/dashboard/merchant/bank-accounts/components/AddBankAccountModal'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import Table from '@/components/Table'
import TableActionsComponent from '@/components/Table/TableActionsComponent'
import { deleteMerchantBankAccount, getAllMerchantBankAccounts } from '@/store/actions/merchant/merchantBankAccountActions'
import { getAllMerchantStores } from '@/store/actions/merchant/merchantStoresActions'
import { useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'

const MerchantBankAccountsPage = () => {
  const [editMode, setEditMode] = useState(false)
  const [editModalData, setEditModalData] = useState({})
  const [AccountToDelete, setAccountToDelete] = useState<Record<string, any> | null>(null)
  const { mercantBankAccounts } = useAppSelector((state) => state.bankAccounts);
  const { merchantStores } = useAppSelector((state) => state.stores);

  useEffect(() => {
    getAllMerchantBankAccounts({})
    if (merchantStores.length === 0) {
      getAllMerchantStores({ isSilent: true })
    }
  }, [])

  const reset = () => {
    setAccountToDelete(null)
    setEditMode(false)
    setEditModalData({})
  }

  const handleDelete = () => {
    deleteMerchantBankAccount({
      accountId: AccountToDelete?.id,
      handleDone: () => {
        getAllMerchantBankAccounts({ isSilent: true })
        reset()
      }
    })
  }

  const header = [
    {
      field: 'store_id', headerName: 'Associated Store',
      cellRenderer: ({ data }: { data: any }) => (
        <span>{merchantStores.find((store) => store.id === data.store_id)?.name || 'N/A'}</span>
      )
    },
    { field: 'account_name', headerName: 'Account name' },
    { field: 'account_number', headerName: 'Account name' },
    { field: 'bank_name', headerName: 'Bank' },
    { field: 'bank_code', headerName: 'Bank code' },
    { field: 'created_at', headerName: 'Created At' },
    {
      field: 'id',
      headerName: 'Actions',
      type: "actions",
      lockPosition: 'left',
      pinned: "right",
      cellRenderer: ({ data }: { data: any }) => (
        <TableActionsComponent
          actions={[
            {
              label: "Edit",
              onClick: () => {
                setEditModalData(data);
                setEditMode(true);
              },
              style: "bg-gray-200"
            },
            {
              label: "Delete",
              onClick: () => {
                setAccountToDelete(data)
              },
              style: "bg-red-200 text-red-500"
            },
          ]}
        />
      )
    }
  ]

  return (
    <>
      <div className="w-full flex flex-col items-start justify-center gap-3 rounded-xl mb-10">
        <div className="w-full h-[70vh] px-6 py-4">
          <Table
            data={mercantBankAccounts as unknown as Record<string, string | number | boolean>[]}
            header={header}
            fitStrategy="fitGridWidth"
          />
        </div>
      </div>
      {
        editMode && (
          <AddBankAccountModal
            editMode={editMode}
            editData={editModalData}
            open={editMode}
            handleClose={reset}
          />
        )
      }
      {
        !!AccountToDelete && (
          <ConfirmDeleteModal
            open={!!AccountToDelete}
            handleDelete={handleDelete}
            handleClose={reset}
            text="Are you sure you want to delete this bank account?"
          />
        )
      }
    </>
  )
}

export default MerchantBankAccountsPage