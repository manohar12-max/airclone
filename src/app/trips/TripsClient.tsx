"use client"
import { SafeReservation, SafeUser } from '../types'
import Container from '../_components/Container';
import Heading from '../_components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../_components/listings/ListingCard';
interface TripsClientProps{
    reservations:SafeReservation[] ;
    currentUser?:SafeUser|null
}

const TripsClient:React.FC<TripsClientProps> = ({
        reservations,
        currentUser
    
}) => {
    const router = useRouter();
    const [deletingId,setDeletingId]=useState("")
    const onCancel=useCallback((id:string)=>{
     setDeletingId(id);
     axios.delete ("/api/reservations/"+id)
     .then(()=>{
        toast.success("Successfully cancelled the reservation")
        router.refresh()

     }).catch((err)=>{
        toast.error(err?.response?.data?.error)
     })
     .finally(()=>{
        setDeletingId("")
        router.refresh()

     })
    },[router])
  return (
   <Container>
    <Heading 
    center
    title="My-Trips"
    subtitle="Your upcoming trips"
    />
    <div className="
    mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
     ">
     {reservations.map(reservation=>(
        <ListingCard
        key={reservation.id}
        data={reservation.listing}
        reservation={reservation}
        actionId={reservation.id}
        onAction={onCancel}
        disabled={deletingId===reservation.id}
        actionLabel="Cancel Reservation"
        currentUser={currentUser}
        />
     ))}
    </div>
   </Container>
  )
}

export default TripsClient
