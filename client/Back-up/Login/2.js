// >no persistent log in but has userList acces
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001";

export default function Login({
  onClose,
  isOpen,
  openSignUp,
  usersList,
  loggedIn,
  setLoggedInUser,
  loginCredentials,
  setLoginCredentials,
}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    }
  }, []);

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

    const user = usersList.find((user) => user.email === email);

    if (user && user.password === password) {
      authenticateUser(email);
    } else {
      alert("Invalid credentials");
    }

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem("token", token);
        authenticateUser(email);
      } else {
        console.log("Response error:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user/validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        const { email } = data;
        authenticateUser(email);
      } else {
        console.log("Token validation failed:", response.status);
        // Handle invalid token case, e.g., clear token from localStorage and show login form
      }
    } catch (error) {
      console.error("Error during token validation:", error);
      alert("An error occurred during token validation. Please try again.");
    }
  };

  const authenticateUser = (email) => {
    const user = usersList.find((user) => user.email === email);

    if (user) {
      console.log("User authenticated:", email);
      setLoggedInUser(user);
      loggedIn();
      onClose();
    }
  };

  return (
    <form
      className={`h-fit bg60 rounded-lg min-w-[320px] max-w-xl sm:w-[50vmin] p-8 transition-all ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      action="#"
      method="#"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative px-[1rem] h-20 flex justify-center items-center">
        <h2 className="text-1xl md:text-2xl font-semibold">
          Sign in to your account
        </h2>
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
        <div className="flex flex-col px-[1rem]">
          <label htmlFor="email" className="text-base">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2"
            value={loginCredentials.email}
            onInput={inputHandler}
          />
        </div>
        <div className="flex flex-col px-[1rem]">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-base">
              Password:
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
