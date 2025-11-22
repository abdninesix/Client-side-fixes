import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url('/back.jpeg')`, backgroundSize: 'cover' }}>
      <div className="bg-white/75 shadow-lg size-2/3 p-6 rounded-xl text-gray-700">
        <h1 className="text-4xl font-semibold text-center">My List</h1>
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-sm uppercase">
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo._id}>
                  <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{todo.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{todo.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
