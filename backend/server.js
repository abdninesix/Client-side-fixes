import express from "express";
import taskRouter from "./routes/taskRouter.js"
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

app.use(cors());

app.use('/todo', taskRouter )

app.get('/', (req , res)=>{
    res.send('Todo API is running')
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});