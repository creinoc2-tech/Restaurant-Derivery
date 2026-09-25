import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { getDatabase } from '@/lib/db'

let authInstance: ReturnType<typeof betterAuth> | undefined

export function getAuth() {
  if (authInstance) return authInstance

  const secret = process.env.BETTER_AUTH_SECRET
  const baseURL = process.env.BETTER_AUTH_URL
  if (!secret || !baseURL) {
    throw new Error('BETTER_AUTH_SECRET and BETTER_AUTH_URL are required to start Better Auth.')
  }

  authInstance = betterAuth({
    database: drizzleAdapter(getDatabase(), { provider: 'pg' }),
    secret,
    baseURL,
    emailAndPassword: { enabled: true },
    plugins: [tanstackStartCookies()],
  }) as unknown as ReturnType<typeof betterAuth>

  return authInstance
}
