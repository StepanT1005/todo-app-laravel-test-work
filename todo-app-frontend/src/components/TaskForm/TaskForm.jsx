import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask, isUpdate = false, initialTask = {} }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isUpdate && initialTask) {
            setTitle(initialTask.title || "");
            setDescription(initialTask.description || "");
            setDueDate(initialTask.due_date || "");
            setIsCompleted(initialTask.is_completed || false);
        }
    }, [initialTask, isUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = { title, description, due_date: dueDate };
        if (isUpdate) taskData.is_completed = isCompleted;

        addTask(taskData);

        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                className="form-title form-element"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                className="form-description form-element"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
                type="date"
                className="form-date form-element"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            {isUpdate && (
                <div className="form-completed form-element">
                    <label className="form-completed-label">
                        Is Completed:
                        <input
                            className="form-completed-checkbox"
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                    </label>
                </div>
            )}
            <button className="task-form-submit btn" type="submit">
                {isUpdate ? "Update" : "Add"} Task
            </button>
        </form>
    );
};

export default TaskForm;
