const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
  getLeaveStats
} = require("../controllers/leaveController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, applyLeave);
router.get("/", protect, getLeaves);
router.put("/:id", protect, adminOnly, updateLeaveStatus);
router.get("/stats", protect, getLeaveStats);

module.exports = router;