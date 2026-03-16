import PurchaseOrder from "../models/purchaseOrd.js";
import Inventory from "../models/inventory.js";

export const createOrder = async (req, res) => {
  try {
    const { item, vendor, quantity } = req.body;

    if (!item || !vendor || !quantity) {
      return res
        .status(400)
        .json({ message: "Item, vendor, and quantity are required" });
    }

    const order = new PurchaseOrder(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate("item")
      .populate("vendor");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const receiveOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Received") {
      return res.status(400).json({ message: "Order already received" });
    }

    let record = await Inventory.findOne({ item: order.item });

    if (!record) {
      record = new Inventory({
        item: order.item,
        quantity: order.quantity,
      });
    } else {
      record.quantity += order.quantity;
    }

    await record.save();

    order.status = "Received";
    await order.save();

    res.json({ message: "Goods received", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
