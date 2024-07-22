'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import '@radix-ui/themes/styles.css';



export default function MainProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider session={session}>
    {children}
  </SessionProvider>;
}
