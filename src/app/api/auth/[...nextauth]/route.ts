import getBaseURL from "@/utils/getBaseURL";
import { IProfileDetails } from "@/utils/types/profileTypes";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const url = getBaseURL() as string;
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          return null;
        }

        try {
          const response = await axios.post(`${url}loginViaOtp`, {
            email: credentials.email,
            otp: credentials.otp,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const data = await response.data;
          if (data.status !== 200) {
            return null;
          }
          const userData = data.user;
          const token = data.access_token;
          if (!token) {
            return null;
          }

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return {
            id: userData.id,
            usertype: userData.usertype,
            accessToken: token,
            userData,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // Add user data to token when signing in
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.usertype = user.usertype;
        token.userData = user.userData as IProfileDetails;
      }

      // If the session is updated via `useSession().update()`, use that data
      if (trigger === "update" && session?.newUserData) {
        token.userData = session.newUserData as IProfileDetails;
      }

      return token;
    },
    async session({ session, token }: any) {
      // Add user data to session      
      if (token) {
        session.id = token.id;
        session.usertype = token.usertype;
        session.accessToken = token.accessToken;
        session.user = token.userData as IProfileDetails;
      }
      return session;
    },
    // Add this callback
    async signOut() {
      try {
        await axios.get(`${url}logout`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return true;;
      } catch (error) {
        console.error("Error during signout:", error);
        // Return true to continue logout process even if token invalidation fails
        return true;
      }
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST }
