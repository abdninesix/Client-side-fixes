import Task from "../models/task.js";

// create task
export const createTask = async (req, res) => {
  try {
    await Task.create(req.body);
    res.status(201).json({ message: "success in create task" });
  } catch (error) {
    res.status(500).json({ message: "fail in create task" });
  }
};

// read aLL task
export const readAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error in getting tasks" });
  }
};

// read single task
export const readSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error in getting task" });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "success in updating task" });
  } catch (error) {
    res.status(500).json({ message: "Error in updating task" });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete success task" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting task" });
  }
};
