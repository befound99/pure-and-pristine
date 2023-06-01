import React, { useState, useEffect } from "react";

const Footer = () => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      clearForm();
      setFormSubmitted(true);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formValues.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid.";
    }

    if (!formValues.message.trim()) {
      errors.message = "Message is required.";
    }

    return errors;
  };

  const clearForm = () => {
    setFormValues(initialState);
    setFormErrors({});
  };

  useEffect(() => {
    let timeout;

    if (formSubmitted) {
      timeout = setTimeout(() => {
        setFormSubmitted(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [formSubmitted]);

  return (
    <div className="grid lg:grid-cols-2 p-4" id="contactUs">
      <div className="contact-form">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <h1 className="text-white text-center text-2xl">CONTACT US</h1>
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className={`text-black border ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className={`text-black border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block font-semibold mb-1 text-white"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              className={`text-black border ${
                formErrors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 w-full h-32 resize-none focus:outline-none focus:border-blue-500`}
            ></textarea>
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
            )}
          </div>
          <div className="flex">
            <div className="">
              <button className="bg-transparent border-2 px-4 py-2 font-normal rounded-lg transition-all border10 text10 box-glow">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="contact-info text-white">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center my-8">
          <div className="">
            <h2 className="text-white text-lg font-semibold mb-4">Solutions</h2>
            <ul className="text-white md:flex-col">
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Commerce</li>
              <li>Insights</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-white text-lg font-semibold mb-4">Pricing</h2>
            <ul className="text-white">
              <li>Documentation</li>
              <li>Guides</li>
              <li>API Status</li>
              <li>Company</li>
              <li>About</li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-white text-lg font-semibold mb-4">Legal</h2>
            <ul className="text-white">
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Partners</li>
              <li>Opening</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 my-8 justify-items-center">
          <div className="">
            <p className="text-white">123 Cleaning Street</p>
            <p className="text-white">City, State ZIP</p>
            <p className="text-white">Phone: 123-456-7890</p>
          </div>
          <div className="">
            <h2 className="text-white text-lg font-semibold">Follow Us</h2>
            <div className="flex">
              <a href="#" className="text-white mr-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white mr-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white mr-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-full mt-8">
        <p className="text-center">
          © 2023 Pure & Pristine Inc. All rights reserved. Privacy Policy |
          Terms of Service | Sitemap Designed and Developed by GROUP 6 CAPSTONE.
        </p>
      </div>

      {formSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-black bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Thank you for your message!
            </h2>
            <p>We will get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
