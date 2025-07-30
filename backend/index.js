const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const reservationRoutes = require("./routes/reservationRoutes.js");

const app = express();

const PORT = process.env.PORT || 4000;

dotenv.config();

// CORS middleware should be applied before any routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from localhost:3000
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
