import React from "react";
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
import BookingConfirmationOverlay from "./BookingConfirmationOverlay";
import BookingConfirmationModal from "./BookingConfirmationModal";
import WeServe from "./WeServe";

const Home = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={() => props.setOpen(false)}>
        <Login
          isOpen={props.isOpen}
          onClose={() => props.setOpen(false)}
          openSignUp={() => props.setOpenSignUp(true)}
          usersList={props.usersList}
          loggedIn={() => props.setIsLoggedIn(true)}
          loginCredentials={props.loginCredentials}
          setLoginCredentials={(e) => props.setLoginCredentials(e)}
          setLoggedInUser={(matchedUser) => props.setLoggedInUser(matchedUser)}
          inputHandler={(e) => props.inputHandler(e)}
          setIsLoggedIn={(e) => props.setIsLoggedIn(e)}
          loggedInUser={props.loggedInUser}
          handleLogin={() => props.handleLogin()}
        />
      </Modal>

      <SignupOverlay
        closeSignUp={() => props.setOpenSignUp(false)}
        isOpen={props.openSignUp}
      >
        <Signup
          isOpen={props.openSignUp}
          close={() => props.setOpenSignUp(false)}
          openLogin={() => props.setOpen(true)}
        />
      </SignupOverlay>
    </div>
  );
};

export default Home;
