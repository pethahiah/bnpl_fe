"use client"

import { icons } from "@/assets";
import Button from "@/components/Button";
import UnAuthWrapper from "@/components/UnAuthWrapper";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { toastWrapper } from "@/utils/toastWrapper";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';


export default function VerifyOtpPage() {
  useAuthRedirect();
  const [time, setTime] = useState(10 * 60); // Initial time in seconds

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clear interval on component unmount
    }
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const [code, setCode] = useState('');
  const router = useRouter();

  const handleResend = () => {
    if (time !== 0) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_IDENTITY}Otp/send`;
    const login = axios.post(url, {
      emailAddress: localStorage.getItem('email'),
    });
    toastWrapper(
      login,
      'Resending code...',
      (resp) => {
        setTime(10 * 60);
        return resp.data.message || 'Code sent Successful!';
      },
      'Error resending code.',
      (err) => {
        return err?.message || 'Error resending code.'
      }
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    toastWrapper(
      signIn("credentials", {
        redirect: false,
        email: localStorage.getItem('email'),
        otp: code,
      }),
      'Verifying you...',
      (resp) => {
        if (!resp.ok || resp.status !== 200) {
          throw Error('Invalid OTP supplied!');
        }
        if (typeof window !== 'undefined') {
          localStorage.removeItem('email');
        }

        // redirect to dashboard after verification
        router.push('/dashboard');
        return 'Welcome, Login Successful.';
      },
      'Error validating OTP!',
    );
  }

  const label = time === 0 ? 'Resend' : `Resend in ${formatTime(time)} minutes`;
  return (
    <UnAuthWrapper
      title="Verify your email."
      subTitle="Enter code sent to your email below."
      ctaQuestion="Have an account?"
      ctaRoute="login"
      ctaText="Login"
      img={icons.verifyEmail}
    >
      <>
        <form onSubmit={handleSubmit} className="max-w-[400px]">
          <OtpInput
            value={code}
            onChange={setCode}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: '1px solid #22222226',
              width: '50px',
              height: '50px',
              marginRight: '10px',
              borderRadius: '5px'
            }}
          />

          <Button
            label="Verify Email"
            onClick={() => null}
            type="flat"
            btnActionType="submit"
          />
        </form>
        <div className="flex gap-2 items-center">
          <p>I didn’t get verification email?</p>
          <Button
            label={label}
            type='text'
            overrideStyle={{
              color: 'rgba(80,44,43,.882)',
              width: 'max-content',
              marginLeft: '0.5rem',
              textTransform: 'unset'
            }}
            onClick={handleResend}
          />
        </div>
      </>
    </UnAuthWrapper>
  )
}