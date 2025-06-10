import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

// GET /api/vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/vehicles
export const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();

    // If assignedDriver is present, update the driver's assignedVehicle, details, and status
    if (savedVehicle.assignedDriver) {
      // Determine driver status based on vehicle status
      let driverStatus = "Inactive";
      if (savedVehicle.status === "In Service") driverStatus = "Active";
      if (savedVehicle.status === "Available" || savedVehicle.status === "Maintenance") driverStatus = "Inactive";

      await Driver.findOneAndUpdate(
        { name: savedVehicle.assignedDriver },
        {
          assignedVehicle: savedVehicle._id,
          vehicleReg: savedVehicle.regNumber,
          vehicleType: savedVehicle.type,
          status: driverStatus,
        }
      );
    }

    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/vehicles/:id (Update vehicle)
export const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updateData = req.body;
    const currentVehicle = await Vehicle.findById(vehicleId);

    // Update the vehicle
    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, { new: true });

    // If assignedDriver changed, update drivers
    if (updateData.assignedDriver) {
      // Clear previous driver's assignedVehicle, vehicleReg, vehicleType if driver changed
      if (
        currentVehicle &&
        currentVehicle.assignedDriver &&
        currentVehicle.assignedDriver !== updateData.assignedDriver
      ) {
        await Driver.findOneAndUpdate(
          { name: currentVehicle.assignedDriver },
          {
            assignedVehicle: "",
            vehicleReg: "",
            vehicleType: "",
            status: "Inactive", // Optionally set to Inactive when unassigned
          }
        );
      }

      // Find the vehicle being assigned
      const vehicle = await Vehicle.findById(vehicleId);

      // Determine driver status based on vehicle status
      let driverStatus = "Inactive";
      if (updateData.status === "In Service") driverStatus = "Active";
      if (updateData.status === "Available" || updateData.status === "Maintenance") driverStatus = "Inactive";

      // Check if the driver is already assigned to another active vehicle
      const activeDriver = await Driver.findOne({ name: updateData.assignedDriver, status: "Active" });
      if (activeDriver && activeDriver.assignedVehicle && activeDriver.assignedVehicle !== vehicleId) {
        return res.status(400).json({ message: "Driver is already assigned to another active vehicle." });
      }

      // Set new driver's assignedVehicle, vehicleReg, vehicleType, and status
      await Driver.findOneAndUpdate(
        { name: updateData.assignedDriver },
        {
          assignedVehicle: vehicleId,
          vehicleReg: vehicle.regNumber,
          vehicleType: vehicle.type,
          status: driverStatus,
        }
      );
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/vehicles/:id (Delete vehicle)
export const deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
