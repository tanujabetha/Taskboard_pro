const Task = require("../models/Task");
const User = require("../models/User");
const emailQueue = require("../queue/emailQueue");

//creating the task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, labels } = req.body;

    const create_task = new Task({
      title,
      description,
      status,
      labels,
      user: req.user.id,
    });

    await create_task.save();

    const user = await User.findById(req.user.id).select("email");
    const userEmail = user.email;

    await emailQueue.add("sendEmail", {
      type: "created",
      taskData: {
        title,
        description,
        status,
        labels,
        user: req.user.id,
        to: userEmail,
      },
    });

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

    const user = await User.findById(req.user.id).select("email");
    const userEmail = user.email;

    await emailQueue.add("sendEmail", {
      type: "updated",
      taskData: {
        title: updatedTask.title,
        description: updatedTask.description,
        labels: updatedTask.labels,
        user: req.user.id,
        to: userEmail,
      },
    });

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

    const user = await User.findById(req.user.id).select("email");
    const userEmail = user.email;

    await emailQueue.add("sendEmail", {
      type: "deleted",
      taskData: {
        title: deleted.title,
        description: deleted.description,
        labels: deleted.labels,
        user: req.user.id,
        to: userEmail,
      },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {}
};
