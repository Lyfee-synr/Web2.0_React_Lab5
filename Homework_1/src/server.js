import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes (⚠️ mount routes TRƯỚC notFound/errorHandler)
app.use("/api/auth", authRoutes);   // <-- chuyển lên đây
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// 404 + error handler (đặt CUỐI)
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
  try {
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env");
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Fatal:", err.message);
    process.exit(1);
  }
})();
