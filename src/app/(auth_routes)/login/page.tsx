"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import UnAuthWrapper from "../../../components/UnAuthWrapper";
import { toastWrapper, signalObj } from "../../../utils/toastWrapper";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import { login, User } from "@/store/slice/authSlice";
import { signIn } from "next-auth/react";

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [data, setData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_IDENTITY}auth`;
    event.preventDefault();

    toastWrapper(
      axios.post(`${url}/login`, data, {
        ...signalObj,
        headers: {
          'ApplicationID': process.env.NEXT_PUBLIC_API_KEY,
        }
      }),
      'Trying to Authenticate you...',
      async (resp) => {
        if (resp.data.responseCode == 100) {
          localStorage.setItem('email', data.userName);
          router.push('/verify');
          return resp.data.message || 'Login Successful, please verify OTP sent to you!';
        } else {
          await signIn("credentials", {
            redirect: false,
            token: resp.data.data.token,
          });

          if (typeof window !== 'undefined') {
            localStorage.removeItem('email')
          }
          router.push('/dashboard');
          return 'Welcome, Login Successful.';
        }
      },
      'Email or Password Incorrect.',
      (err) => {
        // @ts-ignore
        if (err?.response.status == 99) {
          localStorage.setItem('email', data.userName);
          router.push('/resetpassword');
          // @ts-ignore
          return err?.response.data.message || 'Reset password';
        }
        // @ts-ignore
        return 'Email or Password Incorrect.'
      }
    );
  }

  return (
    <UnAuthWrapper
      title="Welcome back."
      subTitle="Log in to your account to proceed."
      ctaQuestion="Don’t have a Paythru account?"
      ctaRoute="signup"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="max-w-[400px]">
        <Input
          label="Email"
          placeholder="Email"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          value={data.password}
          type="password"
          ctaText="Forgot Password?"
          ctaRoute="forgotpassword"
          onChange={handleChange}
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
  );
}

export default Login;