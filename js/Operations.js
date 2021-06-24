import React, {useState, useEffect} from "react";
import {Operation} from "./Operation";
import {createOperations} from "./getOperations";

export const Operations = ({taskID, form, setForm, operations, setOperations, status}) => {
    const [descriptions, setDescriptions] = useState("");

    const handleClickButton = (e) => {
        const value = e.target.value;
        setDescriptions(value);
    }
    const submitOperation = (event) => {
        event.preventDefault();

        const newOperation = {
            description: descriptions,
            time: 0
        }

        createOperations(taskID, newOperation, data => {
            setOperations(prev => [data, ...prev]);
            setForm(false);
            setDescriptions("");
        })
    }

    const deleteOperation = id => {
        setOperations(prev => prev.filter(prevOperations => prevOperations.id !== id))
    }

    return (
        <>
            {
                form && (
                    <div className="card-body">
                        <form onSubmit={submitOperation}>
                            <div className="input-group">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Operation description"
                                       value={descriptions}
                                       onChange={handleClickButton}/>

                                <div className="input-group-append">
                                    <button className="btn btn-info">
                                        Add
                                        <i className="fas fa-plus-circle ml-1"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                 )
            }

                <ul className="list-group list-group-flush">
                    {
                        operations.map(operation => <Operation key={operation.id} {...operation} ondeleteOperation={deleteOperation} status={status}/>)
                    }
                </ul>
        </>
    )
}