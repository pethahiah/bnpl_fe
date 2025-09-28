"use client"

import Button from "@/components/Button";
import { InputLabel } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { toastWrapper } from "@/utils/toastWrapper";
import { signIn } from "next-auth/react";
import { attemptLogin } from "@/store/actions/auth/authActions";
import { IAttemptLoginActionBody } from "@/utils/types/authTypes";
import UnAuthWrapper from "@/components/UnAuthWrapper";


export default function VerifyOTPPage() {
  const [code, setCode] = useState('');
  const [time, setTime] = useState(60); // Initial time in seconds

  const router = useRouter()

  let email: string | null = null
  let password: string | null = null

  if (typeof window !== 'undefined') {
    email = localStorage.getItem('email');
    password = localStorage.getItem('password');
  }


  useEffect(() => {
    if (!email && !password) {
      router.back()
    }
  }, [])

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clear interval on component unmount
    }
  }, [time]);

  const handleResend = () => {
    if (time !== 0) {
      return;
    }
    attemptLogin({
      data: { email, password } as IAttemptLoginActionBody,
      handleDone: (resp) => {
        if (resp.success && typeof window !== 'undefined') {
          setTime(60);
          setCode("");
          localStorage.setItem('email', email || "");
          localStorage.setItem('password', password || "");
        }
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toastWrapper(
      signIn("credentials", {
        redirect: false,
        email: email,
        otp: code,
      },),
      'Verifying you...',
      (resp) => {
        console.log(resp);
        
        if (!resp.ok || resp.status !== 200) {
          throw Error('Invalid OTP supplied!');
        }
        if (typeof window !== 'undefined') {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        // redirect to dashboard after verification
        router.push('/dashboard');
        return 'Welcome, Login Successful.';
      },
      'Error validating OTP!',
    );
  };

  const formatTime = (seconds: number) => {
    // const minutes = Math.floor(seconds / 60);
    return `${seconds.toString().padStart(2, '0')}`;
  };

  const label = time === 0 ? 'Resend' : `Resend in ${formatTime(time)}s`;

  return (
    <UnAuthWrapper
      title="OTP Authentication"
      subTitle={`${email ? `Enter your the 6-digit code sent to this email ${email}.` : "Enter your the 6-digit code"}`}

    >
      <>
        <form onSubmit={handleSubmit} className="max-w-[400px]">
          <InputLabel props={{ label: "Enter OTP" }} />
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
            label="Proceed"
            onClick={() => null}
            type="flat"
            btnActionType="submit"
          />

          <div className="flex items-center justify-between">
            <p>{"Didn't get any code?"}</p>

            <Button
              disabled={time !== 0}
              type="text"
              label={label}
              onClick={handleResend}
              className="!rounded-full !m-0 !text-black !bg-[#F55F6414] px-5 disabled:opacity-40 disabled:cursor-not-allowed"
              overrideStyle={{
                color: '#F55F6414',
                width: 'max-content',
              }}
            />
          </div>
        </form>
      </>
    </UnAuthWrapper>
  )
}