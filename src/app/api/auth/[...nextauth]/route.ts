import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" }, // for already verified users
      },
      async authorize(credentials) {
        const url = process.env.NEXT_PUBLIC_BASE_IDENTITY;

        // CASE 1: Token-based login (no OTP)
        if (credentials?.token) {
          try {
            const userData = jwtDecode(credentials.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${credentials.token}`;

            //@ts-expect-error - This will error in strict mode
            const profile = JSON.parse(userData.Profile);
            return {
              //@ts-expect-error
              id: userData.UID,
              companyName: profile.CompanyName,
              email: profile.UserName,
              firstname: profile.FirstName,
              lastname: profile.LastName,
              //@ts-expect-error
              role: userData.role,
              accessToken: credentials.token,
            };
          } catch (err) {
            console.error("Token decode failed:", err);
            return null;
          }
        }

        if (credentials?.email && credentials?.otp) {
          try {
            // Call your third-party authentication endpoint
            const response = await axios(`${url}auth/login/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'ApplicationID': process.env.NEXT_PUBLIC_API_KEY,
              },
              data: {
                otp: credentials.otp,
                userName: credentials.email
              },
            });

            if (!response.data) {
              return null;
            }

            const { data } = await response.data;
            const userData = jwtDecode(data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            //@ts-expect-error - This will error in strict mode
            const profile = JSON.parse(userData.Profile);
            return {
              //@ts-expect-error
              id: userData.UID,
              companyName: profile.CompanyName,
              email: profile.UserName,
              firstname: profile.FirstName,
              lastname: profile.LastName,
              //@ts-expect-error
              role: userData.role,
              accessToken: data.token,
            };
          } catch (error: unknown) {
            console.error("Authentication error:", error);
            return null;
          }
        }

        // If no valid credentials provided
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Add user data to token when signing in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyName = user.companyName;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        // Store the access token in the JWT
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: any) {
      // Add user data to session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.companyName = token.companyName;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        // Add the access token to the session for API calls
        session.accessToken = token.accessToken;
      }
      return session;
    },

    // Add this callback
    async signOut() {
      try {
        // You can make a server-side call to invalidate the token
        // This is useful if your auth provider requires server-side logout
        return true;
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };