"use client";
import {
  FormEvent,
  useEffect,
  useState
} from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import UnAuthWrapper from "@/components/UnAuthWrapper";
import { scrollUp } from "../../../utils/common";
import { useRouter } from 'next/navigation';

import { getAllServices, getAuthOTP, registerBusiness } from "../../../store/actions/auth/authActions";
// import { documents } from "../../assets";

function SignUp() {
  const [step, setStep] = useState<number>(0);
  const [requestingOTP, setRequestingOTP] = useState(false);
  const navigate = useRouter();

  const [data, setData] = useState({
    "companyName": "",
    "companyAddress": "",
    "companyEmail": "",
    "companyPhone": "",
    "businessRegistrationNumber": "",
    "employeeSize": '',
    "description": "",
    "webSiteAddress": "",
    // "employerCode": "",
    "emailConfirmationOtp": "",
    "firstName": "",
    "lastName": "",
    "emailAddress": "",
    "phoneNumber": ""
  });
  const [time, setTime] = useState(10 * 60); // Initial time in seconds

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clear interval on component unmount
    }
  }, [time]);

  useEffect(() => {
    getAllServices((data) => {
      console.log(data, '=-=-=data=-=-')
    });
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    scrollUp();
  }, []);


  const handleRegisterBusiness = (event: React.FormEvent) => {
    event.preventDefault();
    const newData = { ...data };
    // @ts-ignore
    delete newData.emailAddress;
    // @ts-ignore
    delete newData.firstName;
    // @ts-ignore
    delete newData.lastName;
    // @ts-ignore
    delete newData.phoneNumber;
    registerBusiness({
      ...newData,
      adminUserDetails: {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "emailAddress": data.emailAddress,
        "phoneNumber": data.phoneNumber
      }
    }, () => {
      navigate.push('/login');
    });
  }

  const isFirst = step === 0;
  const isSecond = step === 1;
  const isThird = step === 2;
  const renderStep = () => {
    return (
      <div className="stepper">
        <div className={`step ${isFirst ? 'active' : ''}`} />
        <div className="dash" />
        <div className={`step ${isSecond ? 'active' : ''}`} />
        <div className="dash" />
        <div className={`step ${isThird ? 'active' : ''}`} />
      </div>
    )
  };

  const handleGetOTP = (event: FormEvent) => {
    event.preventDefault();
    setRequestingOTP(true);
    getAuthOTP({ emailAddress: data.companyEmail }, () => {
      setStep(1);
      setTime(10 * 60);
      setRequestingOTP(true);
    });
  }

  const resendOTP = () => {
    if (time !== 0) return;
    getAuthOTP({ emailAddress: data.companyEmail }, () => {
      setTime(10 * 60);
    });
  }

  const renderTitle = (): string => {
    const textMap: Record<number, string> = {
      0: 'Let’s get started! Please provide your information to begin.',
      1: 'We’d love to learn more about your business. Tell us the details.',
      2: 'Kindly provide the contact details of the account administrator.'
    }
    return textMap[step] as string;
  }

  const handleSubmitDetails = (event: FormEvent) => {
    event.preventDefault();
    setStep(2);
  }

  const label = time === 0 ? 'Resend' : `Resend in ${formatTime(time)} minutes`;

  return (
    <UnAuthWrapper
      title="Get onboard"
      subTitle={renderTitle()}
      ctaQuestion="Already have a Paythru account?"
      ctaRoute="login"
      ctaText="Log In"
      overrideContentClass='signup-form'
    >
      <>
        <div className="flex flex-start">{renderStep()}</div>
        {
          step === 0 && (
            <form onSubmit={handleGetOTP}>
              <Input
                label="Email Address"
                placeholder="someone@example.com"
                name="companyEmail"
                required
                type="email"
                value={data.companyEmail}
                onChange={handleChange}
                info={"You will recieve your account verification code and login credentials on this email address."}
              />
              <Button
                label="Continue"
                type="flat"
                btnActionType="submit"
                disabled={requestingOTP}
              />
            </form>
          )
        }
        {
          step === 1 && (
            <form className="flex justify-between flex-wrap max-w-[400px] sm:max-w-[700px] overflow-auto" onSubmit={handleSubmitDetails}>
              <div className="w-[48%]">
                <Input
                  label="OTP"
                  placeholder="OTP"
                  name="emailConfirmationOtp"
                  required
                  value={data.emailConfirmationOtp}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[48%]">
                <Input
                  label="Business Name"
                  placeholder="Business Name"
                  name="companyName"
                  required
                  value={data.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Business Phone"
                  type="tel"
                  placeholder="+2347XXXXXXXXX"
                  required
                  // @ts-ignore
                  pattern="[789][0-9]{9}"
                  name="companyPhone"
                  value={data.companyPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Website Address"
                  placeholder="www.url.com"
                  name="webSiteAddress"
                  required
                  pattern="^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\-\.]*)?\/?$"
                  value={data.webSiteAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%]">
                <Input
                  label="Business email address"
                  placeholder="info@business.com"
                  name="companyEmail"
                  required
                  readonly
                  value={data.companyEmail}
                  onChange={handleChange}
                />
              </div>
              {/* <Input
                label="Pension employer code"
                placeholder=""
                name="employerCode"
                required
                value={data.employerCode}
                onChange={handleChange}
              /> */}
              <div className="w-[100%]">
                <Input
                  label="Business Address"
                  placeholder="Business Address"
                  name="companyAddress"
                  required
                  value={data.companyAddress}
                  onChange={handleChange}
                />
              </div>
              <Input
                label="Description"
                placeholder="Please describe your business"
                name="description"
                required
                value={data.description}
                onChange={handleChange}
                maxLength={500}
              />
              <div className="w-[48%]">
                <Input
                  label="Employee Size"
                  placeholder="Employee Size"
                  type="number"
                  name="employeeSize"
                  required
                  value={data.employeeSize}
                  onChange={handleChange}

                />
              </div>
              <div className="w-[48%]">
                <Input
                  label="RC Number"
                  placeholder="Business registration number"
                  name="businessRegistrationNumber"
                  required
                  value={data.businessRegistrationNumber}
                  onChange={handleChange}
                />
              </div>

              {/* <p>By creating an account, you agree to all our <Link to="/terms"><b>Terms & Conditions</b></Link> and <a href={documents.privacy_doc}><b>Privacy Policy</b></a> and confirm that the information I Have provided is accurate.</p> */}

              <div className="flex flex-row justify-between w-full">
                <Button
                  label={label}
                  type="contained"
                  btnActionType="button"
                  onClick={resendOTP}
                  overrideStyle={{
                    width: '48%'
                  }}
                  disabled={time === 0}
                />
                <Button
                  label="Continue"
                  type="flat"
                  btnActionType="submit"
                  overrideStyle={{
                    width: '48%'
                  }}
                />
              </div>
            </form>
          )
        }
        {
          step === 2 && (
            <form onSubmit={handleRegisterBusiness} className="flex justify-between flex-wrap max-w-[400px] sm:max-w-[700px]">
              <div className="w-[48%]">
                <Input
                  label="Firstname"
                  placeholder="Adegbami"
                  name="firstName"
                  required
                  value={data.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[48%]">
                <Input
                  label="Lastname"
                  placeholder="Okon"
                  name="lastName"
                  required
                  value={data.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Email"
                  placeholder="okon@adegbami.com"
                  name="emailAddress"
                  required
                  value={data.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="+2347XXXXXXXXX"
                  required
                  // @ts-ignore
                  pattern="[789][0-9]{9}"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="w-5/12">
                  <Button
                    label="Previous"
                    onClick={() => setStep(1)}
                    type="contained"
                    btnActionType="submit"
                    overrideStyle={{ width: '100%' }}
                  />
                </div>
                <div className="w-5/12">
                  <Button
                    label="Submit"
                    onClick={() => null}
                    type="flat"
                    btnActionType="submit"
                  />
                </div>
              </div>
            </form>
          )
        }
         {
          step === 3 && (
            <form onSubmit={handleRegisterBusiness} className="flex justify-between flex-wrap max-w-[400px] sm:max-w-[700px]">
              <div className="w-[48%]">
                <Input
                  label="Firstname"
                  placeholder="Adegbami"
                  name="firstName"
                  required
                  value={data.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[48%]">
                <Input
                  label="Lastname"
                  placeholder="Okon"
                  name="lastName"
                  required
                  value={data.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Email"
                  placeholder="okon@adegbami.com"
                  name="emailAddress"
                  required
                  value={data.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="w-[100%] sm:w-[48%]">
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="+2347XXXXXXXXX"
                  required
                  // @ts-ignore
                  pattern="[789][0-9]{9}"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="w-5/12">
                  <Button
                    label="Previous"
                    onClick={() => setStep(1)}
                    type="contained"
                    btnActionType="submit"
                    overrideStyle={{ width: '100%' }}
                  />
                </div>
                <div className="w-5/12">
                  <Button
                    label="Submit"
                    onClick={() => null}
                    type="flat"
                    btnActionType="submit"
                  />
                </div>
              </div>
            </form>
          )
        }
      </>
    </UnAuthWrapper>
  );
}

export default SignUp;