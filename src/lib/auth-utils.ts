import authOptions from "@/app/api/auth/[...nextauth]/auth-options"
import { Session } from "inspector";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export const protectPage = async () => {
    
  const session: Session | null = await getServerSession(authOptions);

  if(!session) {
    redirect('/auth/login');
  }

}