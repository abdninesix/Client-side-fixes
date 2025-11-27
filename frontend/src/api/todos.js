

//POST request
const addTask = () => {
    axios
        .post("http://localhost:5000/todo", { name, description })
        .then((res) => {
            setTodos([...todos, res.data]);
            setName("");
            setDescription("");
            toast.success("Task added successfully");
        })
        .catch((error) => console.log("creating me error aa gia", error));
};