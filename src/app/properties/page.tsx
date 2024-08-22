
import EmptyState from "../_components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage=async ()=>{
 const currentUser = await getCurrentUser();


 if(!currentUser){
    return <EmptyState title="Unauthorized" subtitle="Please login"/>
 }
 const listings = await getListings({userId:currentUser.id});
 if(listings.length == 0){
    return <EmptyState title="No Properties found" subtitle="You have no properties yet"/>
 }
 return(
  
     <PropertiesClient
     listings={listings}
     currentUser={currentUser}

     />
    
 )
}

export default PropertiesPage;