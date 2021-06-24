import React, {useState, useEffect} from "react";
import {updateOptions} from "./getOperations";
import {deleteOperations} from "./getOperations";

export const Operation = ({description, id, ondeleteOperation, time, status}) => {
    const [timeSpentForm, setTimeSpentForm] = useState(false);
    const [timeSpent, setTimeSpent] = useState(time);
    const [timeSpentInput, setTimeSpentInput] = useState("");

    const saveTime = event => {
        event.preventDefault();

        if (isNaN(parseInt(timeSpentInput)) || timeSpentInput < 0) {
            return null;
        } else {
            const newOperation = {
                description,
                timeSpent: parseInt(timeSpent) + parseInt(timeSpentInput)
            };

            updateOptions(id, newOperation, data => {
                setTimeSpent(data.timeSpent);

                setTimeSpentForm(false);
            })
        }

    };

    const clickButton = (e) => {
        const value = e.target.value;
        setTimeSpentInput(value);
    }
    const deleteButton = () => {
        deleteOperations(id, () => {
            ondeleteOperation(id);
        })
    }

    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    {description}

                    {timeSpent > 0 && (
                        <span className="badge badge-success badge-pill ml-2">
                            {hours}h {minutes}m
                        </span>
                    )}
                </div>


                {
                    timeSpentForm && (
                        <form onSubmit={saveTime}>
                            <div className="input-group input-group-sm">
                                <input type="number"
                                       className="form-control"
                                       placeholder="Spent time in minutes"
                                       value={timeSpentInput}
                                       style={{width: "12rem"}}
                                       onChange={clickButton}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-success">
                                        <i className="fas fa-save"/>
                                    </button>
                                    <button onClick={() => setTimeSpentForm(false)} className="btn btn-outline-dark">
                                        <i className="fas fa-times false"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                }

                {
                    !timeSpentForm && (
                        <div>
                            {
                                status === "open" && (
                                    <button onClick={() => setTimeSpentForm(true)} className="btn btn-outline-success btn-sm mr-2">
                                        Add time
                                        <i className="fas fa-clock ml-1"/>
                                    </button>
                                )
                            }

                            <button onClick={deleteButton} className="btn btn-outline-danger btn-sm">
                                <i className="fas fa-trash"/>
                            </button>
                        </div>
                    )
                }
            </li>
        </>
    )
}