import express from "express";
import { authRouter } from "./routes/authRoutes";
import { env } from "./config/env";
import { sitInRouter } from "./routes/sitInRoutes";

export const app = express();

const allowedOrigins = env.clientOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const resolveAllowedOrigin = (requestOrigin?: string) => {
  if (allowedOrigins.includes("*")) {
    return requestOrigin ?? "*";
  }

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0] ?? "*";
};

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    resolveAllowedOrigin(req.headers.origin),
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control");
  res.header("Vary", "Origin");

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

