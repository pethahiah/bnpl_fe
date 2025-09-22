"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import UnAuthWrapper from "../../../../components/UnAuthWrapper";
import { icons } from "@/assets";
import { attemptLogin } from "@/store/actions/auth/authActions";

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    attemptLogin(
      data,
      (resp) => {
        if (resp.success && typeof window !== 'undefined') {
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);
          router.push("/verify");
        }
      },
    )
  }

  return (
    <UnAuthWrapper
      title="Welcome back."
      subTitle="Log in to your account to proceed."
      ctaQuestion="Don’t have an account?"
      ctaRoute="signup"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="Email Address"
          placeholder="someone@example.com"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          icon={icons.at}
          required
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          icon={icons.padLock}
          required
        />
        <Button
          label="Log In"
          onClick={() => null}
          type="flat"
          btnActionType="submit"
        />
      </form>
    </UnAuthWrapper>
  )
}

export default Login;