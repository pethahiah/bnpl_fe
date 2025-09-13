"use client"

import React, { useState } from 'react'
import { icons } from '../assets'
import Image from 'next/image'

function CopyData({ data }: { data: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  return (
    <span className='w-fit'>
      {
        copied ? (
          <Image width={11} height={12} alt="copy" src={icons.checkMark} className='w-[15px] h-[15px] object-cover' />)
          :
          (<Image width={11} height={12} alt="copy" src={icons.copyicon} className='w-[15px] h-[15px] cursor-pointer object-cover' onClick={() => handleCopy()} />)
      }
    </span>
  )
}

export default CopyData