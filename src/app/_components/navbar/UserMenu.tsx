"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import userLoginModal from "@/app/hooks/userLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = userLoginModal();
  const rentModal = useRentModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value); //in value is the current value of isOpen and it returned by reb=versing its current value
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  const router=useRouter()
  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer py-3"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md"
        >
          <AiOutlineMenu size={18} />
        </div>
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-rose-400">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    router.push("/trips")
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => {
                    router.push('/favorites')
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    router.push('/reservations')
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My home"
                  onClick={() => {
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    router.push('/properties')
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="Airbnb my Home"
                  onClick={() => {
                    rentModal.onOpen();
                    toggleOpen();
                  }}
                />
                <hr />
                <MenuItem
                  label="Log-Out"
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="Sign Up"
                  onClick={() => {
                    registerModal.onOpen();
                    toggleOpen();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
