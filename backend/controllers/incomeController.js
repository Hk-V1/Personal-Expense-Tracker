import db from "../config/db.js";

// GET all income entries
export const getIncome = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM income ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch income data" });
  }
};

// ADD income
export const addIncome = async (req, res) => {
  try {
    const { user_id, category_id, amount, date, description } = req.body;
    await db.query(
      "INSERT INTO income (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)",
      [user_id, category_id, amount, date, description]
    );
    res.status(201).json({ message: "Income added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add income" });
  }
};

// DELETE income
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM income WHERE id = ?", [id]);
    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete income" });
  }
};
