import express from "express";

import {
  createOrder,
  getOrders,
  receiveOrder,
} from "../controllers/POControllers.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.post("/:id/receive", receiveOrder);
router.post("/receive/:id", receiveOrder);


export default router;
