const express = require("express");
const {
  getWebsite,
  createWebsite,
  updateWebsite,
  deleteWebsite,
} = require("../controllers/website");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get user portfolio
router.get("/", authMiddleware, getWebsite);

// Create user portfolio
router.post("/", authMiddleware, createWebsite);

// Update user portfolio
router.put("/", authMiddleware, updateWebsite);

// Delete user portfolio
router.delete("/", authMiddleware, deleteWebsite);

module.exports = router;
