'use client';

import useClientSession from "@/hooks/use-client-session";
import { CustomInputProps } from "@premieroctet/next-admin";

type Props = CustomInputProps;

export const UserHiddenInput =  ({ value, name, onChange, disabled, required }: Props) : JSX.Element => {
    const useSession = useClientSession();
   
    console.log('useSession', useSession);
    return (
        <input type="hidden"  name={name} value={ useSession?.session?.user?.id} />
    );
}