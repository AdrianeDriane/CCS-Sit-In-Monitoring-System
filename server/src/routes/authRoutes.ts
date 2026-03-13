import { Router } from "express";
import { loginUser, registerUser } from "../services/authService";
import type { UserRole } from "../types/auth";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const normalizedRole = req.body.role
      ? (String(req.body.role).toUpperCase() as UserRole)
      : undefined;
    const user = await loginUser({
      identifier: String(req.body.identifier ?? ""),
      password: String(req.body.password ?? ""),
      ...(normalizedRole ? { role: normalizedRole } : {}),
    });

    return res.status(200).json({
      message: "Login successful.",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process login.";

    return res.status(400).json({ message });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const user = await registerUser({
      idNumber: String(req.body.idNumber ?? ""),
      email: String(req.body.email ?? ""),
      firstName: String(req.body.firstName ?? ""),
      lastName: String(req.body.lastName ?? ""),
      middleName: req.body.middleName ? String(req.body.middleName) : "",
      role: String(req.body.role ?? "").toUpperCase() as UserRole,
      password: String(req.body.password ?? ""),
      course: req.body.course ? String(req.body.course) : "",
      yearLevel: req.body.yearLevel ? String(req.body.yearLevel) : "",
      address: req.body.address ? String(req.body.address) : "",
    });

    return res.status(201).json({
      message: "Registration successful.",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create account.";

    return res.status(400).json({ message });
  }
});
