import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Login from "./Login";

const BookingPage = () => {
  // State variables
  const [bookingData, setBookingData] = useState([]); // Store the booking data in an array
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  // Event handler for logging in
  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  };

  // Fetch booking data based on the logged-in user
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking/get");
        const bookingsData = response.data;

        if (bookingsData.length > 0) {
          const userBookings = bookingsData.filter(
            (booking) => booking.bookerID === loggedInUser.id
          );

          if (userBookings.length > 0) {
            setBookingData(userBookings);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingData();
  }, [loggedInUser]);

  // Fetch the list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/get");
        const userList = response.data;
        setUsersList(userList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Filter the list of users to show only the data of the logged-in user
  const filteredUserList = usersList.filter(
    (user) => user.id === loggedInUser.id
  );

  return (
    <div>
      <div>
        {/* Navbar and Login components */}
        <Navbar onOpen={() => setOpen(true)} isLoggedIn={isLoggedIn} />
        <Login loggedIn={handleLoggedIn} setLoggedInUser={setLoggedInUser} />
      </div>
      {/* Users */}
      <div className="grid md:grid-row-2 gap-4 text-white">
        <div className="card-container bg30 p-4  rounded">
          <h2 className="text-xl font-semibold mb-2">Booking Information</h2>
          {filteredUserList.map((user) => (
            <div key={user.id}>
              {/* <p>email add: {user.email}</p> */}
              <p>
                Name:{" "}
                {`${user.firstName} 
                ${user.lastName}`}
              </p>
              <p></p>
            </div>
          ))}
        </div>

        {/* Display each booking */}

        {bookingData.map((booking) => (
          <div className="px-16 py-" key={booking.id}>
            {/* Booking Info */}
            <div className="card-container bg30 p-4 ">
              <h2 className=" text-xl  font-semibold mb-2">Booking Details</h2>

              <p>
                Name: {`${booking.bookerFirstName} ${booking.bookerLastName}`}
              </p>

              <p>
                Address:{" "}
                {`${booking.houseNo} ${booking.street} ${booking.barangay}`}
              </p>

              <p>Phone: {booking.phone}</p>

              <p className="text-white">Service Name: {booking.service}</p>

              <p className="text-white">Floor Area: {booking.floorArea}</p>

              <p className="text-white">Payment Method: {booking.postal}</p>

              <p className="text-white">Total: {booking.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
