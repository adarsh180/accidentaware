import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth.config'

const handler = NextAuth(authOptions)

// Export handler for all HTTP methods
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH, handler as HEAD, handler as OPTIONS }