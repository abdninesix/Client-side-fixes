import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(console.log("error aa gia"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-8" style={{ backgroundImage: `url('/back.jpeg')`, backgroundSize: 'cover' }}>
      <div className="bg-white/60 shadow-lg w-full md:w-4/5 p-6 space-y-6 rounded-xl text-gray-600">

        {/* Input */}
        <h1 className="text-4xl font-semibold">Add a new task</h1>

        <form className="flex gap-2">
          <div className="w-full flex flex-col gap-2">
            <input type="text" placeholder="Name" className="bg-white rounded-md p-2 w-full" />
            <input type="text" placeholder="Description" className="bg-white rounded-md p-2 w-full" />
          </div>
          <button className="bg-white rounded-md p-2 text-4xl cursor-pointer">+</button>
        </form>

        {/* Tasks */}
        <h1 className="text-4xl font-semibold">All Todos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo, index) => (
            <div key={todo._id} className="flex items-center justify-between bg-white rounded-md p-6">
              <div>
                <h2 className="text-xl font-semibold">{todo.name}</h2>
                <p className="text-base">{todo.description}</p>
                <p className="text-xs">Created {format(todo.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="cursor-pointer hover:scale-110">✏️</button>
                <button className="cursor-pointer hover:scale-110">🗑️</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;

