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
    <div>
      <div className="h-2/3 w-2/3 bg-white flex">
        <h1>ToDo List</h1>
        <div>
          {todos.map((todo) => (
            <div key={todo._id}>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
