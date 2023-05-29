import React, { useState } from "react";
import Axios from "axios";

const Signup = ({ isOpen, close, openLogin }) => {
  // Inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be 8-20 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      console.log("ERRERS IN DATA");
      return;
    }
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    Axios.post("http://localhost:3001/user/signup", user)
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
        <button className="bg-transparent border-2 px-[10px] py-[5px]  font-normal rounded-lg transition-all border-facebook text-[#2e89ff] box-glow-facebook w-full">
          Sign Up with Facebook <i className="fa-brands fa-facebook"></i>
        </button>
        <button className="bg-transparent border-2 px-[10px] py-[5px]  font-normal rounded-lg transition-all border-google text-[#34a853] box-glow-google w-full">
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1"
          />
          <input
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1"
          />
        </div>
        <div className="flex">
          <input
            placeholder="Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="flex">
          <input
            type="password"
            placeholder="Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1"
          />
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm w-[500px]">{errors.password}</p>
        )}
        <div className="flex">
          <input
            type="password"
            placeholder="Confirm Password "
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
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
