"use client"

import React from 'react'
import { icons } from '@/assets'
import Image from 'next/image'
import Button from './Button'

export default function GoBackBtn() {
  const handleGoBack = () => {
    window.history.back()
  }
  return (
    <>
      <Button
        type='text'
        label='Go back'
        className='!hidden sm:!flex !rounded-full !m-0 !w-auto !py-1 !px-2 !h-auto !text-black !text-[14px] font-[500] hover:!bg-[#F9F9F9]'
        leftIcon={<Image src={icons.goBackArr} width={24} height={24} alt="back" />}
        onClick={handleGoBack}
      />
      <div onClick={handleGoBack} className="flex sm:hidden justify-center items-center !bg-[#F9F9F9] !rounded-full !w-auto !p-[15px]">
        <Image src={icons.goBackArr} width={24} height={24} alt="back" />
      </div>
    </>
  )
}
