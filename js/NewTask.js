import React, {useState, useEffect} from "react";
import {createTask} from "./getTasks";

export const NewTask = ({addTask}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTaskSubmit = (event) => {
        event.preventDefault();

        const newTask = {
            title,
            description,
            status: "open"
        }

        createTask(newTask, addTask);
    }
    const handleTitleClick = (e) => {
        const value = e.target.value;
        setTitle(value);
    }
    const handleDescriptionClick = (e) => {
        const value = e.target.value;
        setDescription(value);
    }

    return (
        <>
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="card-title">New task</h1>
                    <form onSubmit={addTaskSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="title"
                                   placeholder="Title"
                                   value={title}
                                   onChange={handleTitleClick}/>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="description"
                                   placeholder="Description"
                                   value={description}
                                   onChange={handleDescriptionClick}/>
                        </div>
                        <button className="btn btn-info">
                            Add task
                            <i className="fas fa-plus-circle ml-1"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}