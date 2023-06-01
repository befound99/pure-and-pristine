import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login({
  onClose,
  isOpen,
  openSignUp,
  setLoggedInUser,
  setIsLoggedIn,
  usersList,
  loggedInUser,
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
    const { email, password } = loginCredentials;

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.status === 200) {
        const { token } = response.data;
        // Save the token in local storage or session storage
        localStorage.setItem("token", token);
        checkTokenValidity(token); // Check token validity and update isLoggedIn immediately

        // Add user ID to local storage
        const user = usersList.find(
          (user) => user.email === email && user.password === password
        );
        localStorage.setItem("loggedInUser", user.id);
        onClose();
      } else {
        console.log("Response error:", response.status);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const checkTokenValidity = (token) => {
    // Set the login state based on the token validity
    setIsLoggedIn(true);
    // Fetch the logged-in user data or any other necessary data from the server
    axios
      .get("http://localhost:3001/user/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Checked token validity");
      })
      .catch((error) => {
        console.log("Error fetching user login:", error);
        // Handle error cases or display error messages
      });
  };

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");

    if (token) {
      checkTokenValidity(token);
    }
  }, []);

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
            onChange={inputHandler}
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
            onChange={inputHandler}
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
