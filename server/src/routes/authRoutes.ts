import { Router } from "express";
import {
  hardDeleteStudent,
  listStudentAccounts,
  loginUser,
  registerUser,
  updateStudentByAdmin,
  updateStudentProfile,
} from "../services/authService";
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

authRouter.put("/students/:id/profile", async (req, res) => {
  try {
    const user = await updateStudentProfile({
      userId: Number(req.params.id),
      lastName: String(req.body.lastName ?? ""),
      firstName: String(req.body.firstName ?? ""),
      middleName: req.body.middleName ? String(req.body.middleName) : "",
      course: req.body.course ? String(req.body.course) : "",
      yearLevel: req.body.yearLevel ? String(req.body.yearLevel) : "",
      email: String(req.body.email ?? ""),
      address: req.body.address ? String(req.body.address) : "",
    });

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update profile.";

    return res.status(400).json({ message });
  }
});

authRouter.get("/students", async (_req, res) => {
  try {
    const students = await listStudentAccounts();

    return res.status(200).json({
      students,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch students.";

    return res.status(400).json({ message });
  }
});

authRouter.put("/students/:id", async (req, res) => {
  try {
    const user = await updateStudentByAdmin({
      userId: Number(req.params.id),
      idNumber: String(req.body.idNumber ?? ""),
      lastName: String(req.body.lastName ?? ""),
      firstName: String(req.body.firstName ?? ""),
      middleName: req.body.middleName ? String(req.body.middleName) : "",
      course: req.body.course ? String(req.body.course) : "",
      yearLevel: req.body.yearLevel ? String(req.body.yearLevel) : "",
      email: String(req.body.email ?? ""),
      address: req.body.address ? String(req.body.address) : "",
      remainingSessions: Number(req.body.remainingSessions),
    });

    return res.status(200).json({
      message: "Student updated successfully.",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update student.";

    return res.status(400).json({ message });
  }
});

authRouter.delete("/students/:id", async (req, res) => {
  try {
    await hardDeleteStudent(Number(req.params.id));

    return res.status(200).json({
      message: "Student deleted successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete student.";

    return res.status(400).json({ message });
  }
});
