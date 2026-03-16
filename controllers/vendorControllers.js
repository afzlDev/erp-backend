import Vendor from "../models/vendor.js";

export const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};