"use client"

import dynamic from 'next/dynamic';

const ResetPasswordComponent = dynamic(
  () => import('./resetpasswordform'),
  { ssr: false }
);

const ResetPassword = () => {
  return (
    <div>
      <ResetPasswordComponent />
    </div>
  );
};

export default ResetPassword;