const Task = require("../models/Task");

//creating the task
exports.createTask = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const labels = req.body.labels;
    const create_task = new Task({
      title,
      description,
      status,
      labels,
      user: req.user.id,
    });
    await create_task.save();
    return res.status(201).json({ message: "Task is created" });
  } catch (error) {
    console.error("Task creation failed: ", error.message);
    res.status(500).json({ message: "Server error while creating the task" });
  }
};

//get a task
exports.getTask = async (req, res) => {
  try {
    const title = req.body.title;
    const task = await Task.findOne({ title, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error while getting the task" });
  }
};

//get all tasks of the user
exports.getAllTasks = async (req, res) => {
  try {
    const req_user = req.user.id;
    const tasks = await Task.find({ user: req_user });
    if (!tasks) {
      return res.status(400).json({ message: "Tasks not found for the user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error while getting the task" });
  }
};

//update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, updates } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { title, user: req.user.id },
      { $set: updates },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found to update" });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("error");
    return res
      .status(500)
      .json({ message: "Server error while updating the task" });
  }
};

//delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { title } = req.body;
    const deleted = await Task.findOneAndDelete({ title, user: req.user.id });
    if (!deleted)
      return res.status(404).json({ message: "Task not found to delete" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {}
};
