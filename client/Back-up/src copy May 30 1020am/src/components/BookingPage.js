import React from "react";
import { useEffect, useState } from "react";

const BookingPage = (props) => {
  const { usersList, loggedInUser, bookingList } = props;
  const [filteredBookingList, setFilteredBookingList] = useState([]);

  useEffect(() => {
    // Filter the list of bookings to show only the data of the logged-in user
    const filteredList = bookingList.filter(
      (booking) => booking.bookerID === loggedInUser?.id
    );
    setFilteredBookingList(filteredList);
  }, [bookingList, loggedInUser]);

  return (
    <div>
      {/* Users */}
      <div className="grid md:grid-row-2 gap-4 text-white mt-[80px] min-h-[calc(100vh-80px)]">
        <div className="card-container bg30 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Booking Information</h2>
          <div key={loggedInUser ? loggedInUser.id : 0}>
            <p>
              Name:{" "}
              {loggedInUser
                ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
                : ""}
            </p>
          </div>
        </div>

        {/* Display each booking */}
        {filteredBookingList.map((booking) => (
          <div className="px-16 py-4" key={booking.id}>
            {/* Booking Info */}
            <div className="card-container bg30 p-4">
              <h2 className="text-xl font-semibold mb-2">Booking Details</h2>

              <p>
                Name: {`${booking.bookerFirstName} ${booking.bookerLastName}`}
              </p>

              <p>
                Address:{" "}
                {`${booking.houseNo} ${booking.street} ${booking.barangay}`}
              </p>

              <p>Phone: {booking.phone}</p>

              <p>Service Name: {booking.service}</p>

              <p>Floor Area: {booking.floorArea}</p>

              <p>Payment Method: {booking.postal}</p>

              <p>Total: {booking.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
