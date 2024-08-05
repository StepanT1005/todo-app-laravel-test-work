import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../../api";
import TaskForm from "../TaskForm/TaskForm";

const EditTask = ({ updateTask, onSetError }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await client.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                onSetError(
                    "Failed to fetch task" + error.response.data.message
                );
            }
        };

        fetchTask();
    }, [id, onSetError]);

    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            navigate("/");
        } catch (error) {
            onSetError("Failed to update task" + error.response.data.message);
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <TaskForm
                addTask={handleUpdate}
                isUpdate={true}
                initialTask={task}
            />
        </div>
    );
};

export default EditTask;
