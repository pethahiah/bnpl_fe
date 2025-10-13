"use client"

import { useGetBaseLink } from '@/hooks/useUserType';
import { useRouter } from 'next/navigation';
import React from 'react'

const CustomerHomePage = () => {
  const navigate = useRouter();
  const data = [
    {
      title: 'BNPL',
      label: 'BNPL',
      description: 'Easily request BNPL for products from registered merchants.',
      link: `${useGetBaseLink()}/bnpl`,
      linkText: 'Get Started',
      color: '#0898A01A',
      img: '',
      textColor: '',
    },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-center py-10 min-h-screen">
      <div className="mb-6">
        <p className="text-4xl">Welcome to BNPL</p>
        <p className="text-lg my-2">What would you like to do on BNPL today?</p>
      </div>
      <div className="w-[90%] xl:w-[70%] my-6 grid grid-cols-1 sm:grid-cols-1  justify-center gap-6">
        {
          data.map((itm) => (
            <div key={itm.title} onClick={() => {
              itm.link && navigate.push(itm.link);
            }} className="cursor-pointer">
              <div
                className={`min-h-[400px] h-fit w-full flex flex-col justify-start items-start p-8 rounded-md relative`}
                style={{
                  backgroundColor: itm.color,
                  color: itm.textColor,
                }}
              >
                <p className="text-2xl capitalize">{itm.title}</p>
                <p className="text-left text-sm my-4">{itm.description}</p>
                {
                  itm.linkText && (
                    <button className="!w-fit pr-10 bg-peth-red text-white rounded h-9 !pl-4 text-sm flex flex-row justify-start items-center capitalize">
                      {itm.linkText}
                      <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                        <path d="M14.2812 6.25977L1.15625 6.25977" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.9873 0.988374L14.2811 6.25937L8.9873 11.5312" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )
                }
                {
                  itm.img && (
                    <img
                      loading="lazy"
                      src={itm.img} alt=""
                      className="h-[150px] absolute bottom-0 self-center object-contain"
                    />
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CustomerHomePage