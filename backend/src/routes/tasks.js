const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// GET ALL TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE TASK
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user
  });

  res.json(task);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const { title, description, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, description, completed },
    { new: true }
  );

  res.json(task);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user
  });

  res.json({ msg: "Task deleted" });
});

module.exports = router;
