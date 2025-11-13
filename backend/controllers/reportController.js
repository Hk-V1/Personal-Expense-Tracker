import db from "../config/db.js";

// Fetch total expenses and income summary
export const getReports = async (req, res) => {
  try {
    const [expenseRows] = await db.query(
      "SELECT SUM(amount) AS total_expense FROM expenses"
    );
    const [incomeRows] = await db.query(
      "SELECT SUM(amount) AS total_income FROM income"
    );

    const report = {
      total_expense: expenseRows[0].total_expense || 0,
      total_income: incomeRows[0].total_income || 0,
      balance:
        (incomeRows[0].total_income || 0) -
        (expenseRows[0].total_expense || 0),
    };

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};

// Fetch monthly expense/income breakdown
export const getMonthlyReport = async (req, res) => {
  try {
    const [monthlyData] = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') AS month,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income
      FROM (
        SELECT amount, date, 'expense' AS type FROM expenses
        UNION ALL
        SELECT amount, date, 'income' AS type FROM income
      ) AS combined
      GROUP BY month
      ORDER BY month DESC;
    `);

    res.json(monthlyData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch monthly report" });
  }
};
