import PurchaseRequest from "../models/purchaseReq.js";
import PurchaseOrder from "../models/purchaseOrd.js";

export const createRequest = async (req, res) => {
  try {
    const request = new PurchaseRequest(req.body);
    const saved = await request.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await PurchaseRequest.find()
      .populate("item")
      .populate("vendor");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await PurchaseRequest.findById(req.params.id)
      .populate("item")
      .populate("vendor");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const convertToOrder = async (req, res) => {
  try {
    const request = await PurchaseRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "Converted") {
      return res.status(400).json({ message: "Request already converted" });
    }

    const order = new PurchaseOrder({
      item: request.item,
      vendor: request.vendor,
      quantity: request.quantity,
    });

    await order.save();

    request.status = "Converted";
    await request.save();

    res.json({ alert: "Purchase Order created", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
