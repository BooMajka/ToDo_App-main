import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {getTasks} from "./getTasks";
import {NewTask} from "./NewTask";
import {Task} from "./Task";

const App = () => {
    const [task, setTask] = useState([]);

    useEffect(() => {
        getTasks(setTask);
    }, [])

    const addTask = task => {
        setTask(prev => [task, ...prev]);
    }

    const deleteTask = id => {
        setTask( prev => prev.filter(el => el.id !== id))
    }

    return (
        <>
            <NewTask addTask={addTask}/>
            {
                task.map( el => <Task key={el.id} {...el} ondeleteTask={deleteTask}/>)
            }
        </>
    )
}



ReactDOM.render(
    <App/>,
    document.querySelector("#app")
);