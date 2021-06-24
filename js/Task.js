import React, {useState, useEffect} from "react";
import {Operations} from "./Operations";
import {updateTask} from "./getTasks";
import {deleteTask} from "./getTasks";
import {getOperations} from "./getOperations";

export const Task = ({title, description, id, status: statuss, ondeleteTask}) => {
    const [status, setStatus] = useState(statuss);
    const [operations, setOperations] = useState([]);
    const [sections, setSections] = useState(false);

    const finishButton = () => {
        const newTask = {
            title,
            description,
            status: "closed"
        };

        updateTask(id, newTask, () => {
            setStatus("closed")
        });
    };
    
    const addButton = () => {
        setSections(prev => !prev)
    };

    useEffect(() => {
        getOperations(id, setOperations);
    }, []);
    
    const deleteButton = () => {
        deleteTask(id, () => {
            ondeleteTask(id);
        });
    };

    return (
        <>
            <section className="card mt-5 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5>{title}</h5>
                        <h6 className="card-subtitle text-muted">{description}</h6>
                    </div>


                    <div>
                        {
                            status === "open" && (
                            <>
                                {/*Przyciski "Add operation" i "Finish" mają być widoczne*/}
                                {/*tylko jeżeli status zadania jest "open"*/}

                                <button onClick={addButton} className="btn btn-info btn-sm mr-2">
                                    Add operation
                                    <i className="fas fa-plus-circle ml-1"/>
                                </button>

                                <button onClick={finishButton} className="btn btn-dark btn-sm">
                                    Finish
                                    <i className="fas fa-archive ml-1"/>
                                </button>
                            </>
                        )}

                        {
                            operations.length === 0 &&
                            <div>

                                  {/*Przycisk usuwania ma być widoczny tylko*/}
                                  {/*jeżeli nie ma żadnych operacji w zadaniu*/}

                                <button onClick={deleteButton} className="btn btn-outline-danger btn-sm ml-2">
                                    <i className="fas fa-trash false"/>
                                </button>
                            </div>
                        }

                    </div>
                </div>

                <Operations taskID={id}
                            form={sections}
                            setForm={setSections}
                            operations={operations}
                            setOperations={setOperations}
                            status={status}/>
            </section>
        </>
    )
}