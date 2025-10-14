"use client"

import TableActionsComponent from '@/components/Table/TableActionsComponent';
import { useAppSelector } from '@/store/hooks';
import React, { useState } from 'react'

const MerchantStoresPage = () => {
  const [editMode, setEditMode] = useState(false)
  const [editModalData, setEditModalData] = useState({})
  const [storeToDelete, setStoreToDelete] = useState<Record<string, any> | null>(null)
  const { StoreData } = useAppSelector((state) => state.stores);


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
    <div className="w-full flex flex-col items-start justify-center gap-3 rounded-xl mb-10">
      Stores
    </div>
  )
}

export default MerchantStoresPage