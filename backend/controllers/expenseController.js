import pool from "../config/db.js";

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query("SELECT * FROM expenses WHERE user_id = ?", [userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id, amount, date, description } = req.body;
    await pool.query(
      "INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)",
      [userId, category_id, amount, date, description]
    );
    res.json({ message: "Expense added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, amount, date, description } = req.body;
    await pool.query(
      "UPDATE expenses SET category_id=?, amount=?, date=?, description=? WHERE id=?",
      [category_id, amount, date, description, id]
    );
    res.json({ message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM expenses WHERE id = ?", [id]);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

