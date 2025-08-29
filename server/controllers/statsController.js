import Task from "../models/Task.js";

const getOverview = async (req, res) => {
  try {
    const byStatus = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const byPriority = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    const stats = {
      byStatus: byStatus.reduce((acc, s) => {
        acc[s._id] = s.count;
        return acc;
      }, {}),
      byPriority: byPriority.reduce((acc, p) => {
        acc[p._id] = p.count;
        return acc;
      }, {}),
      overdueTasks,
    };

    res.json(stats);
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Server error fetching stats" });
  }
};

export default {getOverview};