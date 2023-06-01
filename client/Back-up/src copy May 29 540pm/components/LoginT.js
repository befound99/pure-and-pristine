import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Login({
  onClose,
  isOpen,
  openSignUp,
  usersList,
  loggedIn,
  setLoggedInUser,
}) {
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
    // Check if loginCredentials are empty
    if (
      loginCredentials.email.trim() === "" ||
      loginCredentials.password.trim() === ""
    ) {
      alert("Please enter your email and password.");
      return;
    }

    // Perform user authentication here based on your usersList or API call
    const user = usersList.find(
      (user) => user.email === loginCredentials.email
    );

    if (user && user.password === loginCredentials.password) {
      // User is authenticated
      console.log("User authenticated:", user.email);
      setLoggedInUser(loginCredentials.email);
      console.log("Logged in user set:", loginCredentials.email);
      loggedIn();
      onClose();
    } else {
      alert("Invalid credentials");
    }

    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      console.log("After fetch"); // Log after fetch
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Perform login logic here
        setLoggedInUser(loginCredentials.email);
        loggedIn();
        onClose();
        console.log(setLoggedInUser);
      } else {
        console.log("Response error:", response.status); // Add this console log
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Perform logout logic here
    // ...
  };
  console.log("help");
  return (
    <form
      className={`h-fit bg60 rounded-lg min-w-[320px] max-w-xl sm:w-[50vmin] p-8 transition-all ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      action="#"
      method="#"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Form header */}
      <div className="relative px-[1rem] h-20 flex justify-center items-center">
        <h2 className="text-1xl md:text-2xl font-semibold">
          Sign in to your account
        </h2>
        {/* Close button */}
        <button
          className="absolute top-1 right-1"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col gap-[3rem]">
        {/* Email input */}
        <div className="flex flex-col px-[1rem]">
          <label htmlFor="email" className="text-base">
            Email:{" "}
          </label>
          <input
            type="email"
            name="email"
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2"
            value={loginCredentials.email}
            onInput={inputHandler}
          />
        </div>
        {/* Password input */}
        <div className="flex flex-col px-[1rem]">
          <div className="flex justify-between ">
            <label htmlFor="password" className="text-base">
              Password:{" "}
            </label>
            <a href="#" className="text10 hover:opacity-70 cursor-pointer">
              Forgot password?
            </a>
          </div>

          <input
            type="password"
            name="password"
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2"
            value={loginCredentials.password}
            onInput={inputHandler}
          />
        </div>
        {/* Login button */}
        <div className="px-[1rem]">
          <button
            className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded-lg transition-all border10 text10 box-glow w-full"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
        {/* Sign up link */}
        <div className="px-[1rem] flex justify-center gap-2 items-center">
          <span className="text-xs md:text-base">Don't have an account?</span>
          <a
            className="text10 hover:opacity-70 cursor-pointer text-xs md:text-base"
            onClick={() => {
              openSignUp();
              onClose();
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
}
