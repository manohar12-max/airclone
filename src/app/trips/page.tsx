
import EmptyState from "../_components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage=async ()=>{
 const currentUser = await getCurrentUser();


 if(!currentUser){
    return <EmptyState title="Unauthorized" subtitle="Please login"/>
 }
 const reservations = await getReservations({userId:currentUser.id});
 if(reservations.length == 0){
    return <EmptyState title="No Reservations found" subtitle="You have no reservations yet"/>
 }
 return(
   
     <TripsClient
     reservations={reservations}
     currentUser={currentUser}

     />
   
 )
}

export default TripsPage;