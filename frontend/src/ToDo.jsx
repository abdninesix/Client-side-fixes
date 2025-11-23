import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const STATUSES = ["Pending", "In Progress", "Completed"];
const LOCAL_KEY = "todos_v1";
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
};
const uid = () => Math.random().toString(36).slice(2, 9);
export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    start: "",
    end: "",
    status: STATUSES[0],
  });
  const [modal, setModal] = useState({ open: false, mode: "add", todo: null });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_KEY);
    if (data) {
      try {
        setTodos(JSON.parse(data));
      } catch {
        setTodos([]);
      }
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
    }
  }, [todos]);
  const handleAdd = () => {
    if (!form.title.trim()) {
      Swal.fire("Error", "Title cannot be empty!", "error");
      return;
    }
    const newTask = {
      id: uid(),
      title: form.title,
      desc: form.desc,
      start: form.start,
      end: form.end,
      status: form.status,
    };
    setTodos([...todos, newTask]);
    setModal({ open: false });
    Swal.fire("Success", "Task added successfully!", "success");
  };
  const handleUpdate = () => {
    setTodos(todos.map((t) => (t.id === modal.taskId ? { ...t, ...form } : t)));
    setModal({ open: false });
    Swal.fire("Updated", "Task updated successfully!", "success");
  };
  <button
    className="btn-delete"
    onClick={() => {
      setTodos(todos.filter((t) => t.id !== modal.taskId));
      setModal({ open: false });
      Swal.fire("Deleted", "Task deleted successfully!", "success");
    }}
  >
    Delete
  </button>;

  const openModal = (mode, todo = null) => {
    setModal({ open: true, mode, todo });
    setForm(
      todo || { title: "", desc: "", start: "", end: "", status: STATUSES[0] }
    );
  };
  const handleView = (todo) => {
    setModal({ open: true, mode: "view", todo });
    setForm(todo);
  };
  const filtered = todos.filter(
    (t) =>
      (t.title.toLowerCase().includes(query.toLowerCase()) ||
        (t.desc || "").toLowerCase().includes(query.toLowerCase())) &&
      (statusFilter.length === 0 || statusFilter.includes(t.status))
  );
  const rowsPerPage = 9;
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filtered.slice(startIndex, startIndex + rowsPerPage);
  return (
    <div className="todo-bg">
      <div className="todo-app">
        <h1>ToDo App</h1>
        <div className="toolbar">
          <input
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={statusFilter[0] || ""}
            onChange={(e) =>
              setStatusFilter(e.target.value ? [e.target.value] : [])
            }
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="btn-add" onClick={() => openModal("add")}>
            + Add Task
          </button>
        </div>
        <div className="table-container">
          {filtered.length === 0 ? (
            <div className="empty">No tasks found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((t, i) => (
                  <tr key={t.id}>
                    <td>{startIndex + i + 1}</td>
                    <td>{t.title}</td>
                    <td>{formatDate(t.start)}</td>
                    <td>{formatDate(t.end)}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          t.status === "Pending"
                            ? "pending"
                            : t.status === "In Progress"
                            ? "progress"
                            : "completed"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => handleView(t)}
                        className="btn-view"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openModal("edit", t)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() =>
                          setModal({ open: true, mode: "delete", taskId: t.id })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {modal.open && (
          <div className="modal-bg" onClick={() => setModal({ open: false })}>
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {(modal.mode === "add" || modal.mode === "edit") && (
                <>
                  <h2>{modal.mode === "add" ? "Add Task" : "Edit Task"}</h2>

                  <label>Title</label>
                  <input
                    placeholder="Enter title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Enter description (max 100 characters)"
                    value={form.desc}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        setForm({ ...form, desc: e.target.value });
                      }
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: form.desc.length >= 100 ? "red" : "#555",
                    }}
                  >
                    {form.desc.length}/100 characters
                  </p>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={form.start}
                    onChange={(e) =>
                      setForm({ ...form, start: e.target.value })
                    }
                  />
                  <label>End Date</label>
                  <input
                    type="date"
                    value={form.end}
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                  />
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div className="btns">
                    <button
                      className="btn-cancel"
                      onClick={() => setModal({ open: false })}
                    >
                      Cancel
                    </button>
                    {modal.mode === "add" ? (
                      <button className="btn-save" onClick={handleAdd}>
                        Save
                      </button>
                    ) : (
                      <button className="btn-update" onClick={handleUpdate}>
                        Update
                      </button>
                    )}
                  </div>
                </>
              )}
              {modal.mode === "view" && (
                <>
                  <h2>Task Details</h2>
                  <p>
                    <b>Title:</b> {form.title}
                  </p>
                  <p>
                    <b>Start:</b> {formatDate(form.start)}
                  </p>
                  <p>
                    <b>End:</b> {formatDate(form.end)}
                  </p>
                  <p>
                    <b>Description:</b> {form.desc}
                  </p>
                  <p>
                    <b>Status:</b> {form.status}
                  </p>
                  <div className="btns">
                    <button
                      className="btn-cancel"
                      onClick={() => setModal({ open: false })}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
              {modal.mode === "delete" && (
                <>
                  <h2>Confirm Delete</h2>
                  <p>This action cannot be undone.</p>
                  <div className="btns">
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setTodos(todos.filter((t) => t.id !== modal.taskId));
                        setModal({ open: false });
                        Swal.fire(
                          "Deleted!",
                          "Task has been deleted.",
                          "success"
                        );
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setModal({ open: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
        <div className="pagination-container">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <style>{`
        .todo-bg {
          background: linear-gradient(135deg, #f366f6, #9333ea);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 30px;
        }
        .todo-app {
          background: white;
          width: 90%;
          max-width: 900px;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          color: #4c1d95;
          margin-bottom: 20px;
        }
        .toolbar {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .toolbar input, .toolbar select {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .btn-add {
          background: #9333ea;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          color: white;
          font-size: 12px;
        }
        .status-badge.pending { background: #facc15; color: black; }
        .status-badge.progress { background: #3b82f6; }
        .status-badge.completed { background: #22c55e; }

        .actions button {
          margin-right: 6px;
          border: none;
          color: white;
          border-radius: 6px;
          padding: 8px 12px;
          cursor: pointer;
        }
        .btn-view { background: #3b82f6; }
        .btn-edit { background: #f59e0b; }
        .btn-delete { background: #ef4444; }
        .btn-save { background: #22c55e; }
        .btn-update { background: #16a34a; }
        .btn-cancel { background: #9ca3af; }

        .modal-bg {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 10px;
          padding: 30px;
          width: 400px;
        }
        .modal h2 {
          margin-bottom: 20px;
          color: #4c1d95;
        }
        .modal label {
          display: block;
          font-weight: 500;
          margin-top: 10px;
        }
        .modal input, .modal textarea, .modal select {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .btns {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.btns button {
  padding: 10px 18px;
  min-width: 110px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  transition: all 0.25s ease;
}
.btn-save,
.btn-update {
  background: #22c55e;
}

.btn-cancel {
  background: #9ca3af;
}

.btn-delete {
  background: #ef4444;
}
.btns button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

  .pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px auto;
  padding-top: 10px;
}
.pagination-container button {
  background-color: #a855f7; 
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
      `}</style>
    </div>
  );
}
