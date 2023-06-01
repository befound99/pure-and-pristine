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
import Hero from "./components/Hero";
import Services from "./components/Services";
import Card from "./components/Card";
import ModalServices from "./components/ModalServices";
import ModalServicesOverlay from "./components/ModalServicesOverlay";
import BookingConfirmationModal from "./components/BookingConfirmationModal";
import BookingConfirmationOverlay from "./components/BookingConfirmationOverlay";
import WeServe from "./components/WeServe";
import Reviews from "./components/Reviews";
import TestimonialCarousel from "./components/TestimonialCarousel";
import About from "./components/About";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Login from "./components/Login";
import SignupOverlay from "./components/SignupOverlay";
import Signup from "./components/Signup";
import HiringCard from "./components/HiringCard";
import Hiring from "./components/Hiring";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
  });
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
  const [bookingList, setBookingList] = useState([]);
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

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setDialog(true);
    setDialogContent((prevValues) => ({
      ...prevValues,
      header: "Logout",
      message: "Log out success",
      success: true,
    }));
  };

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
      return;
    }

    axios
      .post("http://localhost:3001/booking/create", bookingInfo)
      .then((response) => {
        console.log(response.data);
        setDialog(true);
        setDialogContent((prevValues) => ({
          ...prevValues,
          header: "Booking",
          message: "Booked successfully",
          success: true,
        }));
      })
      .catch((error) => {
        console.log(error);
        setDialog(true);
        setDialogContent((prevValues) => ({
          ...prevValues,
          header: "Booking",
          message: "Booking error",
          success: false,
        }));
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
  }, []);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking/get");
        setBookingList(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    // Fetch booking data immediately
    fetchBookingData();

    // Fetch booking data every 5 minutes (adjust the interval as needed)
    const interval = setInterval(fetchBookingData, 5 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const userID = parseInt(localStorage.getItem("loggedInUser"));

    if (userID) {
      const user = usersList.find((user) => user.id === userID);
      setLoggedInUser(user);
    }
  });

  const closeModals = (e) => {
    if (e.code === "Escape") {
      setOpenSignUp(false);
      setOpen(false);
      setDialog(false);
      if (bookingModal) {
        setBookingModal(null);
        return;
      } else {
        setOpenServiceModal(null);
      }
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

  const handleLogin = async () => {
    const { email, password } = loginCredentials;

    if (!email.trim() || !password.trim()) {
      setDialog(true);
      setDialogContent((prevValues) => ({
        ...prevValues,
        header: "Booking",
        message: "Please enter your email and password.",
        success: false,
      }));
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
        checkTokenValidity(token); // Check token validity and update isLoggedIn immediately

        // Add user ID to local storage
        const user = usersList.find(
          (user) => user.email === email && user.password === password
        );
        localStorage.setItem("loggedInUser", user.id);
        setOpen(false);

        setDialog(true);
        setDialogContent((prevValues) => ({
          ...prevValues,
          header: "Login",
          message: "Log in success",
          success: true,
        }));
        setLoginCredentials((prevValues) => ({
          ...prevValues,
          email: "",
          password: "",
        }));
      } else {
        console.log("Response error:", response.status);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setDialog(true);
      setDialogContent((prevValues) => ({
        ...prevValues,
        header: "Login",
        message: "Email or password is incorrect",
        success: false,
      }));
    }
  };

  const checkTokenValidity = (token) => {
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
        console.log("Checked token validity");
      })
      .catch((error) => {
        console.log("Error fetching user login:", error);
        // Handle error cases or display error messages
      });
  };

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");

    if (token) {
      checkTokenValidity(token);
    }
  }, [usersList]);
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
            <>
              <Hero />
              <Services>
                {servicesList.map((service) => (
                  <div key={service.id}>
                    <Card
                      key={service.id}
                      title={service.title}
                      imageUrl={service.imageUrl}
                      description={service.description}
                      openModal={() => setOpenServiceModal(service)}
                    />
                  </div>
                ))}
              </Services>
              <Reviews>
                <TestimonialCarousel testimonials={reviewsList} />
                <TestimonialCarousel testimonials={reviewsList} />
              </Reviews>
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
                handleLogin={() => handleLogin()}
              />

              <WeServe />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <Services>
              {servicesList.map((service) => (
                <div key={service.id}>
                  <Card
                    key={service.id}
                    title={service.title}
                    imageUrl={service.imageUrl}
                    description={service.description}
                    openModal={() => setOpenServiceModal(service)}
                  />
                </div>
              ))}
            </Services>
          }
        />
        <Route path="/about" element={<About />} />
        {isLoggedIn && (
          <Route
            path="/booking"
            element={
              <BookingPage
                loggedInUser={loggedInUser}
                setIsLoggedIn={(e) => setIsLoggedIn(e)}
                usersList={usersList}
                bookingList={bookingList}
              />
            }
          />
        )}
        <Route path="/hiring" element={<Hiring />} />
      </Routes>
      <Footer />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Login
          isOpen={open}
          onClose={() => setOpen(false)}
          openSignUp={() => setOpenSignUp(true)}
          usersList={usersList}
          loggedIn={() => setIsLoggedIn(true)}
          loginCredentials={loginCredentials}
          setLoginCredentials={(e) => setLoginCredentials(e)}
          setLoggedInUser={(matchedUser) => setLoggedInUser(matchedUser)}
          inputHandler={(e) => inputHandler(e)}
          setIsLoggedIn={(e) => setIsLoggedIn(e)}
          loggedInUser={loggedInUser}
          handleLogin={() => handleLogin()}
        />
      </Modal>
      {servicesList.map((service) => (
        <>
          {openServiceModal === service && (
            <>
              <ModalServicesOverlay
                key={service.id}
                isOpen={openServiceModal}
                close={() => setOpenServiceModal(null)}
              >
                <ModalServices
                  key={service.id}
                  title={service.title}
                  imageUrl={service.imageUrl}
                  description={service.description}
                  price={service.price}
                  close={() => setOpenServiceModal(null)}
                  sqmPrice={service.sqmPrice}
                  isOpenBookingModal={bookingModal}
                  closeBookingModal={() => setBookingModal(null)}
                  service={service}
                  openBookingModal={() => setBookingModal(service)}
                  isServiceModalOpen={openServiceModal}
                  isLoggedIn={isLoggedIn}
                  openLogin={() => setOpen(true)}
                  loggedInUser={loggedInUser}
                  bookingInfo={bookingInfo}
                  setBookingInfo={(e) => setBookingInfo(e)}
                  setDialog={(e) => setDialog(e)}
                  setDialogContent={(e) => setDialogContent(e)}
                />
              </ModalServicesOverlay>
              {loggedInUser && (
                <BookingConfirmationOverlay
                  key={service.id}
                  isOpen={bookingModal}
                  close={() => setBookingModal(null)}
                >
                  <BookingConfirmationModal
                    key={service.id}
                    close={() => setBookingModal(false)}
                    closeModalServices={() => setOpenServiceModal(null)}
                    title={service.title}
                    bookingInfo={bookingInfo}
                    loggedInUser={loggedInUser}
                    handleSubmit={() => handleSubmit()}
                  />
                </BookingConfirmationOverlay>
              )}
            </>
          )}
        </>
      ))}

      <SignupOverlay
        closeSignUp={() => setOpenSignUp(false)}
        isOpen={openSignUp}
      >
        <Signup
          isOpen={openSignUp}
          close={() => setOpenSignUp(false)}
          openLogin={() => setOpen(true)}
          setDialog={(e) => setDialog(e)}
          setDialogContent={(e) => setDialogContent(e)}
        />
      </SignupOverlay>
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
