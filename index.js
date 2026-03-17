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

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOriginPatterns = (
  process.env.CLIENT_URL_PATTERNS ||
  "https://*.vercel.app,http://localhost:3000"
)
  .split(",")
  .map((pattern) => pattern.trim())
  .filter(Boolean);
const defaultAllowedOrigins = [
  "http://localhost:3000",
  "https://erp-frontend-seven-nu.vercel.app",
];

const matchesOriginPattern = (origin) => {
  return allowedOriginPatterns.some((pattern) => {
    const escapedPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");

    return new RegExp(`^${escapedPattern}$`).test(origin);
  });
};

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (defaultAllowedOrigins.includes(origin)) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  if (matchesOriginPattern(origin)) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin(origin, callback) {
    console.log(`[CORS] Origin: ${origin || "no-origin"}`);

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log(
      `[${new Date().toISOString()}] OPTIONS preflight for ${req.originalUrl} from ${
        req.headers.origin || "no-origin"
      }`
    );
    return cors(corsOptions)(req, res, next);
  }

  return next();
});
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/items", itemRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/requests", prRoutes);
app.use("/api/orders", poRoutes);
app.use("/api/inventory", invRoutes);

app.get("/", (req, res) => {
  res.send("ERP API running");
});

app.use((err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    err
  );

  if (res.headersSent) {
    return next(err);
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message, origin: req.headers.origin });
  }

  return res.status(500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
