import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export const UserRepository = {

    findByEmail : async (email: string) : Promise <User | null> => {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }
}