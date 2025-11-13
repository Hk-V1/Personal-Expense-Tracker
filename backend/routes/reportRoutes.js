import express from "express";
import { getReports, getMonthlyReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.get("/monthly", getMonthlyReport);

export default router;
