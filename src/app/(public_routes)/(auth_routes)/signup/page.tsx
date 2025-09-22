"use client";

import {
  FormEvent,
  useEffect,
  useState
} from "react";
import Button from "@/components/Button";
import Input, { AdvancedSelect, Select } from "@/components/Input";
import UnAuthWrapper from "@/components/UnAuthWrapper";
import { scrollUp } from "../../../../utils/common";
import { useRouter } from 'next/navigation';

import { IRegisterActionBody, IUserType } from "@/utils/types/authTypes";
import { attemptLogin, registerAccount } from "@/store/actions/auth/authActions";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useRouter();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "customers",
    password_confirmation: "",
  });

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    scrollUp();
  }, []);


  const handleRegisterAccount = (event: React.FormEvent) => {
    event.preventDefault();
    if (data.password !== data.password_confirmation) {
      toast.error('Password and Confirm Password do not match!');
      return;
    }

    const reqBody: IRegisterActionBody = {
      name: `${data.lastName} ${data.firstName}`,
      email: data.email,
      phone: data.phone,
      usertype: data.userType as IUserType,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }

    registerAccount(reqBody, () => {
      attemptLogin(
        {
          email: data.email,
          password: data.password,
        },
        (resp) => {
          if (resp.success && typeof window !== 'undefined') {
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
            navigate.push("/verify");
          }
        },
      )
    });
  }

  return (
    <UnAuthWrapper
      title="Get onboard"
      subTitle={"Get started by creaing your account."}
      ctaQuestion="Already have a Paythru account?"
      ctaRoute="login"
      ctaText="Log In"
      overrideContentClass='signup-form'
    >
      <>
        {/* <div className="flex flex-start">Enter correct account details</div> */}

        <form className="flex flex-col gap-3 w-full " onSubmit={handleRegisterAccount}>
          <div className="flex justify-between gap-3 flex-wrap">
            <div className="w-[100%] sm:w-[48%]">
              <Input
                label="Firstname"
                placeholder="Adegbami"
                name="firstName"
                required
                value={data.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="w-[100%] sm:w-[48%]">
              <Input
                label="Lastname"
                placeholder="Okon"
                name="lastName"
                required
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <Input
            label="Email Address"
            placeholder="someone@example.com"
            name="email"
            required
            type="email"
            value={data.email}
            onChange={handleChange}
            info={"You will recieve your account verification code and login credentials on this email address."}
          />
          <div className="flex justify-between gap-3 flex-wrap">
            <div className="w-[100%] sm:w-[48%]">
              <Input
                label="Phone Numer"
                type="tel"
                placeholder="+2347XXXXXXXXX"
                required
                // @ts-ignore
                pattern="[789][0-9]{9}"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-[100%] sm:w-[48%]">
              <AdvancedSelect
                label="Account Type"
                placeholder="Select your account type"
                name="userType"
                required
                type="userType"
                value={data.userType}
                onChange={handleChange}
                data={
                  [
                    { label: "Customer", value: "customer" },
                    { label: "Business", value: "merchant" },
                  ]
                }
              />
            </div>
          </div>

          <Input
            label="Password"
            placeholder="************"
            name="password"
            required
            value={data.password}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            placeholder="************"
            name="password_confirmation"
            required
            value={data.password_confirmation}
            onChange={handleChange}
          />
          <div className="flex flex-row justify-between w-full">
            <div className="w-5/12">
              <Button
                label="Create Account"
                onClick={() => null}
                type="flat"
                btnActionType="submit"
              />
            </div>
          </div>
        </form>
      </>
    </UnAuthWrapper>
  );
}

export default SignUp;