import NextAuth from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      roles: Role[]
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    roles: Role[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    roles: Role[]
  }
}