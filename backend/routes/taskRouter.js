import express from "express";
import {
  createTask,
  deleteTask,
  readAllTask,
  readSingleTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();
//dynamic routes
router.get("/:id", readSingleTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// static routes
router.post("/", createTask);
router.get("/", readAllTask);


export default router;
