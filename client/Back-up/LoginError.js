import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";

export default function Login({
  onClose,
  isOpen,
  openSignUp,
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
    console.log(loginCredentials); // Check the value of loginCredentials object
    const { email, password } = loginCredentials;
    console.log(email, password); // Check the values of email and password

    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });

      console.log(response); // Check the entire response object

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(token, user); // Check the values of token and user

        // Rest of your code...
      } else {
        console.log("Response error:", response.status);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <form
      className={`h-fit bg60 rounded-lg min-w-[320px] max-w-xl sm:w-[50vmin] p-8 transition-all ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
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
