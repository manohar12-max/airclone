
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../_components/EmptyState'
import getReservations from '../actions/getReservations'
import ListingCard from '../_components/listings/ListingCard'
import ReservationsClient from './ReservationsClient'

const Reservationpage = async() => {
    const currentUser=await getCurrentUser()
  
    if(!currentUser){
        return <EmptyState title="Unauthorized" subtitle="Login to book now"/>
    }
    const reservations=await getReservations({
        authorId: currentUser.id
    })
    if(!reservations){
        return <EmptyState title="No reservations found" subtitle="Explore and book now"/>
    }
  return (
    <div>
 
      <ReservationsClient
     reservations={reservations}
     currentUser={currentUser}

     />
     
    </div>
  )
}

export default Reservationpage
