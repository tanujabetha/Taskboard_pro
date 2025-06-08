const express = require("express")
const router = express.Router();
const task = require("../controllers/taskController");
//middleware yet to be created
const authMiddleware = require("../middleware/auth")

router.post("/create", authMiddleware, task.createTask);
router.get("/getTask", authMiddleware, task.getTask);
router.get("/getAllTasks", authMiddleware, task.getAllTasks);
router.put("/updateTask",authMiddleware,task.updateTask);
router.delete("/deleteTask",authMiddleware,task.deleteTask);
module.exports = router;