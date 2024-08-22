import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../lib/prismadb";

export async function getSession(){
    // 
 return await getServerSession(authOptions)
}

export default async function getCurrentUser(){
    try{
     const session=await getSession() //get session we will use session to get current user
     if(!session?.user?.email) {
        return null
     }
     const currentUser =await prisma.user.findUnique({
        where: {
            email:session.user.email  as string
        }
     })
     if(!currentUser){
        return null;
     }
     return {
        ...currentUser,
        createdAt:currentUser.createdAt.toISOString(),
        updatedAt:currentUser.updatedAt.toISOString(),
        emailVerified:currentUser.emailVerified?.toISOString()|| null
       
     };
    }catch(e:any){
   return null;
    }
}