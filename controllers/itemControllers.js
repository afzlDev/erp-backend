import Item from "../models/items.js";

export const createItem = async (req, res) => {
  try {

    const item = new Item(req.body);

    const savedItem = await item.save();

    res.status(201).json(savedItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {

    const items = await Item.find();

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};