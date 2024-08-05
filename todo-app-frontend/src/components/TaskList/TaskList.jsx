import React from "react";
import { Link } from "react-router-dom";
import "./TaskList.css";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    return (
        <section className="tasks">
            <ul>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={task.is_completed ? "completed" : ""}
                    >
                        <span className="task-title">
                            <Link to={`/edit/${task.id}`}>{task.title}</Link>
                        </span>
                        <span className="task-due-date">{task.due_date}</span>
                        <input
                            className="task-completed-checkbox"
                            type="checkbox"
                            checked={task.is_completed}
                            onChange={(e) =>
                                updateTask(task.id, {
                                    ...task,
                                    is_completed: e.target.checked,
                                })
                            }
                        />
                        <button
                            className="task-delete"
                            onClick={() => deleteTask(task.id)}
                        >
                            &#10060;
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default TaskList;
