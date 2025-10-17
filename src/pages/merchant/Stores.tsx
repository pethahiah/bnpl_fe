"use client"

import AddStoreModal from '@/app/(protected_routes)/dashboard/merchant/stores/components/AddStoreModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Table from '@/components/Table';
import TableActionsComponent from '@/components/Table/TableActionsComponent';
import { deleteMerchantStore, getAllMerchantStores } from '@/store/actions/merchant/merchantStoresActions';
import { useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react'

const MerchantStoresPage = () => {
  const [editMode, setEditMode] = useState(false)
  const [editModalData, setEditModalData] = useState({})
  const [storeToDelete, setStoreToDelete] = useState<Record<string, any> | null>(null)
  const { merchantStores } = useAppSelector((state) => state.stores);

  useEffect(() => {
    getAllMerchantStores({})
  }, [])

  const reset = () => {
    setStoreToDelete(null)
    setEditMode(false)
    setEditModalData({})
  }

  const handleDelete = () => {
    deleteMerchantStore({
      storeId: storeToDelete?.id,
      handleDone: () => {
        getAllMerchantStores({ isSilent: true })
        reset()
      }
    })
  }

  const header = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Store name' },
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
                setStoreToDelete(data)
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
            data={merchantStores as unknown as Record<string, string | number | boolean>[]}
            header={header}
            fitStrategy="fitGridWidth"
          />
        </div>
      </div>
      {
        editMode && (
          <AddStoreModal
            editMode={editMode}
            editData={editModalData}
            open={editMode}
            handleClose={reset}
          />
        )
      }
      {
        !!storeToDelete && (
          <ConfirmDeleteModal
            open={!!storeToDelete}
            handleDelete={handleDelete}
            handleClose={reset}
            text="Are you sure you want to delete this store?"
          />
        )
      }
    </>
  )
}

export default MerchantStoresPage