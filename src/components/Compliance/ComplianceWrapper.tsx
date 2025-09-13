"use client"

import { icons } from '@/assets'
import Image from 'next/image'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

function ComplianceWrapper(
  { children, steps, currentStep, setCurrentStep }:
    {
      children: ReactNode,
      steps: Array<Record<string, any>>,
      currentStep: number,
      setCurrentStep: Dispatch<SetStateAction<number>>
    }
) {
  const renderStepsCrumbs = () => steps.map((singleStep, index) => {
    const isNotCompleted = () => {
      const hasAnEmptyField = singleStep.inputs.find((i: any) => i.required && (i.value === "" || i.value.length === 0))
      return hasAnEmptyField
    }

    return (
      <div
        className="flex gap-3 items-center cursor-pointer"
        key={singleStep.id}
        onClick={() => setCurrentStep(singleStep.id)}>
        {
          !isNotCompleted() ?
            (<Image src={icons.green_check} width={20} height={20} alt='check mark' />)
            :
            (<span
              className={`w-[20px] h-[20px] rounded-full border 
                ${singleStep.id === currentStep ? "border-[#4CAF50]" : "border-[#22222299]"}`
              } />)
        }
        <p className={`${singleStep.completed || singleStep.id === currentStep ? "text-black" : "text-[#22222299]"} text-[14px]`} >{singleStep.title}</p>
      </div>
    )
  })
  const renderTitle = () => {
    const step = steps.find(i => i.id === currentStep)
    if (!step) return "Title"
    else { return step?.title }
  }
  return (
    <div className='w-full flex min-h-[730px] relative flex-col-reverse md:flex-row'>
      <div className="absolute h-[5px] w-[40%] top-0 left-0 bg-[#F55F64]" />
      <div className="flex-1 min-h-full p-10 gap-3 md:gap-1 bg-[#F55F641A]">
        <h4 className="my-5 font-bold text-[14px] capitalize">Step {currentStep + 1}/{steps.length} {renderTitle()}</h4>
        <div className="w-full md:min-h-[400px] flex items-center">
          <div className="flex flex-col gap-7">
            {renderStepsCrumbs()}
          </div>
        </div>
      </div>
      <div className="flex-[1.5] min-h-full p-5 lg:p-20 bg-white">
        <h1 className='text-[24px] font-[500] my-5'>
          {renderTitle()}
        </h1>
        {children}
      </div>
    </div>
  )
}

export default ComplianceWrapper