
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../_components/EmptyState";
import getListings from "../actions/getListings";
import getFavoriteListing from "../actions/getFavoriteListing";
import Container from "../_components/Container";
import FavoritesClient from "./FavoritesClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title={"Unauthorized"}
        subtitle="Login to add your favorite listings"
      />
    );
  }
  const favorites = await getFavoriteListing();
  if (favorites.length == 0) {
    return (
      <EmptyState
        title={"No favorites found"}
        subtitle="Looks like you have no favorite listings yet."
      />
    );
  }
  return (
       
        <div className="">
        
            <FavoritesClient
            listings={favorites}
            currentUser={currentUser}
            />
            
        </div>
    
  );
};

export default page;
