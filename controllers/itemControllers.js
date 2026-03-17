import Item from "../models/items.js";

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

export const createItem = async (req, res) => {
  try {
    console.log("[ITEMS] createItem payload:", req.body);

    const item = new Item(req.body);

    const savedItem = await item.save();

    console.log("[ITEMS] item saved:", savedItem._id);

    res.status(201).json(savedItem);

  } catch (error) {
    console.error("[ITEMS] createItem error:", error.message);
    const { status, message } = getErrorResponse(error);
    res.status(status).json({ message });
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
    const { status, message } = getErrorResponse(error);
    res.status(status).json({ message });
  }
};
