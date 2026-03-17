import Vendor from "../models/vendor.js";

const getErrorResponse = (error) => {
  if (error?.name === "ValidationError") {
    return {
      status: 400,
      message: error.message,
    };
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";

    return {
      status: 409,
      message: `${duplicateField} already exists`,
    };
  }

  return {
    status: 500,
    message: error.message || "Internal server error",
  };
};

export const createVendor = async (req, res) => {
  try {
    console.log("[VENDORS] createVendor payload:", req.body);
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    console.log("[VENDORS] vendor saved:", savedVendor._id);
    res.status(201).json(savedVendor);
  } catch (error) {
    console.error("[VENDORS] createVendor error:", error.message);
    const { status, message } = getErrorResponse(error);
    res.status(status).json({ message });
  }
};

export const getVendors = async (req, res) => {
  try {
    console.log("[VENDORS] getVendors called");
    const vendors = await Vendor.find();
    console.log("[VENDORS] getVendors count:", vendors.length);
    res.json(vendors);
  } catch (error) {
    console.error("[VENDORS] getVendors error:", error.message);
    const { status, message } = getErrorResponse(error);
    res.status(status).json({ message });
  }
};
