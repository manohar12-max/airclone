import React from 'react'
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/_components/EmptyState'
import getCurrentUser from '@/app/actions/getCurrentUser'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

interface IParams{
    listingId?:string
}

const ListingPage = async({params}:{params:IParams}) => {
    const listing=await getListingById(params)
    const currentUser=await getCurrentUser()
    const reservations=await getReservations(params)
    if(!listing){
       return <EmptyState/>
    }
  return (
    <div>
    <ListingClient
    listing={listing}
    currentUser={currentUser}
    reservations={reservations}
    />
    </div>
  )
}

export default ListingPage
