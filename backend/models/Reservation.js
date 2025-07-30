// models/Reservation.js

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true, // Ensures each reference is unique
  },
  startStation: {
    type: String,
    required: true,
  },
  endStation: {
    type: String,
    required: true,
  },
  train: {
    type: String,
    required: true,
  },
  clz: {
    type: String,
    required: true,
    enum: [
      "1st class Reserved",
      "1st class Sleeper",
      "1st class Air-Conditioned",
      "1st class Observation Saloon",
      "2nd class Reserved",
      "2nd class Sleeper",
      "3rd class Reserved",
      "3rd class Sleeper",
    ],
  },
  time: {
    type: String, // Stored in "HH:MM" format
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
    min: 1,
    max: 25,
  },
  price: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  id: {
    type: String, // NIC, Passport, or Driving License number
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
    enum: ["Done", "Pending"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
