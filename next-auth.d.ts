import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        userId?: string; // Add userId to the session object
        token?: string;  // Optionally add token to the session object
    }

    interface User {
        id?: string;  // Ensure User also includes id if needed
    }

    interface JWT {
        userId?: string; // Add userId to the JWT object
        token?: string;  // Optionally add token to the JWT object
    }
}
