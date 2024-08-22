import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request:Request
){
const currentUser = await getCurrentUser()
if(!currentUser){
    return NextResponse.error()
}
const body =await request.json();

const {
    title,
    imageSrc,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    price,
    locationValue,
    category,
}=body;


const newListing=await prisma.listing.create({data:{
    title,
    imageSrc,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    price:parseInt(price,10),
    locationValue,
    category,
    userId:currentUser.id,
 
}})
return NextResponse.json(newListing)
}

