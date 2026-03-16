import express from "express";
import { getInventory, receiveOrder } from "../controllers/InvControllers.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/receive", receiveOrder);

export default router;