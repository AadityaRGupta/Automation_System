const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Create table if not exists (run once)
pool.query(`
  CREATE TABLE IF NOT EXISTS claims (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    policy_id VARCHAR(50),
    claim_type VARCHAR(50),
    amount NUMERIC,
    status VARCHAR(20)
  )
`);

// POST /claims - Submit a claim
app.post('/claims', async (req, res) => {
  const { name, policy_id, claim_type, amount } = req.body;
  const status = parseFloat(amount) <= 1000 ? 'approved' : 'pending';

  try {
    const result = await pool.query(
      `INSERT INTO claims (name, policy_id, claim_type, amount, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, policy_id, claim_type, amount, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /claims - View all claims
app.get('/claims', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM claims ORDER BY id DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /claims/:id - Get specific claim
app.get('/claims/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM claims WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).send("Claim not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
