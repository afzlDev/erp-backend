import Inventory from "../models/inventory.js";

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("item");
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const receiveOrder = async (req, res) => {
  try {
    const { item, quantity } = req.body;

    let record = await Inventory.findOne({ item });

    if (!record) {
      record = new Inventory({
        item,
        quantity,
      });
    } else {
      record.quantity += quantity;
    }

    await record.save();

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};