import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Login({
  onClose,
  open,
  openSignUp,
  usersList,
  loggedIn,
  setLoggedInUser,
}) {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      loggedIn();
    }
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  };

  const handleLogin = () => {
    // Check if loginCredentials are empty
    if (
      loginCredentials.email.trim() === "" ||
      loginCredentials.password.trim() === ""
    ) {
      alert("Please enter your email and password.");
      return;
    }

    // Check if loginCredentials match one of the objects in usersList
    const matchedUser = usersList.find(
      (user) =>
        user.email === loginCredentials.email &&
        user.password === loginCredentials.password
    );

    if (matchedUser) {
      // User credentials match, perform the login logic here
      alert(`User logged in: ${loginCredentials.email}`);
      setLoggedInUser(matchedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser)); // Store the logged-in user information
      loggedIn();
      onClose();
    } else {
      // User credentials do not match
      alert("Invalid credentials");
    }
  };

  return (
    <form
      className={`h-fit bg60 rounded-lg min-w-[320px] max-w-xl sm:w-[50vmin] p-8 transition-all ${
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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
