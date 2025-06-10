import Driver from "../models/Driver.js";
import Vehicle from "../models/Vehicle.js"; // Import Vehicle model

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDriver = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      email,
      phone,
      address,
      licenseNumber,
      licenseExpiry,
      vehicleReg,
      vehicleType,
      experience,
      profileImage
    } = req.body;

    const newDriver = new Driver({
      name,
      gender,
      age,
      email,
      phone,
      address,
      licenseNumber,
      licenseExpiry,
      vehicleReg,
      vehicleType,
      experience,
      profileImage // Save as-is
    });

    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update driver info
export const updateDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const updateData = req.body;
    const currentDriver = await Driver.findById(driverId);

    // Update the driver
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, { new: true });

    // If assignedVehicle changed, update vehicles
    if (updateData.assignedVehicle) {
      // Clear previous vehicle's assignedDriver
      if (
        currentDriver &&
        currentDriver.assignedVehicle &&
        currentDriver.assignedVehicle !== updateData.assignedVehicle
      ) {
        // Only clear if previous assignedVehicle is a valid ObjectId
        if (currentDriver.assignedVehicle.match(/^[0-9a-fA-F]{24}$/)) {
          await Vehicle.findByIdAndUpdate(
            currentDriver.assignedVehicle,
            { assignedDriver: "" }
          );
        } else {
          await Vehicle.findOneAndUpdate(
            { regNumber: currentDriver.assignedVehicle },
            { assignedDriver: "" }
          );
        }
      }

      let vehicleId = updateData.assignedVehicle;
      let vehicle = null;

      // If not a valid ObjectId, treat as regNumber
      if (!vehicleId.match(/^[0-9a-fA-F]{24}$/)) {
        vehicle = await Vehicle.findOne({ regNumber: vehicleId });
        if (vehicle) vehicleId = vehicle._id.toString();
        else vehicleId = null;
      } else {
        vehicle = await Vehicle.findById(vehicleId);
      }

      if (vehicle) {
        await Vehicle.findByIdAndUpdate(
          vehicleId,
          { assignedDriver: updatedDriver.name }
        );
      }
    }

    res.status(200).json(updatedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  } 
};

// Change driver status
export const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete driver
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
