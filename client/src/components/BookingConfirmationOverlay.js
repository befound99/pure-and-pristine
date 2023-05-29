import React from "react";

const BookingConfirmationOverlay = ({ close, children, isOpen }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
      className={` fixed inset-0 flex justify-center w-screen h-screen items-center transition-colors z-30 
      ${isOpen ? "visible backdrop-blur-sm bg-black/40" : "invisible"}`}
    >
      {children}
    </div>
  );
};

export default BookingConfirmationOverlay;
