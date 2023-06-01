import React, { useState } from "react";
import axios from "axios";

const Signup = ({ isOpen, close, openLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (fieldName, regex, errorMessage) => {
    if (!regex.test(formData[fieldName])) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField("email", emailRegex, "Please enter a valid email address.");
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    validateField(
      "password",
      passwordRegex,
      "Password must be 8-20 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    );
  };

  const validateConfirmPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      console.log("ERRORS IN DATA");
      return;
    }

    const { firstName, lastName, email, password } = formData;

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    axios
      .post("http://localhost:3001/user/signup", user)
      .then((response) => {
        alert("User signed up:", response.data);
      })
      .catch((error) => {
        alert("Error signing up:", error);
      });

    close();
  };

  return (
    <form
      className={`relative flex flex-col bg60 p-8 rounded-lg transition-all ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-1 right-1"
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative px-[1rem] h-20 flex flex-col justify-center items-center">
        <span className="text-1xl md:text-2xl font-semibold">
          Create an account
        </span>
        <div className="flex justify-center gap-2 w-full">
          <span>Already have an account?</span>
          <a
            className="text10 hover:opacity-70 cursor-pointer"
            onClick={() => {
              close();
              openLogin();
            }}
          >
            Login
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <button
          onClick={(e) => e.preventDefault()}
          className="bg-transparent border-2 px-[10px] py-[5px]  font-normal rounded-lg transition-all border-facebook text-[#2e89ff] box-glow-facebook w-full"
        >
          Sign Up with Facebook <i className="fa-brands fa-facebook"></i>
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="bg-transparent border-2 px-[10px] py-[5px]  font-normal rounded-lg transition-all border-google text-[#34a853] box-glow-google w-full"
        >
          Sign Up with Google <i className="fa-brands fa-google"></i>
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-1 w-full">
          <div className="w-4/5 h-[2px] bg-white/5"></div>
          <span>or</span>
          <div className="w-4/5 h-[2px] bg-white/5"></div>
        </div>
        <div className="grid md:grid-cols-2">
          <input
            placeholder="Firstname"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                firstName: e.target.value,
              }))
            }
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1"
          />
          <input
            placeholder="Lastname"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                lastName: e.target.value,
              }))
            }
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1"
          />
        </div>
        <div className="flex">
          <input
            placeholder="Email "
            value={formData.email}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
            onBlur={validateEmail}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="flex">
          <input
            type="password"
            placeholder="Password "
            value={formData.password}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
            onBlur={validatePassword}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm w-[500px]">{errors.password}</p>
        )}
        <div className="flex">
          <input
            type="password"
            placeholder="Confirm Password "
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                confirmPassword: e.target.value,
              }))
            }
            onBlur={validateConfirmPassword}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
        <button
          className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded-lg transition-all border10 text10 box-glow w-full"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
