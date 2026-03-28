const Leave = require("../models/Leave");


// ✅ Apply Leave (Professional Version)
exports.applyLeave = async (req, res) => {
  try {
    const { reason, fromDate, toDate } = req.body;

    // 🔹 Basic Validation
    if (!reason || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔹 Date Validation
    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({
        success: false,
        message: "To Date cannot be earlier than From Date"
      });
    }

    // 🔹 Prevent Duplicate Pending Leave
    const existingLeave = await Leave.findOne({
      user: req.user._id,
      fromDate,
      toDate,
      status: "Pending"
    });

    if (existingLeave) {
      return res.status(400).json({
        success: false,
        message: "You already applied leave for these dates"
      });
    }

    const leave = await Leave.create({
      user: req.user._id,
      reason,
      fromDate,
      toDate
    });

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ Get Leaves (Role Based)
exports.getLeaves = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === "admin") {
      leaves = await Leave.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    } else {
      leaves = await Leave.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      data: leaves
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ Update Leave Status (Admin Only)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found"
      });
    }

    leave.status = status;
    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} successfully`,
      data: leave
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ Leave Statistics (Dashboard Ready)
exports.getLeaveStats = async (req, res) => {
  try {
    const stats = await Leave.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};