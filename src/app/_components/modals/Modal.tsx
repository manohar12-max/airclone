"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  footer,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  const handelClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  const handelSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  } // inset-0 means top-0 right-0 left-0 right-0
  return (
    <div style={{zIndex:"200"}} className="flex  justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none bg-neutral-800/70 ">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* contetnt */}
        <div
          className={`translate
        duration-300 
         h-full
         ${showModal ? `translate-y-0` : `translate-y-full`}
         ${showModal ? `opacity-100` : `opacity-0`}
         `}
        >
          <div
            className="
         translate
         h-full 
         lg:h-auto
         md:h-auto
         border-0
         rounded-lg
         shadow-lg
         relative flex flex-col
         w-full
         bg-white
         outline-none
         focus:outline-none

         "
          >
            {/* header */}
            <div
              className="
            flex items-center
            px-6 rounded-t justify-center
            relative
            border-b-[1px]
            "
            >
              <button
                onClick={handelClose}
                className="
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-9
                "
              >
                <IoMdClose size={18} />
              </button>
              <div
                className="
                text-lg font-semibold"
              >
                {title}
              </div>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">{body}
            </div>
            {/* footer */}
            <div
              className="
            flex flex-col gap-2 p-6"
            >
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}

                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handelSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
