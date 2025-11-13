import express from "express";
import { getIncome, addIncome, deleteIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.get("/", getIncome);
router.post("/", addIncome);
router.delete("/:id", deleteIncome);

export default router;
