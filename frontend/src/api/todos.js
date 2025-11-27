

//POST request
const addTask = () => {
    axios
        .post(`${baseURL}/todo`, { name, description })
        .then((res) => {
            setTodos([...todos, res.data]);
            setName("");
            setDescription("");
            toast.success("Task added successfully");
        })
        .catch((error) => console.log("creating me error aa gia", error));
};