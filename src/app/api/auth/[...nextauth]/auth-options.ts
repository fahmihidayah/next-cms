import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { User } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

// import GitHubProvider from 'next-auth/providers/github';
// import { env } from '@/env.mjs';
import prisma from '@/lib/prisma';
import { stripeServer } from '@/lib/stripe';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GitHubProvider({
    //   clientId: env.GITHUB_ID,
    //   clientSecret: env.GITHUB_SECRET,
    // }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<User> => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error('No user found');
        }

        const passwordMatch = await bcrypt.compare(
          credentials?.password ?? '',
          user.password ?? ''
        );
        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }
        console.log('fahmi authorize ', user);

        return {
          id: user.id,
          name: user.name ?? '',
          email: user.email ?? '',
          image: user.image ?? '',
          stripeCustomerId: user?.id,
          isActive: user.isActive,
        };
      },
    }),
  ],
  secret: 'f63ac1a2cd007b911140ca78aa2bf8ed',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'f63ac1a2cd007b911140ca78aa2bf8ed',
  },

  logger: {
    error: console.log,
    warn: console.log,
    info: console.log,
    debug: console.log,
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log(
        'fahmi jwt ',
        token,
        'user ',
        user,
        ' account ',
        account,
        ' profile ',
        profile,
        ' isNewUser '
      );
      if (!user) {
        return token;
      }

      token.name = user?.name ?? '';
      token.email = user.email ?? '';
      token.image = user.image ?? '';
      token.id = user?.id ?? '';
      token.stripeCustomerId = user.stripeCustomerId;
      token.isActive = user.isActive;
      return token;
    },

    async session({ session, user, token, newSession, trigger }) {
      console.log(
        'fahmi session ',
        session,
        'user ',
        user,
        ' token ',
        token,
        ' newSession ',
        newSession,
        ' trigger ',
        trigger
      );

      if (!session.user) return session;

      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/register',
  },
  events: {
    createUser: async ({ user }) => {
      if (!user.email || !user.name) return;

      await stripeServer.customers
        .create({
          email: user.email,
          name: user.name,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
};

export default NextAuth(authOptions);
