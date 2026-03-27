import { Router } from "express";
import {
  completeSitIn,
  createSitIn,
  getActiveSitIns,
  getAllSitInRecords,
  lookupStudentForSitIn,
} from "../services/sitInService";
import { getDatabaseErrorMessage } from "../utils/database";

export const sitInRouter = Router();

sitInRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

sitInRouter.get("/students/:idNumber", async (req, res) => {
  try {
    const result = await lookupStudentForSitIn(String(req.params.idNumber ?? ""));

    return res.status(200).json(result);
  } catch (error) {
    const message = getDatabaseErrorMessage(
      error,
      "Unable to look up student.",
    );

    return res.status(400).json({ message });
  }
});

sitInRouter.get("/active", async (_req, res) => {
  try {
    const records = await getActiveSitIns();

    return res.status(200).json({ records });
  } catch (error) {
    const message = getDatabaseErrorMessage(
      error,
      "Unable to fetch active sit-in records.",
    );

    return res.status(400).json({ message });
  }
});

sitInRouter.get("/records", async (_req, res) => {
  try {
    const records = await getAllSitInRecords();

    return res.status(200).json({ records });
  } catch (error) {
    const message = getDatabaseErrorMessage(
      error,
      "Unable to fetch sit-in records.",
    );

    return res.status(400).json({ message });
  }
});

sitInRouter.post("/records", async (req, res) => {
  try {
    const result = await createSitIn({
      studentId: Number(req.body.studentId),
      laboratory: String(req.body.laboratory ?? ""),
      purpose: req.body.purpose ? String(req.body.purpose) : "",
    });

    return res.status(201).json({
      message: "Sit-in session started successfully.",
      ...result,
    });
  } catch (error) {
    const message = getDatabaseErrorMessage(
      error,
      "Unable to start sit-in session.",
    );

    return res.status(400).json({ message });
  }
});

sitInRouter.put("/records/:id/complete", async (req, res) => {
  try {
    const record = await completeSitIn(Number(req.params.id));

    return res.status(200).json({
      message: "Sit-in session completed successfully.",
      record,
    });
  } catch (error) {
    const message = getDatabaseErrorMessage(
      error,
      "Unable to complete sit-in session.",
    );

    return res.status(400).json({ message });
  }
});
