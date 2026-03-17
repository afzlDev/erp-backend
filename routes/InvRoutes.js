import express from "express";
import { getInventory } from "../controllers/InvControllers.js";

const router = express.Router();

router.get("/", getInventory);

export default router;
