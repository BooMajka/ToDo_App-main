import React, {useEffect, useState} from "react";
import {API_KEY, API_URL} from "./API";

export const getOperations = (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
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

export const createOperations = (id, operation, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(operation)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
};

export const updateOptions = (id, operation, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(operation)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
            }
        })
        .catch(err => console.log(err));
}

export const deleteOperations = (id, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
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

