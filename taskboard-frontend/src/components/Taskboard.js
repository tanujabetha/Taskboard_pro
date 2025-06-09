import React, { useState } from "react";
import axios from "axios";

function Taskboard() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Send POST request with Authorization header
      const response = await axios.post(
        "/api/task", 
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created: " + response.data.title);

      // Reset form
      setTaskData({ title: "", description: "" });
    } catch (err) {
      alert(err.response.data.message || "Task creation failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create</button>
      </form>

      <hr />

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "2rem" }}>
        <div><h2>To Do</h2></div>
        <div><h2>In Progress</h2></div>
        <div><h2>Done</h2></div>
      </div>
    </div>
  );
}

export default Taskboard;
