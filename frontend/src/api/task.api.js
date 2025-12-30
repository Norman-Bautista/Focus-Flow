import api from axios_Instance.js

export const get_All_Tasks = async () => {
    try { 
        const response = await api.get("api/v1/task/tasks");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Tasklist not found, please add a task");
    }
};

export const get_Task = async () => {
    try {
        const response = await api.get("api/v1/task/tasks/:id");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Task not found or created yet");
    }
};

export const create_Task = async () => {
    try {
        const response = await api.post("api/v1/task/tasks");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Invalid input, unable to create task");
    }
};

export const update_Task = async () => {
    try {
        const response = await api.put("api/v1/task/tasks/:id");
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data.message || "Invalid input, unable to edit task");
    }
};

export const complete_Task = async () => {
    try {
        const response = await api.put("api/v1/task/tasks/:id/complete");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Task not found or not completed yet");
    }
};

export const delete_Task = async () => {
    try {
        const response = await api.delete("api/v1/task/tasks/:id");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Task not found, unable to delete");
    }
};