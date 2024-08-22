import { Caramel } from "next/font/google";
import prisma from "../lib/prismadb";

interface IParams {
  listingId?: string;
}
export default async function getListingById(params: IParams) {
  const { listingId } = params;
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true, //we have to load the user so we can load user profile image and name
      },
    });
    if (!listing) {
      return null;
    }
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (err:any) {
    throw new Error(err);
  }
}
