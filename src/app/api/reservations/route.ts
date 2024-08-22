import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";
export async function POST(request:Request){
   const body=await request.json()
   const currentUser=await getCurrentUser()
   if(!currentUser){
       return NextResponse.error()
   }
   const {
    listingId,
    startDate,
    endDate,
    totalPrice
   }=body
   if(!listingId || !endDate || !totalPrice || !startDate ){
   return NextResponse.error()
   }

   const listingAndReservation=await prisma.listing.update({
    where:{
        id:listingId
    },
    data:{
        reservations:{
           create:{
            userId:currentUser.id,
            startDate,
            endDate,
            totalPrice,
           }
        }
    }
   })
  return NextResponse.json(listingAndReservation)
}