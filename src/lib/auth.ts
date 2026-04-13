import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { APIError } from "better-auth/api";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: async (profile) => {
        if (!profile.email?.endsWith("@intellibus.com")) {
          throw new APIError("UNAUTHORIZED", {
            message: "Only @intellibus.com emails are allowed.",
          });
        }
        return {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    },
  },
});
