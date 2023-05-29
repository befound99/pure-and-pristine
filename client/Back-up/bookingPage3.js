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
        const [serviceData, contactData] = bookingsData;

        setServiceInfo(serviceData);
        setContactInfo(contactData);
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
      {/* Rest of the code */}

      {/* Render the list of users */}
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
