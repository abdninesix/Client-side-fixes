import express from "express";
import taskRouter from "./routes/taskRouter.js"
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use(cors());

app.use('/todo', taskRouter )
app.get('/', (req , res)=>{
    res.send('Alisha Saif')
})

app.listen(port, () => {
  console.log("Server is running");
});