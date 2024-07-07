'use client';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export interface ClientSession {
  session: Session | null;
  state: 'loading' | 'autenticated' | 'unauthenticated';
}

export default function useClientSession() {
  const [session, setSession] = useState<ClientSession | null>(null);

  const requestSession = async () => {
    setSession({ session: null, state: 'loading' });
    const session = await getSession(authOptions);
    if (session) {
      setSession({
        session: session,
        state: 'autenticated',
      });
      return;
    } else {
      setSession({
        session: null,
        state: 'unauthenticated',
      });
      return;
    }
  };

  useEffect(() => {
    async function fetchSession() {
      requestSession();
    }
    fetchSession();
  }, []);

  return session;
}
