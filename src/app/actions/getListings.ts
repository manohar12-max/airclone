import prisma from "../lib/prismadb";
export interface IListingsParams{
  userId?: string;
  guestCount?:number;
  roomCount?:number;
  bathroomCount?:number;
  startDate?:string;
  endDate?:string;
  locationValue?:string;
  category?:string;
}
export default async function getListings(
  params:IListingsParams
){
    try{
   
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category
    }=params
    let query:any={}
    if(userId){
       query.userId=userId
    }
    if(category){
      query.category=category
    }
    if(roomCount){
      query.roomCount=
         {
          gte:+roomCount //gte means greater than equal; + to convert string to number
         
         }
    }
    if(guestCount){
      query.guestCount=
         {
          gte:+guestCount //gte means greater than equal; + to convert string to number
         
         }
    }

    if(bathroomCount){
      query.bathroomCount=
         {
          gte:+bathroomCount //gte means greater than equal; + to convert string to number
         
         }
    }

    if(startDate && endDate){
      query.NOT={
        reservations:{
          some:{
          OR:[
            {
              endDate:{gte:startDate},
              startDate:{lte:endDate}
            },
            {
              startDate:{lte:startDate},
              endDate:{gte:endDate}
            }
          ]
          }
        }
      }
    }

    if(locationValue){
      query.locationValue=locationValue
    }

      const listings =await prisma.listing.findMany({
        where:query,
        orderBy: {
            createdAt: "desc" //in descending order
        }
      })
      const safeListings=listings.map(listing=>({...listing,
        createdAt:listing.createdAt.toISOString()
      }))
      return safeListings;
    }catch(err:any){
        throw new Error(err.message);
    }
}











// import prisma from "../lib/prismadb";
// export interface IListingsParams{
//   userId?: string;
// }
// export default async function getListings(
//   params:IListingsParams
// ){
//     try{

//     const {userId}=params
//     let query:any={}
//     if(userId){
//        query.userId=userId
//     }


//       const listings =await prisma.listing.findMany({
//         where:query,
//         orderBy: {
//             createdAt: "desc" //in descending order
//         }
//       })
//       const safeListings=listings.map(listing=>({...listing,
//         createdAt:listing.createdAt.toISOString()
//       }))
//       return safeListings;
//     }catch(err:any){
//         throw new Error(err.message);
//     }
// }