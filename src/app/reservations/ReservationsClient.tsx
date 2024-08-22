"use client"
import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../_components/Container";
import ListingCard from "../_components/listings/ListingCard";
import Heading from "../_components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(async (id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservations cancelled successfully");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setDeletingId("");
        router.refresh();
      });
  }, []);
  return (
    <Container>
      <Heading center title="Reservations" subtitle="Booking on your properties" />
      <div
        className="
         mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
     "
      >
        {reservations.map((reservation) => (
          <ListingCard
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            actionId={reservation.id}
            key={reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
