const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const nodemon = require("nodemon");

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

// Helper function to generate a JWT token
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

// Middleware function to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
}

// Endpoint to handle user signup
app.post("/user/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sqlSignup =
      "INSERT INTO user_table (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";

    db.query(
      sqlSignup,
      [firstName, lastName, email, hashedPassword],
      (error, result) => {
        if (error) {
          console.error("Error creating user:", error);
          return res.sendStatus(500); // Internal Server Error
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
  } catch (error) {
    console.error("Error creating user:", error);
    return res.sendStatus(500); // Internal Server Error
  }
});

// Endpoint to handle user login
app.post("http://localhost:3001/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sqlLogin = "SELECT * FROM user_table WHERE email = ?";
    const [rows] = await db.query(sqlLogin, [email]);

    if (rows.length > 0) {
      const user = rows[0];

      // Compare the provided password with the stored hashed password
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Passwords match, generate a token and send it back
        const token = generateToken(user);
        res.json({ token });
      } else {
        // Passwords do not match
        res.sendStatus(401); // Unauthorized
      }
    } else {
      // No user found with the provided email
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.sendStatus(500); // Internal Server Error
  }
});

app.post("http://localhost:3001/user/validateToken", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    // Token is valid, extract the user information from the decoded token
    const { email } = decoded;
    res.json({ email });
  });
});

// Endpoint to get users from user_table
app.get("/users/get", (req, res) => {
  const sqlGetUsers = "SELECT * FROM `user_table`";

  db.query(sqlGetUsers, (error, result) => {
    res.send(result);
  });
});

// Route to fetch booking data for the logged-in user
app.get("/booking/get", authenticateToken, (req, res) => {
  const sqlGetBooking = "SELECT * FROM bookings_table";

  db.query(sqlGetBooking, (error, result) => {
    res.send(result);
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
