"use client"

import { useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import UnAuthWrapper from "../../../../components/UnAuthWrapper";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/store/actions/auth/authActions";

function ResetPasswordForm() {
  const [misMatchPsd, setMisMatchPsd] = useState(false);
  const [passError, setPassError] = useState(false);
  const [data, setData] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    resetPassword(
      { token: data.token, password: data.password },
      (resp) => {
        console.log(resp);
        router.push('/login');
      })
  }

  return (
    <UnAuthWrapper
      title="Reset Password."
      subTitle="Enter verification token sent to your email and new password below."
      ctaQuestion="Don’t have an account?"
      ctaRoute="register"
      ctaText="Sign Up"
    >
      <form onSubmit={handleSubmit} className="">
        <Input
          label="Verification Token"
          placeholder="Token"
          name="token"
          value={data.token}
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
          disabled={passError || misMatchPsd || !data.token || !data.password || !data.confirmPassword}
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