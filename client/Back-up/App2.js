import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingPage from "./components/BookingPage";
import Home from "./components/Home";
import tomEllis from "./components/images/tomEllis.png";
import chloeDecker from "./components/images/chloeDecker.png";
import Navbar from "./components/Navbar";
import DialogOverlay from "./components/DialogOverlay";
import Dialog from "./components/Dialog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    header: "",
    message: "",
    success: true,
  });

  const [bookingData, setBookingData] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [adminLogin, setAdminLogin] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  };

  const handleLogin = async () => {
    const { email, password } = loginCredentials;

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.status === 200) {
        const { token } = response.data;
        // Save the token in local storage or session storage
        localStorage.setItem("token", token);
        setLoggedInUser(email);
      } else {
        console.log("Response error:", response.status);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on the server-side if necessary
      // Set the login state based on the token validity
      setIsLoggedIn(true);
      // Fetch the logged-in user data or any other necessary data from the server
      axios
        .get("http://localhost:3001/user/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoggedInUser(response.data.user);
        })
        .catch((error) => {
          console.log("Error fetching user login:", error);
          // Handle error cases or display error messages
        });
    }
  }, []);

  //service modal input state
  const [bookingInfo, setBookingInfo] = useState({
    totalPrice: 0,
    service: "",
    floorArea: "1-40 sqm",
    houseNo: "",
    street: "",
    barangay: "",
    postal: "",
    city: "Manila",
    phone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerID: 0,
  });

  const handleSubmit = () => {
    if (
      bookingInfo.houseNo === "" ||
      bookingInfo.street === "" ||
      bookingInfo.barangay === "" ||
      bookingInfo.postal === "" ||
      bookingInfo.city === "" ||
      bookingInfo.phone === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    axios
      .post("http://localhost:3001/booking/create", bookingInfo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases or display error messages
      });
  };

  useEffect(() => {
    if (loggedInUser) {
      setBookingInfo((prevBookingInfo) => ({
        ...prevBookingInfo,
        bookerFirstName: loggedInUser.firstName,
        bookerLastName: loggedInUser.lastName,
        bookerID: loggedInUser.id,
      }));
    } else {
      setBookingInfo((prevBookingInfo) => ({
        ...prevBookingInfo,
        bookerFirstName: "",
        bookerLastName: "",
        bookerID: 0,
      }));
    }
  }, [loggedInUser]);

  // close modal when escape is pressed
  useEffect(() => {
    window.addEventListener("keydown", closeModals);
    return () => window.removeEventListener("keydown", closeModals);
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/services/get")
      .then((response) => {
        setServicesList(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Error response:", error.response.data);
          console.log("Error status:", error.response.status);
          // Handle specific error cases or display error messages
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
          // Handle specific error cases or display error messages
        } else {
          // Something else happened while setting up the request
          console.log("Error message:", error.message);
          // Handle specific error cases or display error messages
        }
      });
  }, []);

  // users list
  useEffect(() => {
    axios.get("http://localhost:3001/users/get").then((response) => {
      setUsersList(response.data);
    });
  }, [open]);

  useEffect(() => {
    setReviewsList([
      {
        id: 1,
        name: "Tom Ellis",
        text: "The cleaning services provided by Pure & Pristine exceeded my expectations. They were prompt, thorough, and left my home sparkling clean. I highly recommend their services!",
        image: tomEllis,
      },
      {
        id: 2,
        name: "Chloe Decker",
        text: "I am extremely satisfied with the cleaning services from Pure & Pristine. The team was professional, efficient, and paid attention to every detail. It's a pleasure to come home to a fresh and spotless environment. I would definitely hire them again!",
        image: chloeDecker,
      },
    ]);
  }, []);

  const closeModals = (e) => {
    if (e.code === "Escape") {
      setOpenSignUp(false);
      setOpen(false);
      if (bookingModal) {
        setBookingModal(null);
        return;
      }
      setOpenServiceModal(null);
      setDialog(false);
    }
  };

  const openAdminLogin = (e) => {
    if (e.code === "Enter" && e.shiftKey) {
      setAdminLogin((prevAdminLogin) => !prevAdminLogin);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", openAdminLogin);
    return () => window.removeEventListener("keydown", openAdminLogin);
  }, [isLoggedIn, bookingModal]);

  return (
    <Router>
      <Navbar
        onOpen={() => setOpen(true)}
        isLoggedIn={isLoggedIn}
        logout={() => handleLogout()}
        loggedInUser={loggedInUser}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              servicesList={servicesList}
              setOpenServiceModal={(e) => setOpenServiceModal(e)}
              bookingModal={bookingModal}
              setBookingModal={(e) => setBookingModal(e)}
              openServiceModal={openServiceModal}
              isLoggedIn={isLoggedIn}
              setOpen={(e) => setOpen(e)}
              loggedInUser={loggedInUser}
              bookingInfo={bookingInfo}
              setBookingInfo={(e) => setBookingInfo(e)}
              handleSubmit={() => handleSubmit()}
              reviewsList={reviewsList}
              isOpen={open}
              setOpenSignUp={(e) => setOpenSignUp(e)}
              usersList={usersList}
              setIsLoggedIn={(e) => setIsLoggedIn(e)}
              loginCredentials={loginCredentials}
              setLoggedInUser={(matchedUser) => setLoggedInUser(matchedUser)}
              openSignUp={openSignUp}
              setLoginCredentials={(e) => setLoginCredentials(e)}
              inputHandler={(e) => inputHandler(e)}
              handleLogin={() => handleLogin()}
            />
          }
        />
        {loggedInUser && (
          <Route
            path="/booking"
            element={
              <BookingPage
                loggedInUser={loggedInUser}
                setIsLoggedIn={(e) => setIsLoggedIn(e)}
                usersList={usersList}
                bookingData={bookingData}
              />
            }
          />
        )}
      </Routes>
      <DialogOverlay close={() => setDialog(false)} isOpen={dialog}>
        <Dialog
          isOpen={dialog}
          close={() => setDialog(false)}
          dialogContent={dialogContent}
        />
      </DialogOverlay>
    </Router>
  );
}

export default App;
