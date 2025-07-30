const express = require("express");
const router = express.Router();
const reservationController = require("../controller/reservationController.js");

// Create a new reservation
router.post("/add", reservationController.createReservation);

// Get all reservations
router.get("/", reservationController.getAllReservations);

// Get reservation by ID (use :id as a parameter in the route)
router.get("/:id", reservationController.getReservationById);

// Update a reservation by ID
router.put("/:id", reservationController.updateReservation);

// Delete a reservation by ID
router.delete("/delete:id", reservationController.deleteReservation);

module.exports = router;
