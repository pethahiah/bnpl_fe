import React from 'react'

export default function MoreSquare({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className='stroked' fillRule="evenodd" clipRule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.634 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="#2B1E15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' d="M15.9389 12.0137H15.9479" stroke="#2B1E15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' d="M11.931 12.0137H11.94" stroke="#2B1E15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className='stroked' d="M7.92128 12.0137H7.93028" stroke="#2B1E15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
