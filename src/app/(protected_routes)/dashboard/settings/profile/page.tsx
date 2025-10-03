"use client"

import EditableFormDetails from "@/components/Form/EditableFormDetails"
import MultiStepFormWrapper from "@/components/Form/MultiStepFormWrapper"
import ProfilemageCircle from "@/components/profile/ProfilemageCircle"
import { getProfileDetails, updateProfileDetails } from "@/store/actions/profile/profileActions"
import { useAppSelector } from "@/store/hooks"
import { getAbbr } from "@/utils/common"
import { country, states } from "@/utils/data"
import { IKYCData, IProfileDetails, IProfileUpdateActionBody } from "@/utils/types/profileTypes"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function AccountPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<IProfileDetails | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [kycData, setKycData] = useState<IKYCData | null>(null)

  const { profile } = useAppSelector(state => state.profile)
  const { data: session, update: updateSessionUserData } = useSession()


  useEffect(() => {
    getProfileDetails({})
  }, [])

  useEffect(() => {
    if (profile) {
      setData(profile)
      setKycData(profile.kyc_data ? profile.kyc_data[0] : null)
    }
  }, [session, profile])

  const handleChange = (name: keyof IProfileDetails, value: string) => {
    setData(prevState => prevState ? { ...prevState, [name]: value } : prevState);
  }

  const validateProfile = (body: IProfileUpdateActionBody) => {
    if (body.bvn && !/^[0-9]{11}$/.test(body.bvn)) return "BVN must be 11 digits";
    if (body.nimc && !/^[0-9]{11}$/.test(body.nimc)) return "NIN must be 11 digits";
    if (body.dob && isNaN(Date.parse(body.dob))) return "Date of birth is invalid";
    return null;
  };

  const handleUpdateProfile = () => {
    const reqBody: IProfileUpdateActionBody = {
      nimc: data?.nimc || "",
      bvn: data?.bvn || "",
      dob: data?.DOB || "",
      gender: data?.gender || "",
      address: data?.address || "",
      country: data?.country || "",
      state: data?.state || "",
      lga_of_origin: data?.lga_of_origin || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      kyc_data: kycData ? [kycData] : [],
    };
    const error = validateProfile(reqBody);
    if (error) {
      toast.error(error);
      return;
    }
    updateProfileDetails({
      data: reqBody,
      handleDone: () => {
        getProfileDetails({
          isSilent: true, handleDone: (resp) => {
            console.log(resp);
            updateSessionUserData({ newUserData: resp })
          }
        });
      }
    });
  };

  const steps = [
    {
      id: 0, title: "Personal Information",
      inputs: [
        {
          label: "First Name",
          name: "first_name",
          type: "text",
          placeholder: "Enter your first name",
          value: data?.first_name || "",
          onChange: handleChange,
          className: "lg:!w-[48%]",
        },
        {
          label: "Last Name",
          name: "last_name",
          type: "text",
          placeholder: "Enter your last name",
          value: data?.last_name || "",
          onChange: handleChange,
          className: "lg:!w-[48%]",
        },
        // {
        //   label: "Middle Name",
        //   name: "middle_name",
        //   type: "text",
        //   placeholder: "Enter your middle name",
        //   value: data?.middle_name || "",
        //   onChange: handleChange,
        //   icon: icons.profile,
        //   className: "lg:!w-[48%]",
        //   required: false,
        // },
        // {
        //   label: "Maiden Name",
        //   name: "maiden_name",
        //   type: "text",
        //   placeholder: "Enter your maiden name (if any)",
        //   value: data?.maiden_name || "",
        //   onChange: handleChange,
        //   icon: icons.profile,
        //   className: "lg:!w-[48%]",
        //   required: false,
        // },
        {
          type: "select",
          data: ["male", "female", "other"],
          label: "Gender",
          name: "gender",
          placeholder: "Enter your gender",
          value: data?.gender || "",
          onChange: handleChange,
          className: "",
        },
        {
          label: "Date of birth",
          name: "DOB",
          type: "date",
          placeholder: "Enter your dob",
          value: data?.DOB || "",
          onChange: handleChange,
          className: "",
        },
      ]
    },
    {
      id: 1, title: "Location Information",
      inputs: [
        {
          label: "Home Address",
          name: "address",
          type: "text",
          placeholder: "Enter your home address",
          value: data?.address || "",
          onChange: handleChange,
          className: "",
        },
        {
          type: "select",
          data: [...country],
          label: "nationality",
          name: "country",
          placeholder: "Enter your nationality",
          value: data?.country || "",
          onChange: handleChange,
          className: "",
        },
        {
          type: "select",
          data: [...states],
          label: "State of Origin",
          name: "state",
          placeholder: "Select your state of origin",
          value: data?.state || "",
          onChange: handleChange,
          className: "lg:!w-[48%]",
        },
        {
          label: "LGA of Origin",
          name: "lga_of_origin",
          type: "text",
          placeholder: "Enter your LGA of origin",
          value: data?.lga_of_origin || "",
          onChange: handleChange,
          className: "lg:!w-[48%]",
        },
      ]
    },
    {
      id: 2, title: "KYC Information",
      inputs: [
        {
          label: "BVN (11 digits)",
          name: "bvn",
          type: "text",
          placeholder: "Enter your 11 digits BVN",
          value: data?.bvn || "",
          onChange: handleChange,
          className: "",
        },
        {
          label: "National Identification Number (NIN)",
          name: "nimc",
          type: "nimc",
          placeholder: "Enter your 11 digits nin number",
          value: data?.nimc || "",
          onChange: handleChange,
          className: "",
        },
        {
          label: "Passport photograph",
          name: "kyc",
          id: "kyc",
          type: "file",
          accept: ".jpeg, .jpg, .png, .pdf",
          placeholder: "Upload your Passport photograph",
          value: kycData || "",
          onChange: handleChange,
          className: "",
        },
      ]
    }
  ]

  const layoutComponent = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      setIsUploading(true);
      import("@/store/actions/profile/profileActions").then(({ updateProfileImage }) => {
        updateProfileImage({
          data: formData,
          handleDone: () => {
            getProfileDetails({ isSilent: true });
            setIsUploading(false);
          },
          handleError: () => setIsUploading(false)
        });
      });
    };

    return (
      <div className="w-full flex flex-col items-start justify-center gap-3 rounded-xl mb-10">
        <div className="relative group flex-shrink-0">
          <ProfilemageCircle size={95} />
          <label htmlFor="profile-image-upload" className="absolute bottom-2 right-2 bg-[#222] text-white rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out shadow-lg" title="Change profile image">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </label>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
              <span className="text-white text-base font-semibold">Uploading...</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start ">
          <p className="text-lg font-bold leading-tight text-[#222] m-0">{profile?.first_name} {profile?.last_name}</p>
          <p className="text-sm font-medium leading-tight m-0 text-[#222222CC] break-all">{profile?.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <MultiStepFormWrapper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} customLaayoutComponent={layoutComponent}>
        {currentStep === 0 &&
          (<EditableFormDetails defaultEditMode={editMode} setDefaultEditMode={setEditMode} currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[0]} numberOfSteps={2} />)}
        {currentStep === 1 &&
          (<EditableFormDetails defaultEditMode={editMode} setDefaultEditMode={setEditMode} currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[1]} numberOfSteps={2} />)}
        {currentStep === 2 &&
          (<EditableFormDetails defaultEditMode={editMode} setDefaultEditMode={setEditMode} currentStep={currentStep} setCurrentStep={setCurrentStep} data={steps[2]} numberOfSteps={2} handleSubmit={handleUpdateProfile} />)}
      </MultiStepFormWrapper>
    </div>
  )
}