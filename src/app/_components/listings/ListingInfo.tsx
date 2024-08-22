import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import LisitngCategory from "./LisitngCategory";



interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  price: number;
  guestCount: number;
  bathroomCount: number;
  roomCount: number;
  description: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  price,
  guestCount,
  bathroomCount,
  roomCount,
  description,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  const coordinates = location?.latlan;

  return (
    <div
      className="col-span-4
    flex
    flex-col
    gap-8"
    >
      <div
        className="
      flex
      flex-col
      gap-2

      "
      >
        <div
          className="
        text-xl
        font-semibold
        flex
        flex-row
        items-center
        gap-2

        "
        >
          <div className="">Hosted by {user.name} </div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex flex-row
            items-center
            gap-4 font-light
            text-neutral-500
            "
        >
          <div className="">{guestCount} guests</div>
          <div className="">{roomCount} rooms</div>
          <div className="">{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {
        category && (
         <LisitngCategory
         icon={category.icon}
         label={category.label}
         description={category.description}
         />
        )
      }
      <hr />
      <div className="
      text-lg font-light text-neutral-500 
      ">
      {description}
      </div>
      <hr />
      <div className="flex
      flex-row gap-4">
        <div className="text-lg text-neutral-600">
          Location
        </div>
        <div className="font-light  text-neutral-500 ">
          {location?.region} {location?.label}
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
