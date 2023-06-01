import { Outlet } from "react-router-dom"; // Importing the Outlet component from the react-router-dom package
import { useState, useEffect } from "react"; // Importing the useState and useEffect hooks from the React package
import useRefreshToken from "../hooks/useRefreshToken"; // Importing the useRefreshToken custom hook from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"; // Importing the useAuth custom hook from "../hooks/useAuth"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true); // Declaring a state variable 'isLoading' and its setter function 'setIsLoading', initialized with the value 'true'
  const refresh = useRefreshToken(); // Assigning the result of calling the useRefreshToken hook to the 'refresh' constant
  const { auth, persist } = useAuth(); // Assigning the properties 'auth' and 'persist' from the result of calling the useAuth hook to the constants 'auth' and 'persist'

  useEffect(() => {
    let isMounted = true; // Declaring a variable 'isMounted' and initializing it with the value 'true'

    const verifyRefreshToken = async () => {
      // Declaring an asynchronous function 'verifyRefreshToken'
      try {
        await refresh(); // Calling the 'refresh' function asynchronously
      } catch (err) {
        console.error(err); // Logging any error that occurs during the refresh token verification process
      } finally {
        isMounted && setIsLoading(false); // Checking if the component is still mounted before updating the 'isLoading' state to 'false'
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false); // Checking if the access token doesn't exist and the 'persist' property is truthy, if so, calling 'verifyRefreshToken', otherwise directly setting 'isLoading' to 'false'

    return () => (isMounted = false); // Cleaning up function that sets 'isMounted' to 'false' when the component is unmounted
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`); // Logging the current value of 'isLoading'
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`); // Logging the current value of 'auth.accessToken' after converting it to a string using JSON.stringify
  }, [isLoading]); // Running this effect only when 'isLoading' changes

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</> // Rendering the Outlet component if 'persist' is falsy, otherwise, rendering a loading message if 'isLoading' is truthy, otherwise, rendering the Outlet component
  );
};

export default PersistLogin; // Exporting the PersistLogin component as the default export
