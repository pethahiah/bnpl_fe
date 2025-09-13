import React from 'react'

export default function WalletSVG({ color }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className='stroked' d="M21.6389 14.3962H17.5906C16.1042 14.3953 14.8993 13.1914 14.8984 11.7049C14.8984 10.2185 16.1042 9.01458 17.5906 9.01367H21.6389" stroke={`${color ? color : "#2B1E15"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' d="M18.049 11.6432H17.7373" stroke={`${color ? color : "#2B1E15"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' fillRule="evenodd" clipRule="evenodd" d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" stroke={`${color ? color : "#2B1E15"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' d="M7.03516 7.53772H12.4341" stroke={`${color ? color : "#2B1E15"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
