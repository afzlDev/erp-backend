import Item from "../models/items.js";

export const createItem = async (req, res) => {
  try {
    console.log("[ITEMS] createItem payload:", req.body);

    const item = new Item(req.body);

    const savedItem = await item.save();

    console.log("[ITEMS] item saved:", savedItem._id);

    res.status(201).json(savedItem);

  } catch (error) {
    console.error("[ITEMS] createItem error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    console.log("[ITEMS] getItems called");

    const items = await Item.find();

    console.log("[ITEMS] getItems count:", items.length);

    res.json(items);

  } catch (error) {
    console.error("[ITEMS] getItems error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
