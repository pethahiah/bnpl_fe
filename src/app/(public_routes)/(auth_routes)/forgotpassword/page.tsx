"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import UnAuthWrapper from "../../../../components/UnAuthWrapper";
import { toastWrapper } from "@/utils/toastWrapper";
import { icons } from "../../../../assets";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    const url = process.env.NEXT_PUBLIC_BASE_IDENTITY;
    event.preventDefault();
    toastWrapper(
      axios.post(`${url}Otp/send`, { emailAddress: email },
        {
          headers: {
            'Content-Type': 'application/json',
            'ApplicationID': process.env.NEXT_PUBLIC_API_KEY,
          }
        }
      ),
      'Getting your reset information ready...',
      (resp) => {
        if (resp.data.message === "user doesn't exists") {
          return resp.data.message || 'Please check your email for further instructions!';
        }
        localStorage.setItem('email', email);
        router.push('/resetpassword');
        return resp.data.message || 'Please check your email for further instructions!';
      },
      'Error getting the reset information.',
    );
  }

  return (
    <UnAuthWrapper
      title="Forgot Password."
      subTitle="Kindly input the email address linked to your account in order to reset your password"
      ctaQuestion="Don’t have a Paythru account?"
      ctaRoute="signup"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="max-w-[400px]">
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
        <button onClick={() => router.push('/login')} type="button" className="text-peth-red flex justify-center items-center m-auto cursor-pointer">
          <img src={icons.goBackArr} alt="" className="mr-2" />
          Go back to Login
        </button>
      </form>
    </UnAuthWrapper>
  );
}

export default ForgotPassword;