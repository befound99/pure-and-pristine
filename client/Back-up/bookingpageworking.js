import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Login from "./Login";

const BookingPage = () => {
  const [serviceInfo, setServiceInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking/get");
        const bookingsData = response.data;

        if (bookingsData.length > 0) {
          // Filter the bookingsData based on the bookerID matching the logged-in user's id
          const userBookings = bookingsData.filter(
            (booking) => booking.bookerID === loggedInUser
          );

          if (userBookings.length > 0) {
            const { service, floorArea, postal, totalPrice } = userBookings[0];
            const {
              bookerFirstName,
              bookerLastName,
              houseNo,
              street,
              barangay,
              phone,
            } = userBookings[0];

            setServiceInfo({ service, floorArea, postal, totalPrice });
            setContactInfo({
              bookerFirstName,
              bookerLastName,
              houseNo,
              street,
              barangay,
              phone,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingData();
  }, [loggedInUser]);

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

  // Filter the usersList to show only the data of the logged-in user
  const filteredUserList = usersList.filter((user) => user.id === loggedInUser);

  return (
    <div className="p-4 mt-16 text-black">
      <Navbar onOpen={() => setOpen(true)} isLoggedIn={isLoggedIn} />
      <Login
        onClose={() => setOpen(false)}
        open={open}
        usersList={usersList}
        loggedIn={handleLoggedIn}
        setLoggedInUser={setLoggedInUser}
      />
      <table className="mb-4 text-black">
        <thead>
          <tr>
            <th colSpan="2" className="text-xl font-semibold mb-2">
              Service Info
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="block mb-1 text-white">Service Name:</td>
            <td>{serviceInfo.service}</td>
          </tr>
          <tr>
            <td className="block mb-1 text-white">Floor Area:</td>
            <td>{serviceInfo.floorArea}</td>
          </tr>
          <tr>
            <td className="block mb-1 text-white">Payment Method:</td>
            <td>{serviceInfo.postal}</td>
          </tr>
          <tr>
            <td className="block mb-1 text-white">Total:</td>
            <td>{serviceInfo.totalPrice}</td>
          </tr>
        </tbody>
      </table>

      {/* Contact Info */}
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="text-xl font-semibold mb-2">
              Contact Info
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="block mb-1 text-white">Name:</td>
            <td>{`${contactInfo.bookerFirstName} ${contactInfo.bookerLastName}`}</td>
          </tr>
          <tr>
            <td className="block mb-1 text-white">Address:</td>
            <td>{`${contactInfo.houseNo} ${contactInfo.street} ${contactInfo.barangay}`}</td>
          </tr>
          <tr>
            <td className="block mb-1 text-white">Phone:</td>
            <td>{contactInfo.phone}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="text-xl font-semibold mb-2">
              Users
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUserList.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              {/* Add additional fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingPage;
