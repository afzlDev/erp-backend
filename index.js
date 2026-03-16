import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import prRoutes from "./routes/PRRoutes.js";
import poRoutes from "./routes/PORoutes.js";
import invRoutes from "./routes/InvRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/requests", prRoutes);
app.use("/api/orders", poRoutes);
app.use("/api/inventory", invRoutes);

app.get("/", (req, res) => {
  res.send("ERP API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});