const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Create connection pool for database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "purpri_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });

  return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
}

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  const sqlLogin = "SELECT * FROM user_table WHERE email = ? AND password = ?";
  db.query(sqlLogin, [email, password], (error, results) => {
    if (error) {
      console.log("ERROR");
      res.sendStatus(500); // Internal Server Error
    } else {
      if (results.length > 0) {
        const user = results[0];
        const token = generateToken(user);
        res.json({ token });
      } else {
        res.sendStatus(401); // Unauthorized
      }
    }
  });
});

app.post("/user/validateToken", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    // Token is valid, extract the user information from the decoded token
    const { email } = decoded;
    res.json({ email });
  });
});

// Endpoint to handle user signup
app.post("/user/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const sqlSignup =
    "INSERT INTO user_table (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";

  db.query(
    sqlSignup,
    [firstName, lastName, email, password],
    (error, result) => {
      if (error) {
        console.log("ERROR");
      } else {
        const user = {
          id: result.insertId,
          email: email,
        };

        const token = generateToken(user);

        res.json({ token });
      }
    }
  );
});

app.post("/booking/create", (req, res) => {
  const bookingInfo = req.body;

  // Check if all required fields are present
  if (
    !bookingInfo.houseNo ||
    !bookingInfo.street ||
    !bookingInfo.barangay ||
    !bookingInfo.postal ||
    !bookingInfo.city ||
    !bookingInfo.phone ||
    !bookingInfo.bookerFirstName ||
    !bookingInfo.bookerLastName ||
    bookingInfo.totalPrice === undefined ||
    bookingInfo.service === undefined ||
    bookingInfo.floorArea === undefined ||
    bookingInfo.bookerID === undefined
  ) {
    return res.status(400).json({ error: "Please fill in all the fields." });
  }

  // Insert the booking into the database
  const sqlCreateBooking =
    "INSERT INTO bookings_table (totalPrice, service, floorArea, houseNo, street, barangay, postal, city, phone, bookerFirstName, bookerLastName, bookerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    bookingInfo.totalPrice,
    bookingInfo.service,
    bookingInfo.floorArea,
    bookingInfo.houseNo,
    bookingInfo.street,
    bookingInfo.barangay,
    bookingInfo.postal,
    bookingInfo.city,
    bookingInfo.phone,
    bookingInfo.bookerFirstName,
    bookingInfo.bookerLastName,
    bookingInfo.bookerID,
  ];

  db.query(sqlCreateBooking, values, (error, result) => {
    if (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({
        error: "An error occurred during booking creation. Please try again.",
      });
    }

    res.status(200).json({ message: "Booking created successfully." });
  });
});

// Endpoint to get users from user_table
app.get("/users/get", (req, res) => {
  const sqlGetUsers = "SELECT * FROM `user_table`";

  db.query(sqlGetUsers, (error, result) => {
    res.send(result);
  });
});

app.get("/booking/get", (req, res) => {
  // Retrieve the booking list from the database
  const sqlGetBookings = "SELECT * FROM bookings_table";

  db.query(sqlGetBookings, (error, results) => {
    if (error) {
      console.error("Error retrieving bookings:", error);
      return res.status(500).json({
        error: "An error occurred while retrieving bookings. Please try again.",
      });
    }

    res.status(200).json(results);
  });
});

// Endpoint to get services from services_table
app.get("/services/get", (req, res) => {
  const sqlGetServices = "SELECT * FROM `services_table`";

  db.query(sqlGetServices, (error, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
