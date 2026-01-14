
import { get_All_Tasks, create_Task, update_Task, delete_Task } from '../api/task.api.js';
import { useReducer, useState } from "react";
import { TodoReducer } from "../reducers/todoReducer.js";

const useTaskManager = () => {

    const [todoState, todoDispatch] = useReducer(TodoReducer, { tasks: [], currentTask: null });
    const [taskModal, setTaskModal] = useState(false);

    const fetchTasks = async () => {
            setIsLoading (true); 
            try {
            const tasks = await get_All_Tasks();
            todoDispatch({ type: "GET_ALL_TASKS", payload: tasks });
            } catch (error) {
            console.error("Error fetching tasks:", error);
            }
        };

        const createTask = async (task) => {
            try {
            const newTask = await create_Task(task);
            todoDispatch({ type: "CREATE_TASK", payload: newTask });
            } catch (error) {
            console.error("Error creating task:", error);
            }
        };    

        const update_Task = async (task) => {
            try {
            const updatedTask = await update_Task(task);
            todoDispatch({ type: "UPDATE_TASK", payload: updatedTask });
            } catch (error) {
            console.error("Error updating task:", error);
            }
        };

        const deleteTask = async (taskId) => {
            try {
            await delete_Task(taskId);
            todoDispatch({ type: "DELETE_TASK", payload: { id: taskId } });
            } catch (error) {
            console.error("Error deleting task:", error);
            }
        };
    
    return {
        fetchTasks,
        createTask,
        update_Task,
        deleteTask
    }
}

export default useTaskManager