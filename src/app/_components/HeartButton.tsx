"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/usefavorite";
import { LoaderIcon } from "react-hot-toast";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  
}) => {
  const { hasFavorited, toggleFavorite,loading } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
    relative 
    hover:opacity-80
    cursor-pointer
    "
    >
      {
        !loading ? (
          <>
            {" "}
            <AiOutlineHeart
              className="fill-white absolute -top-[2px] -right-[2px]"
              size={28}
            />
            <AiFillHeart
              className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
              size={24}
            />
          </>
        ):(
          <LoaderIcon/>
        )
      }
    </div>
  );
};

export default HeartButton;
