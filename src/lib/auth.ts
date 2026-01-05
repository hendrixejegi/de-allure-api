import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:8080',
  trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
  },
  session: {
    disableSessionRefresh: true,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1 hour
    },
  },
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  advanced: {
    /**
     * ⚠️ Development only
     *
     * This is enabled to avoid `403: MISSING_OR_NULL_ORIGIN` errors when
     * testing authentication in non-browser environments (e.g. Postman),
     * where the `Origin` header is not sent.
     *
     * Disables Origin header enforcement — do NOT enable in production.
     */
    disableOriginCheck: true,
  },
});
