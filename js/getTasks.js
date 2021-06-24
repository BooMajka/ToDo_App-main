import React, {useEffect, useState} from "react";
import {API_KEY, API_URL} from "./API";

export const getTasks = successCallback => {
    fetch(`${API_URL}/tasks`, {
        headers: {
            "Authorization": API_KEY
        }
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
};

export const createTask = (task, successCallback) => {
    fetch(`${API_URL}/tasks`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
};

export const updateTask = (id, task, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
}

export const deleteTask = (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json",
        },
        method: "DELETE"
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
}

