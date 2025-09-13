"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import Input, { CustomMultiSelect, Select } from '../Input'
import Button from '../Button'
import Image from 'next/image'
import { icons } from '@/assets'
import { shortenText } from '@/utils/common'

function ComplianceFormComponent({ data, currentStep, setCurrentStep }:
  { data: Record<string, any>, currentStep: number, setCurrentStep: Dispatch<SetStateAction<number>> }
) {
  const [editMode, setEditMode] = useState(false)

  return (
    <form className="flex justify-between flex-wrap max-w-[400px] sm:max-w-[700px] gap-4" >
      {
        data.inputs.map((input: any, index: number) => {
          const handleRmoveItem = () => {
            input.onChange(input.name, "")
          }
          if (editMode) {
            return input?.type === "select" ?
              (<Select
                key={index}
                {...input} />)
              : input?.type === "multiselect" ?
                (<CustomMultiSelect
                  key={index}
                  {...input}
                />)
                : input?.type === "file" ?
                  (
                    <div className="w-full" key={index}>
                      <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                      <label htmlFor={input.id} className="w-full p-3 bg-[#F55F640D] border-[#F55F6466] border-2 border-dashed  cursor-pointer flex gap-5 justify-center items-center mb-2">
                        <Image src={icons.upload} width={27} height={17} alt='upload' />
                        <p className='text-[#222222] text-[14px]'>
                          Upload or click here to{" "}
                          <span className='text-[#F55F64] underline'>upload document</span>
                        </p>
                      </label>
                      <Input
                        {...input}
                        className='!hidden'
                      />
                      {
                        input?.value &&
                        (
                          <FilePrewiew file={input.value} withActions={true} removeItem={handleRmoveItem} />
                        )
                      }
                    </div>
                  )
                  :
                  (<Input
                    key={index}
                    {...input}
                  />)
          }
          else {
            return input?.type === "multiselect" ? (
              <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`} >
                <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                <div className="flex gap-3 flex-wrap">
                  {input?.value.length > 0 ?
                    input?.value?.map((singleSelect: any, index: number) => (
                      <span key={index} className={`bg-[#F55F64] p-2 px-4 rounded-full text-[11px] font-light text-white`}>
                        {singleSelect}
                      </span>
                    ))
                    :
                    (
                      <div className="">None selected</div>
                    )
                  }
                </div>
              </div>
            )
              : input?.type === "file" ? (
                <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`}>
                  <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                  {
                    input?.value ?
                      (
                        <FilePrewiew file={input.value} />
                      )
                      : (
                        <div className="">No file selected</div>
                      )
                  }

                </div>
              )
                :
                (
                  <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`}>
                    <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                    <p className='text-[14px]'>{input.value || "Not Yet Added"}</p>
                  </div>
                )
          }
        })
      }
      {
        (data.formInfo && editMode) && (
          <div className="bg-[#4560ED1A] w-full text-[12px] p-5">{data.formInfo()}</div>
        )
      }
      {
        editMode ? (
          <Button
            label="Save"
            type="flat"
            btnActionType="submit"
            onClick={() => setEditMode(false)}
            className='!w-full'
          />
        ) :
          (
            <div className="w-full flex gap-5 flex-wrap">
              <Button
                label="Edit"
                type='containedBlack'
                btnActionType="button"
                onClick={() => setEditMode(true)}
                className='!w-[160px]'
              />
              {currentStep !== 3 && (
                <Button
                  label="Next"
                  type='flat'
                  btnActionType="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className='!w-[160px]'
                />)
              }
            </div>
          )
      }
    </form >
  )
}

export default ComplianceFormComponent

const FilePrewiew = ({ withActions = false, file, removeItem }: { withActions?: boolean, file: Record<string, any>, removeItem?: () => void }) => {
  const openPDF = () => {
    // @ts-ignore
    const blob = URL.createObjectURL(file)
    window.open(blob, "_blank")
  }
  return (
    <div className='w-full p-1 flex gap-2 items-center flex-wrap justify-between border-2 border-[#2222221A] rounded-md'>
      <div className="flex gap-2 items-center">
        <div className="p-5 rounded-md bg-[#F55F641A] flex justify-center items-center w-[55px] h-[55px] uppercase ">
          {file.type.split("/")[1]}
        </div>
        <div className="flex flex-col gap-1">
          <p className='text-[14px]'>{shortenText(file.name, 35)}</p>
          <p className='text-[#222222B2] text-[12px] font-light'>{Math.floor(parseInt(file.size) / 1000)}KB</p>
        </div>
      </div>
      {
        withActions && (
          <div className="flex gap-4">
            <span onClick={openPDF}>
              <Image src={icons.eye} width={24} height={24} alt="view" className='cursor-pointer' />
            </span>
            <span onClick={() => { removeItem && removeItem() }}>
              <Image src={icons.deleteRed} width={24} height={24} alt="delete" className='cursor-pointer' />
            </span>
          </div>
        )
      }
    </div>
  )
}