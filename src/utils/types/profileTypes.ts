export interface IKYCData {
  name: string,
  file: string
  uploaded_at: string
}

export interface IProfileUpdateActionBody {
  // name details
  first_name?: string | null,
  last_name?: string | null,
  // middle_name: string | null,
  // maiden_name: string | null,

  // personal details
  gender?: string | null,
  dob?: string | null,
  age?: number,

  // location data
  address?: string,
  country?: string | null,
  state?: string | null,
  lga_of_origin?: string | null,
  
  // erification details
  bvn?: string | null,
  nimc?: string | null,
  kyc_data?: IKYCData[] | null
}

export interface IProfileDetails {
  id: number,
  name: string | null,
  email: string | null,
  usertype: "merchant" | "customer" | "admin",
  first_name: string | null,
  last_name: string | null,
  address: string | null,
  country: string | null,
  state: string | null,
  company_name: string | null,
  nimc: string | null,
  bvn: string | null,
  nin_bvnDetails: string | null,
  enrollment_username: string | null,
  image: string | null,
  face_image: string | null,
  email_verified_at: string | null,
  phone: string | null,
  otp: string | null,
  lga_of_origin: string | null,
  gender: string | null,
  age: string | null,
  DOB: string | null,
  maiden: string | null,
  isVerified: "0" | "1",
  flag: "0" | "1",
  accessToken: string | null,
  kyc_data: IKYCData[] | null,
  created_at: string | null,
  updated_at: string | null
}