import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(console.log("error aa gia"));
  }, []);

const addTask = () => {
    axios
      .post("http://localhost:5000/todo", { name, desc })
      .then((res) => {
        setTodos([...todos, res.data]);
        setName("");
        setDesc("");
      })
      .catch(error => console.log("creating me error aa gia", error));
  }

const deleteTask=(id)=>{
   axios
      .delete(`http://localhost:5000/todo/${id}`) 
      .then((res) => {
       setTodos(todos.filter((todo)=>todo._id !== id))
      })
      .catch(console.log("error aa gia"));
}


  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-8" style={{ backgroundImage: `url('/back.jpeg')`, backgroundSize: 'cover' }}>
      <span className="absolute top-4 rotate-5 text-lg font-semibold uppercase p-2 text-white bg-blue-600/60 rounded-full">Todo App by Alisha Saif</span>
      <div className="bg-white/60 shadow-lg w-full md:w-4/5 p-6 space-y-6 rounded-xl text-gray-600 duration-200">

        {/* Input */}
        <h1 className="text-4xl font-semibold">Add a new task</h1>

        <form  action={addTask} className="flex gap-2">
          <div className="w-full flex flex-col gap-2">
          <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-white rounded-md p-2 w-full" />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="bg-white rounded-md p-2 w-full" />
      
          </div>
          <button className="bg-white rounded-md p-2 text-4xl cursor-pointer">+</button>
        </form>

        {/* Tasks */}
        <h1 className="text-4xl font-semibold">All Todos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo, ) => (
            <div key={todo._id} className="flex items-center justify-between bg-white rounded-md p-6">
              <div>
                <h2 className="text-xl font-semibold">{todo.name}</h2>
                <p className="text-base">{todo.description}</p>
                <p className="text-xs">Created {format(todo.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <button className="cursor-pointer hover:scale-110">✏️</button>
                <button onClick={()=>deleteTask(todo._id)} className="cursor-pointer hover:scale-110">🗑️</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;