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
      <Hero />
      <Services>
        {props.servicesList.map((service) => (
          <div key={service.id}>
            <Card
              key={service.id}
              title={service.title}
              imageUrl={service.imageUrl}
              description={service.description}
              openModal={() => props.setOpenServiceModal(service)}
            />
            {props.openServiceModal === service && (
              <>
                <ModalServicesOverlay
                  key={service.id}
                  isOpen={props.openServiceModal}
                  close={() => props.setOpenServiceModal(null)}
                >
                  <ModalServices
                    key={service.id}
                    title={service.title}
                    imageUrl={service.imageUrl}
                    description={service.description}
                    price={service.price}
                    close={() => props.setOpenServiceModal(null)}
                    sqmPrice={service.sqmPrice}
                    isOpenBookingModal={props.bookingModal}
                    closeBookingModal={() => props.setBookingModal(null)}
                    service={service}
                    openBookingModal={() => props.setBookingModal(service)}
                    isServiceModalOpen={props.openServiceModal}
                    isLoggedIn={props.isLoggedIn}
                    openLogin={() => props.setOpen(true)}
                    loggedInUser={props.loggedInUser}
                    bookingInfo={props.bookingInfo}
                    setBookingInfo={(e) => props.setBookingInfo(e)}
                  />
                </ModalServicesOverlay>
                {props.loggedInUser && (
                  <BookingConfirmationOverlay
                    key={service.id}
                    isOpen={props.bookingModal}
                    close={() => props.setBookingModal(null)}
                  >
                    <BookingConfirmationModal
                      key={service.id}
                      close={() => props.setBookingModal(false)}
                      closeModalServices={() => props.setOpenServiceModal(null)}
                      title={service.title}
                      bookingInfo={props.bookingInfo}
                      loggedInUser={props.loggedInUser}
                      handleSubmit={() => props.handleSubmit()}
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
        <TestimonialCarousel testimonials={props.reviewsList} />
        <TestimonialCarousel testimonials={props.reviewsList} />
      </Reviews>

      <About />

      <Footer />

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
