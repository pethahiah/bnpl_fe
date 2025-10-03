"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Input, { CustomMultiSelect, Select } from '../Input'
import Button from '../Button'
import Image from 'next/image'
import { icons } from '@/assets'
import { shortenText } from '@/utils/common'

function EditableFormDetails({ data, currentStep, setCurrentStep, numberOfSteps, outsideEditMode, handleSubmit, defaultEditMode,
  setDefaultEditMode }:
  { data: Record<string, any>, currentStep?: number, setCurrentStep?: Dispatch<SetStateAction<number>>, numberOfSteps?: number, outsideEditMode?: boolean, handleSubmit?: () => void, defaultEditMode?: boolean, setDefaultEditMode?: Dispatch<SetStateAction<boolean>> }
) {
  const [editMode, setEditMode] = useState(() => {
    if (defaultEditMode === undefined) return false
    return defaultEditMode
  })

  useEffect(() => {
    if (outsideEditMode != undefined) {
      setEditMode(outsideEditMode)
    }
  }, [outsideEditMode])

  // Validate required fields for current step
  const validateStep = () => {
    const missing = data.inputs.filter((input: any) => input.required && (input.value === '' || input.value === undefined || (Array.isArray(input.value) && input.value.length === 0)));
    if (missing.length > 0) {
      toast.error(`Please fill all required fields: ${missing.map((i: any) => i.label).join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setEditMode(false);
    if (setDefaultEditMode) setDefaultEditMode(false);
    if (handleSubmit) handleSubmit();
  };

  return (
    <form className="flex flex-wrap w-full gap-4" onSubmit={handleSubmitFunction} >
      {data.inputs.map((input: any, index: number) => {
        if (editMode) {
          return input?.type === "select"
            ? (<Select key={index} {...input} />)
            : input?.type === "multiselect"
              ? (<CustomMultiSelect key={index} {...input} />)
              : input?.type === "file"
                ? (<FileInputPreview key={index} input={input} />)
                : (<Input key={index} {...input} />)
        } else {
          return input?.type === "multiselect"
            ? (
              <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`} >
                <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                <div className="flex gap-3 flex-wrap">
                  {input?.value.length > 0
                    ? input?.value?.map((singleSelect: any, idx: number) => (
                      <span key={idx} className={`bg-[#F55F64] p-2 px-4 rounded-full text-[11px] font-light text-white`}>
                        {singleSelect}
                      </span>
                    ))
                    : (<div className="">None selected</div>)}
                </div>
              </div>
            )
            : input?.type === "file"
              ? (
                <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`}>
                  {input?.value
                    ? (<FileInputPreview input={input} />)
                    : (<>
                      <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                      <p className='text-[14px]'>Not File Selected</p>
                    </>)}
                </div>
              )
              : (
                <div key={index} className={`flex flex-col gap-1 w-full ${input.className}`}>
                  <p className='text-[14px] text-[#222222B2]'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
                  <p className='text-[14px]'>{input.value || "Not Yet Added"}</p>
                </div>
              )
        }
      })}
      {(data.formInfo && editMode) && (
        <div className="bg-[#4560ED1A] w-full text-[12px] p-5">{data.formInfo()}</div>
      )}
      {editMode && (currentStep === numberOfSteps)
        ? (
          <Button
            label="Save"
            type="flat"
            btnActionType="submit"
            className='!w-full'
          />
        )
        : editMode && (currentStep !== numberOfSteps)
          ? (
            <Button
              label="Next"
              type='flat'
              btnActionType="button"
              onClick={() => {
                if (!validateStep()) return;
                if (setCurrentStep) setCurrentStep((prev) => prev + 1);
                if (setDefaultEditMode) setDefaultEditMode(true);
              }}
              className='!w-full'
            />
          )
          : (
            <div className="w-full flex gap-3 flex-wrap">
              <Button
                label="Edit"
                type='containedBlack'
                btnActionType="button"
                onClick={() => setEditMode(true)}
                className='!w-[48%]'
              />
              {currentStep !== undefined && numberOfSteps !== undefined && (currentStep < numberOfSteps) && (
                <Button
                  label="Next"
                  type='flat'
                  btnActionType="button"
                  onClick={() => setCurrentStep && setCurrentStep((prev) => prev + 1)}
                  className='!w-[48%]'
                />
              )}
            </div>
          )}
    </form>
  )
}

export default EditableFormDetails

const FileInputPreview = ({ input }: { input: any }) => {
  const openFileAction = () => {
    const blob = URL.createObjectURL(input?.value)
    window.open(blob, "_blank")
  }
  return (
    <div className="w-full">
      <p className='text-[18px] w-full text-start  text-[#222222B2] mb-2 mt-5'>{input.label}{input.required && <span className='text-red-500'>*</span>}</p>
      {
        input?.value === "" &&
        (
          <label htmlFor={input.id} className="w-full p-3  bg-[#F55F640D] border-[#F55F6466] border-2 border-dashed  cursor-pointer flex gap-5 justify-center items-center mb-2">
            <Image src={icons.upload} width={27} height={17} alt='upload' />
            <p className='text-[#222222] text-[14px]'>
              Upload or click here to{" "}
              <span className='text-[#F55F64] underline'>upload document</span>
            </p>
          </label>
        )
      }
      {
        input?.value !== "" &&
        (
          <div className='w-full p-1 flex gap-2 items-center flex-wrap justify-between border-2 border-[#2222221A] rounded-md'>
            <div className="flex gap-2 items-center">
              <div className="p-5 rounded-md bg-[#F55F641A] flex justify-center items-center w-[55px] h-[55px] uppercase ">
                {input?.value?.type ? input?.value?.type.split("/")[1] : "DOC"}
              </div>
              <div className="flex flex-col gap-1 w-full text-start">
                <p className='text-[14px]'>{input?.value.name ? shortenText(input?.value.name, 25) : input?.label}</p>
                {
                  input?.value.size && (
                    <p className='text-[#222222B2] text-[12px] font-light'>{Math.floor(parseInt(input?.value.size) / 1000)}KB</p>
                  )
                }
              </div>
            </div>

            <div className="flex gap-4 pr-5">
              {
                !input?.disabled && (
                  <label htmlFor={input.id} className="text-az-teal underline text-sm cursor-pointer opacity-80 hover:opacity-100">
                    Change File
                  </label>
                )
              }
              {
                typeof input?.value === "string" ?
                  (
                    <a href={input?.value} target="__blank">
                      <Image src={icons.eye} width={24} height={24} alt="view" className='cursor-pointer' />
                    </a>
                  ) :
                  (
                    <span onClick={openFileAction}>
                      <Image src={icons.deleteRed} width={24} height={24} alt="delete" className='cursor-pointer' />
                    </span>
                  )
              }
            </div>
          </div>
        )
      }

      <Input
        {...input}
        value={input.value}
        className='!absolute w-1 h-1 top-0 opacity-0 -z-50'
      />
    </div>
  )
}