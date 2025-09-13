"use client"

import { icons } from "@/assets";
import ComplianceFormComponent from "@/components/Compliance/ComplianceFormComponent";
import ComplianceWrapper from "@/components/Compliance/ComplianceWrapper";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [data, setData] = useState({
    "businessInfo": {
      "businessName": "",
      "description": "",
      "employeeSize": "",
      "rcNumber": "",
      "productsOfInterest": [],
    },
    "contactDetails": {
      "email": "",
      "phoneNumber": "",
      "websiteAddress": "",
      "businessOfficeAdress": "",
    },
    "ownersDetails": {
      "firstName": "",
      "lastName": "",
      "bvn": "",
      "identificationDocument": "",
      "identificationNumber": "",
      "homeAddress": "",
      "proofOfAddress": "",
    },
    "accountDetails": {
      "bankName": "",
      "accountNumber": "",
      "accountName": "",
    }
  });

  const handleChange = (name: string, value: string) => {
    currentStep === 0 ?
      setData((prevState: any) => ({
        ...prevState,
        "businessInfo": {
          ...prevState.businessInfo,
          [name]: value
        }
      }))
      : currentStep === 1 ?
        setData((prevState: any) => ({
          ...prevState,
          "contactDetails": {
            ...prevState.contactDetails,
            [name]: value
          }
        }))
        : currentStep === 2 ?
          setData((prevState: any) => ({
            ...prevState,
            "ownersDetails": {
              ...prevState.ownersDetails,
              [name]: value
            }
          }))
          : currentStep === 3 ?
            setData((prevState: any) => ({
              ...prevState,
              "accountDetails": {
                ...prevState.accountDetails,
                [name]: value
              }
            }))
            : null
  };

  const steps = [
    {
      id: 0, title: "Business Information",
      inputs: [
        {
          label: "Business Name",
          name: "businessName",
          required: true,
          type: "text",
          placeholder: "Enter your business name",
          value: data.businessInfo.businessName,
          onChange: handleChange,
          icon: icons.work
        },
        {
          label: "Description",
          name: "description",
          required: true,
          type: "text",
          placeholder: "Description",
          value: data.businessInfo.description,
          onChange: handleChange,
          icon: icons.document
        },
        {
          label: "Employee Size",
          name: "employeeSize",
          required: true,
          type: "select",
          data: ["10-20", "20-50", "50-200", "200-1000"],
          placeholder: "Select your business size",
          value: data.businessInfo.employeeSize,
          onChange: handleChange,
          className: "lg:!w-[48%]",
          icon: icons.threeUsers
        },
        {
          label: "RC Number",
          name: "rcNumber",
          required: true,
          type: "text",
          placeholder: "Enter your business RC number",
          value: data.businessInfo.rcNumber,
          onChange: handleChange,
          className: "lg:!w-[48%]",
          icon: icons.work
        },
        {
          label: "Product of Interest",
          name: "productsOfInterest",
          required: true,
          type: "multiselect",
          placeholder: "Select the products you want to use on this app",
          value: data.businessInfo.productsOfInterest,
          onChange: handleChange,
          data: [
            {
              value: "directDebit",
              label: "Direct Debit",
              chipBg: "#FFECEC"
            },
            {
              value: "nqrApi",
              label: "NQR API",
              chipBg: "#F8ECFF"
            },
            {
              value: "cardless",
              label: "Cardless",
              chipBg: "#ECF3FF"
            },
            {
              value: "bvnIgee",
              label: "BVN IGEE",
              chipBg: "#ECFFED"
            },
          ]
        },
      ]
    },
    {
      id: 1, title: "Contact details",
      inputs: [
        {
          label: "Email Address",
          name: "email",
          required: true,
          type: "email",
          placeholder: "Enter your email address",
          value: data.contactDetails.email,
          onChange: handleChange,
          icon: icons.at
        },
        {
          label: "Phone Number",
          name: "phoneNumber",
          required: true,
          type: "tel",
          value: data.contactDetails.phoneNumber,
          onChange: handleChange,
          pattern: "[789][0-9]{9}"
        },
        {
          label: "Website Address (URL)",
          name: "websiteAddress",
          required: true,
          type: "text",
          placeholder: "Enter your business website address",
          value: data.contactDetails.websiteAddress,
          onChange: handleChange,
          pattern: "^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\-\.]*)?\/?$",
          icon: icons.document
        },
        {
          label: "Business Office Address",
          name: "businessOfficeAdress",
          required: true,
          type: "text",
          placeholder: "Enter your business office address",
          value: data.contactDetails.businessOfficeAdress,
          onChange: handleChange,
          icon: icons.location
        },
      ]
    },
    {
      id: 2, title: "Owner’s details",
      formInfo: () => (<>
        Proof of address can be any of these documents, not more than 6 months old:
        <ol className="list-decimal ml-4 mt-3">
          <li>Utility bill for services to the address.</li>
          <li>Bank statement showing current address.</li>
          <li>Tax assessment.</li>
          <li>Cable TV bill such as DSTV bill.</li>
          <li>Letter from a public authority.</li>
        </ol>
      </>),
      inputs: [
        {
          label: "First Name",
          name: "firstName",
          required: true,
          type: "text",
          placeholder: "Enter your first name ",
          value: data.ownersDetails.firstName,
          onChange: handleChange,
          className: "lg:!w-[48%]",
          icon: icons.profileRed
        },
        {
          label: "Last Name",
          name: "lastName",
          required: true,
          type: "text",
          placeholder: "Enter your last name ",
          value: data.ownersDetails.lastName,
          onChange: handleChange,
          className: "lg:!w-[48%]",
          icon: icons.profileRed
        },
        {
          label: "Bank Verification Number (BVN)",
          name: "bvn",
          required: true,
          type: "text",
          placeholder: "Enter your BVN",
          value: data.ownersDetails.bvn,
          onChange: handleChange,
          icon: icons.profileRed
        },
        {
          label: "Identification Document",
          name: "identificationDocument",
          required: true,
          type: "select",
          data: ["National Identification Number"],
          placeholder: "Select an identification document",
          value: data.ownersDetails.identificationDocument,
          onChange: handleChange,
          icon: icons.document
        },
        {
          label: "Identification Number",
          name: "identificationNumber",
          required: true,
          type: "text",
          placeholder: "Enter your identification number",
          value: data.ownersDetails.identificationNumber,
          onChange: handleChange,
          icon: icons.document
        },
        {
          label: "Home Address",
          name: "homeAddress",
          required: true,
          type: "text",
          placeholder: "Enter your home address",
          value: data.ownersDetails.homeAddress,
          onChange: handleChange,
          icon: icons.location
        },
        {
          label: "Proof of Address",
          name: "proofOfAddress",
          id: "proofOfAddress",
          required: true,
          type: "file",
          placeholder: "upload a proof of address",
          value: data.ownersDetails.proofOfAddress,
          onChange: handleChange,
          accept: "application/pdf"
        },
      ]
    },
    {
      id: 3, title: "Account details",
      formInfo: () => `To help us verify your account, the name on your bank account should match the name
you provided as the owner of your business.`,
      inputs: [
        {
          label: "Bank Name",
          name: "bankName",
          required: true,
          type: "text",
          placeholder: "Enter your bank name ",
          value: data.accountDetails.bankName,
          onChange: handleChange,
          icon: icons.document
        },
        {
          label: "Account Number",
          name: "accountNumber",
          required: true,
          type: "text",
          placeholder: "Enter your bank account number ",
          value: data.accountDetails.accountNumber,
          onChange: handleChange,
          icon: icons.document
        },
        {
          label: "Account Name",
          name: "accountName",
          required: true,
          type: "text",
          placeholder: "Enter your bank account name ",
          value: data.accountDetails.accountName,
          onChange: handleChange,
          icon: icons.profileRed
        },
      ]
    },
  ]

  return (
    <div className="min-h-screen sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <ComplianceWrapper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep}>
        {currentStep === 0 &&
          (<ComplianceFormComponent currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[0]} />)}
        {currentStep === 1 &&
          (<ComplianceFormComponent currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[1]} />)}
        {currentStep === 2 &&
          (<ComplianceFormComponent currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[2]} />)}
        {currentStep === 3 &&
          (<ComplianceFormComponent currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[3]} />)}
      </ComplianceWrapper>
    </div>
  );
}
