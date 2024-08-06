import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import EditTask from "./components/EditTask/EditTask";
import "./App.css";
import client from "./api";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await client.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSetError = (message) => {
        setError(message);

        setTimeout(() => {
            setError("");
        }, 4000);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            await client.post("/tasks", task);
            fetchTasks();
        } catch (error) {
            onSetError(error.response.data.message);
        }
    };

    const updateTask = async (id, task) => {
        try {
            await client.put(`/tasks/${id}`, task);
            fetchTasks();
        } catch (error) {
            onSetError(error.response.data.message);
        }
    };

    const deleteTask = async (id) => {
        const result = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if (!result) {
            return;
        }

        try {
            await client.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            onSetError(error.response.data.message);
        }
    };

    return (
        <Router>
            <main className="main">
                {error && <p className="error">Error: {error}</p>}
                <Link to="/">
                    <h1 className="title">Todo List</h1>
                </Link>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <TaskForm addTask={addTask} />
                                <TaskList
                                    tasks={tasks}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={
                            <EditTask
                                updateTask={updateTask}
                                onSetError={onSetError}
                            />
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
