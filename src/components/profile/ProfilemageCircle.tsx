"use client"

import { getAbbr } from '@/utils/common'
import { useSession } from 'next-auth/react'
import React from 'react'

interface ProfilemageCircleProps {
  className?: string;
  size?: number;
}

const ProfilemageCircle = ({ className = '', size = 96 }: ProfilemageCircleProps) => {
  const { data: session } = useSession();

  const user = session?.user as any;
  const image = user?.image;
  const firstName = user?.first_name || user?.name?.split(' ')[0] || '';
  const lastName = user?.last_name || user?.name?.split(' ')[1] || '';
  const email = user?.email;

  return (
    <>
      {image ? (
        <img
          src={image}
          width={size}
          height={size}
          alt={email || 'profile image'}
          className={`rounded-full object-cover border-2 border-[#F55F64] shadow transition duration-300 ease-in-out hover:opacity-80 ${className}`}
        />
      ) : (
        <div
          className={`rounded-full flex justify-center items-center font-bold text-white border-2 border-[#F55F64] shadow ${className}`}
          style={{ width: size, height: size, background: '#F55F64', fontSize: size / 3 }}
        >
          {getAbbr((firstName || lastName ? `${firstName} ${lastName}` : email) || 'U')}
        </div>
      )}
    </>
  );
};

export default ProfilemageCircle