import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Tasks", taskSchema);
export default Task;
