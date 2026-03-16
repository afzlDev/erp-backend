import express from "express";
import { convertToOrder } from "../controllers/PRControllers.js";


import {
  createRequest,
  getRequestById,
  getRequests,
} from "../controllers/PRControllers.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getRequests);
router.get("/:id", getRequestById);
router.post("/:id/convert", convertToOrder);

export default router;
