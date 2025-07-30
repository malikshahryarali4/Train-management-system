// controllers/reservationController.js


const Reservation = require("../models/Reservation.js");

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const reservationData = req.body;

    // Create a new reservation instance
    const reservation = new Reservation(reservationData);

    // Save the reservation to the database
    await reservation.save();

    return res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res
      .status(500)
      .json({ message: "Error creating reservation", error });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res
      .status(500)
      .json({ message: "Error fetching reservations", error });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ message: "Error fetching reservation", error });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json({
      message: "Reservation updated successfully",
      updatedReservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res
      .status(500)
      .json({ message: "Error updating reservation", error });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res
      .status(500)
      .json({ message: "Error deleting reservation", error });
  }
};
