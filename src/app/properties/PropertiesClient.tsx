"use client";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../_components/listings/ListingCard";
interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete("/api/listings/"+id)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
          router.refresh();
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading center title="Properties" subtitle="List of your properties" />
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
        {listings.map((listing) => (
          <ListingCard
           key={listing.id}
           data={listing}
           actionId={listing.id}
           onAction={onCancel}
           disabled={deletingId === listing.id}
           actionLabel="Delete Listing"
           currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
