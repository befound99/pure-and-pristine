import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const BookingConfirmationModal = ({
  title,
  close,
  bookingInfo,
  loggedInUser,
  handleSubmit,
  closeModalServices,
}) => {
  console.log(loggedInUser);
  return (
    <div
      className="relative bg60 rounded-lg py-8 md:px-8 grid grid-cols-2 gap-8 "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <XMarkIcon
        className="absolute top-1 right-1 h-8 w-8 hover:cursor-pointer"
        onClick={close}
      />
      <h1 className="text-3xl col-span-2 text-center font-bold">
        Your booking
      </h1>
      <div className=" flex flex-col col-span-2 md:col-span-1 bg30 p-4 md:rounded-lg gap-8">
        <h1 className="text-center text-xl font-bold">Service Info</h1>
        <div className="grid grid-cols-3 gap-4">
          <span className="col-span-1 text-end font-semibold">
            Service name:
          </span>
          <span className="col-span-2">{title}</span>
          <span className="col-span-1 text-end font-semibold">Floor area:</span>
          <span className="col-span-2">{bookingInfo.floorArea}</span>
          <span className="col-span-1 text-end font-semibold">Total:</span>
          <span className="col-span-2">₱ {bookingInfo.totalPrice}.00</span>
        </div>
      </div>
      <div className=" flex flex-col col-span-2 md:col-span-1 bg30 p-4 md:rounded-lg gap-8">
        <h1 className="text-center text-xl font-bold">Contact Info</h1>
        <div className="grid grid-cols-3 gap-4">
          <span className="col-span-1 text-end font-semibold">Name:</span>
          <span className="col-span-2">
            {/* {loggedInUser.firstName} {loggedInUser.lastName} */}
          </span>
          <span className="col-span-1 text-end font-semibold">Address:</span>
          <span className="col-span-2">
            {bookingInfo.houseNo}, {bookingInfo.street}, {bookingInfo.barangay},{" "}
            {bookingInfo.city} {bookingInfo.postal}
          </span>
          <span className="col-span-1 text-end font-semibold">Phone:</span>
          <span className="col-span-2">{bookingInfo.phone}</span>
        </div>
      </div>
      <button
        className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded transition-all border10 text10 box-glow col-span-2 w-fit mx-auto"
        onClick={() => {
          alert("Booked successfuly");
          close();
          handleSubmit();
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default BookingConfirmationModal;
