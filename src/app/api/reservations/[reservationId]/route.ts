import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"
interface IParams{
    reservationId?:string
}
export async function DELETE(
    request:Request,
    {params}: { params: IParams }
){
  const {reservationId} = params
  const currentUser = await getCurrentUser()
  if(!currentUser){
    return NextResponse.error()
  }
  if(!reservationId || typeof reservationId!=='string'){
    throw new Error("Invalid ID")
  }
  const reservation=await prisma.reservation.deleteMany({
    where:{
      id:reservationId,  //only the user who have did reservation or the owner of lisitng can delete the reservation
      OR:[
        {
            userId:currentUser.id
        },
        {
            listing:{userId:currentUser.id}
        }
    ]
    }
  })
  return NextResponse.json(reservation)
}