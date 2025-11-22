import express from "express";
import taskRouter from "./routes/taskRouter.js"
import connectDB from "./config/db.js";
 

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use('/todo', taskRouter )
app.get('/', (req , res)=>{
    res.send('alisha saif')
})

app.listen(port, () => {
  console.log("Server is running");
});
