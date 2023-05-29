// setting FirstName

useEffect(() => {
  // Check if the user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // Set the logged-in user
    const token = localStorage.getItem("token");
    const user = usersList.find((user) => user.token === token);

    if (user && user.firstName) {
      setLoggedInUser(user.firstName);
      loggedIn();
    }
  }
}, []);

const handleLogin = async () => {
  // Check if loginCredentials are empty
  if (
    loginCredentials.email.trim() === "" ||
    loginCredentials.password.trim() === ""
  ) {
    alert("Please enter your email and password.");
    return;
  }

  // Find the user based on email
  const user = usersList.find((user) => user.email === loginCredentials.email);

  if (user) {
    // Perform password validation
    if (user.password === loginCredentials.password) {
      // Set the logged-in user
      setLoggedInUser(user.firstName);
      loggedIn();
      onClose();

      // Store the token and logged-in state in local storage for persistent login
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid password");
    }
  } else {
    alert("User not found");
  }
};

const handleLogout = () => {
  // Clear the token and logged-in state from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");

  // Perform logout logic here
  // ...
};
