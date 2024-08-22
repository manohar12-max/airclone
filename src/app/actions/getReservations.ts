import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
  listingId?: string; //we will query reservation with lisint id
  userId?: string; //by userId
  authorId?: string; //by author or loggrnd ise
}
export default async function getReservations(params: IParams) {

try{
  const { listingId, userId, authorId } = params;
  const query: any = {};
  if (listingId) {
    query.listingId = listingId;
  }
  if (userId) {
    query.userId = userId; //all the reservation made by us
  }
  if (authorId) {
    query.listing = { userId: authorId }; //other users made reservation for our listing
  }
  const reservations = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const safeReservations = reservations.map((reservation) => ({
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
    listing: {
      ...reservation.listing,
      createdAt: reservation.listing.createdAt.toISOString(),
    },
  }));
  return safeReservations;
}catch (e:any) {
     throw new Error(e);
}
}
