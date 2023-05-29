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
        res.send(result);
      }
    }
  );
});

app.post("/booking/create", (req, res) => {
  const bookingInfo = req.body;

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
      console.log("ERROR");
    } else {
      res.send(result);
    }
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
  const sql = "SELECT * FROM bookings_table";
  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.send(results);
    }
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
