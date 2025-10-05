"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import UnAuthWrapper from "../../../../components/UnAuthWrapper";
import { requestPasswordReset } from "@/store/actions/auth/authActions";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    requestPasswordReset(
      { email },
      (resp) => {
        console.log(resp);
        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('email', email);
        // }
        navigate.push('/resetpassword');
      })
  }

  return (
    <UnAuthWrapper
      title="Forgot Password."
      subTitle="Kindly input the email address linked to your account in order to reset your password"
      ctaQuestion="Don’t have a BNPL account?"
      ctaRoute="signup"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="">
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={(name, value) => setEmail(value)}
        />
        <Button
          label="Continue"
          onClick={() => null}
          type="flat"
          btnActionType="submit"
        />
        <button onClick={() => navigate.push('/login')} type="button" className="text-peth-red flex justify-center items-center m-auto cursor-pointer">
          {/* <img src={icons.goBackArr} alt="" className="mr-2" /> */}
          Go back to Login
        </button>
      </form>
    </UnAuthWrapper>
  );
}

export default ForgotPassword;