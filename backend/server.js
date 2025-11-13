import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
