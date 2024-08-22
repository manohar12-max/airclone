import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListing() {

    try{
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return [];
    }
    // const listingIds=[...currentUser.favoriteIds]
    // const listings=listingIds.map((id)=>{
    //     return prisma.listing.findUnique({
    //         where:{
    //             id:id
    //         }
    //     })
    // })
    const favorites=await prisma.listing.findMany({
        where:{
            id:{
                in:[...(currentUser.favoriteIds)|| []]
            }
        }
    })
    const safeFavorites=favorites.map((favorite)=>({
        ...favorite,
        createdAt:favorite.createdAt.toISOString()
    }))
    return safeFavorites;
}catch (e:any) {
throw new Error(e)
}

}