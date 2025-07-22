const express = require("express");
const router = express.Router();

// Temporary in-memory data
let investments = [];

// GET all investments
router.get("/", (req, res) => {
  res.json(investments);
});

// POST a new investment
router.post("/", (req, res) => {
  const { name, amount } = req.body;
  const newInvestment = { id: Date.now(), name, amount };
  investments.push(newInvestment);
  res.status(201).json(newInvestment);
});

module.exports = router;