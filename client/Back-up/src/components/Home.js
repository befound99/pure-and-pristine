import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "axios";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Login from "./Login";
import Hero from "./Hero";
import Reviews from "./Reviews";
import TestimonialCarousel from "./TestimonialCarousel";
import Services from "./Services";
import ModalServices from "./ModalServices";
import Card from "./Card";
import About from "./About";
import Footer from "./Footer";
import SignupOverlay from "./SignupOverlay";
import Modal from "./Modal";
import ModalServicesOverlay from "./ModalServicesOverlay";
import tomEllis from "./images/tomEllis.png";
import chloeDecker from "./images/chloeDecker.png";
import BookingConfirmationOverlay from "./BookingConfirmationOverlay";
import BookingConfirmationModal from "./BookingConfirmationModal";
import WeServe from "./WeServe";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(null);
  const [bookingModal, setBookingModal] = useState(true);
  const [servicesList, setServicesList] = useState([]);
  const [adminLogin, setAdminLogin] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const handleLogout = () => {
    // Clear the logged-in user information from local storage
    localStorage.removeItem("loggedInUser");

    // Reset the logged-in user state
    setLoggedInUser(null);

    // Update the login status
    setIsLoggedIn(false);

    alert("Logged out successfuly");
    // Redirect the user to the home page
    // history.push("/");
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
      alert("Please fill in all the fields.");
      return;
    }

    Axios.post("http://localhost:3001/booking/create", bookingInfo)
      .then((response) => {
        console.log(response.data);
        // Additional logic or actions after successful form submission
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

  useEffect(() => {
    window.addEventListener("keydown", closeModals);
    return () => window.removeEventListener("keydown", closeModals);
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/services/get")
      .then((response) => {
        setServicesList(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases or display error messages
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/users/get").then((response) => {
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
  });

  return (
    <div>
      <Navbar
        onOpen={() => setOpen(true)}
        isLoggedIn={isLoggedIn}
        logout={handleLogout}
        loggedInUser={loggedInUser}
      />
      <Hero />

      <Services>
        {servicesList.map((service) => (
          <div key={service.id}>
            <Card
              title={service.title}
              imageUrl={service.imageUrl}
              description={service.description}
              openModal={() => setOpenServiceModal(service)}
            />
            {openServiceModal === service && (
              <>
                <ModalServicesOverlay
                  isOpen={openServiceModal}
                  close={() => setOpenServiceModal(null)}
                >
                  <ModalServices
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
                    setBoookingInfo={(e) => setBookingInfo(e)}
                  />
                </ModalServicesOverlay>
                {loggedInUser && (
                  <BookingConfirmationOverlay
                    isOpen={bookingModal}
                    close={() => setBookingModal(false)}
                  >
                    <BookingConfirmationModal
                      close={() => setBookingModal(false)}
                      title={service.title}
                      bookingInfo={bookingInfo}
                      loggedInUser={loggedInUser}
                      handleSubmit={() => handleSubmit()}
                    />
                  </BookingConfirmationOverlay>
                )}
              </>
            )}
          </div>
        ))}
      </Services>

      <WeServe />

      <Reviews>
        <TestimonialCarousel testimonials={reviewsList} />
        <TestimonialCarousel testimonials={reviewsList} />
      </Reviews>

      <About />

      <Footer />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Login
          open={open}
          onClose={() => setOpen(false)}
          openSignUp={() => setOpenSignUp(true)}
          usersList={usersList}
          loggedIn={() => setIsLoggedIn(true)}
          loginCredentials={loginCredentials}
          setLoggedInUser={(matchedUser) => setLoggedInUser(matchedUser)}
        />
      </Modal>

      <SignupOverlay
        closeSignUp={() => setOpenSignUp(false)}
        isOpen={openSignUp}
      >
        <Signup
          isOpen={openSignUp}
          close={() => setOpenSignUp(false)}
          openLogin={() => setOpen(true)}
        />
      </SignupOverlay>
    </div>
  );
};

export default Home;
