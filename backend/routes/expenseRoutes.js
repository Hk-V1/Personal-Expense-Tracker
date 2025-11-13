import express from "express";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getExpenses);
router.post("/", verifyToken, addExpense);
router.put("/:id", verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;
