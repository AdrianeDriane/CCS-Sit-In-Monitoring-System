import express from "express";
import { authRouter } from "./routes/authRoutes";
import { env } from "./config/env";
import { sitInRouter } from "./routes/sitInRoutes";

export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", env.clientOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/sit-in", sitInRouter);
