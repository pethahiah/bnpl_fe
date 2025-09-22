"use client"

import axios from "axios";
import { useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import UnAuthWrapper from "../../../../components/UnAuthWrapper";
import { toastWrapper } from "../../../../utils/toastWrapper";
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { signIn } from "next-auth/react";

function ResetPasswordForm() {
  useAuthRedirect();
  const [misMatchPsd, setMisMatchPsd] = useState(false);
  const [passError, setPassError] = useState(false);
  const [data, setData] = useState({
    otp: '',
    password: '',
    confirmPassword: '',
    userName: window.localStorage.getItem('email')
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleSubmit = (event: React.FormEvent) => {
    const url = process.env.NEXT_PUBLIC_BASE_IDENTITY;
    event.preventDefault();
    toastWrapper(
      axios.post(`${url}auth/password/reset`, data, {
        headers: {
          'ApplicationID': process.env.NEXT_PUBLIC_API_KEY,
        }
      }),
      'Reseting your Password...',
      async (resp) => {
        await signIn("credentials", {
          redirect: false,
          token: resp.data.data.token,
        });

        if (typeof window !== 'undefined') {
          localStorage.removeItem('email')
        }
        router.push('/dashboard');
        return 'Welcome, Login Successful.';
      },
      'Error resetting password: Incorrect Verification Code.',
    );
  }

  return (
    <UnAuthWrapper
      title="Reset Password."
      subTitle="Enter verification code sent to your email and new password below."
      ctaQuestion="Don’t have an account?"
      ctaRoute="register"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="max-w-[400px]">
        <Input
          label="Verification Code"
          placeholder="Code"
          name="otp"
          value={data.otp}
          required
          onChange={(name, value) => handleChange(name, value)}
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          value={data.password}
          type="password"
          required
          pattern="^((?=.*\d)|(?=.*[!@#$%^&*]))(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          onChange={(name: string, value: string) => {
            handleChange(name, value);
            setPassError(!(/^((?=.*\d)|(?=.*[!@#$%^&*]))(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)));
          }}
          onBlur={() => {
            setPassError(!(/^((?=.*\d)|(?=.*[!@#$%^&*]))(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)));
          }}
          hasError={passError}
          errorText='Password must 8 or more alpha-numberic, uppercase, lowercase and special characters!'
        />
        <Input
          label="Confirm Password"
          placeholder="Password"
          name="confirmPassword"
          value={data.confirmPassword}
          type="password"
          required
          onChange={(name: string, value: string) => {
            handleChange(name, value);
            if (misMatchPsd && data.password === value) {
              setMisMatchPsd(false);
            }
          }}
          onBlur={() => {
            if (data.password !== data.confirmPassword) {
              setMisMatchPsd(true);
              return;
            }
            misMatchPsd && setMisMatchPsd(false);
          }}
          hasError={misMatchPsd}
          errorText='Password and Confirm Password must match!'
        />
        <Button
          label="Save"
          onClick={() => null}
          type="flat"
          btnActionType="submit"
        />
      </form>
    </UnAuthWrapper>
  );
}

export default ResetPasswordForm;