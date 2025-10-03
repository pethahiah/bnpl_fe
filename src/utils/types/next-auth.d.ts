import NextAuth from "next-auth";
import { IProfileDetails } from "@/utils/types/profileTypes";

declare module "next-auth" {
  interface Session {
    id: string;
    usertype: string;
    accessToken: string;
    user: IProfileDetails;
  }
  interface User {
    id: string;
    usertype: string;
    accessToken: string;
    userData: IProfileDetails;
  }
}