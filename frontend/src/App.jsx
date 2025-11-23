import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

function App() {

  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(error => console.log("fetching me error aa gia", error));
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/todo", { name, description })
      .then((res) => {
        setTodos([...todos, res.data]);
        setName("");
        setDescription("");
      })
      .catch((error) => console.log("creating me error aa gia", error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/todo/${id}`)
      .then((res) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch(console.log("error aa gia"));
  };

  const updateTask = () => {
    axios
      .put(`http://localhost:5000/todo/${editId}`, { name, description })
      .then((res) => {
        setTodos(
          todos.map((todo) =>
            todo._id === editId ? res.data : todo
          )
        );
        setEditId(null);
        setName("");
        setDescription("");
      })
      .catch((err) => console.log("updating me error aa gia", err));
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setName(todo.name);
    setDescription(todo.description);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-8" style={{ backgroundImage: `url('/back.jpeg')`, backgroundSize: "cover" }}>

      {/* Name */}
      <span className="absolute top-4 left-4 text-lg font-semibold uppercase p-2 text-white bg-green-300/60 rounded-full">Todo by Alisha Saif</span>

      <div className="bg-white/60 shadow-lg w-full md:w-4/5 p-6 space-y-6 rounded-xl text-gray-600 duration-200">
        {/* Input */}
        <h1 className="text-4xl font-semibold">Add a new task</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            editId ? updateTask() : addTask();
          }}
          className="flex gap-2"
        >
          <div className="w-full flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white rounded-md p-2 w-full"
            />
          </div>
          <button className="bg-white rounded-md p-2 text-4xl cursor-pointer">{editId ? "✔️" : "+"}</button>
        </form>

        {/* Tasks */}
        <h1 className="text-4xl font-semibold">All Todos</h1>

        {todos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-white rounded-md p-6"
              >
                <div>
                  <h2 className="text-xl font-semibold">{todo.name}</h2>
                  <p className="text-base">{todo.description}</p>
                  <p className="text-xs">Created {format(todo.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <button onClick={() => startEdit(todo)} className="cursor-pointer hover:scale-110">✏️</button>
                  <button onClick={() => deleteTask(todo._id)} className="cursor-pointer hover:scale-110">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ) : (<p>List is Empty</p>)}
      </div>
    </div>
  );
}

export default App;