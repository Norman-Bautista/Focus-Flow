
import { useReducer, useEffect, useState } from "react";
import { pomodoroReducer, initialState } from "../hooks/Pomodoro.timers";
import { TodoReducer } from "../hooks/TodoCrud.jsx";
import { 
  Edit as EditIcon, 
} from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';

import { CirclePlus } from 'lucide-react';
import PomodoroModal from "../shared/components/PomodoroModal.jsx"; 
import TodoModal from "../shared/components/TodoModal.jsx";

import {get_All_Tasks, get_Task, create_Task, update_Task, complete_Task, delete_Task} from '../api/task.api.js';

const Pomodoro = () => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const [todoState, todoDispatch] = useReducer(TodoReducer, { tasks: [], currentTask: null });
  const [showModal, setShowModal] = useState(false); 
  const [taskModal, setTaskModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (state.isRunning && state.time > 0) {
      timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.isRunning, state.time]);

  // Fetch all tasks on component mount
  useEffect(()=> {
    const fetchTasks = async () => {
      const tasks = await get_All_Tasks();
      todoDispatch({type: "GET_ALL_TASKS", payload: tasks});
    }
    fetchTasks();
  })

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full relative">
      {/* Task List */}
      <div className="flex-1 flex justify-start items-center">
        <div className="container m-auto p-4 border-3 border-shadow bg-secondary rounded-2xl w-78 mt-24"> 
          <header className="flex justify-between items-center mb-4">
            <h1>To-do List</h1>
            <button 
            className="p-1 bg-shadow text-white rounded-xl cursor-pointer"
            onClick={() => {setTaskModal(true)}}
            ><CirclePlus /></button>
          </header>
            {todoState.tasks.map((task) => (
              <div key={task.id} className="mb-2 p-2 border-b border-gray-300">
                <h2 className="font-bold">{task.title}</h2>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Pomodoro + Tasks Column */}
      <div className="flex-[3] max-w-3xl">
        <div className="border-3 rounded-2xl border-shadow bg-secondary mt-16 relative">
          {/* Header */}
          <header className="flex justify-between items-center p-8">
            <h1 className="text-lg font-sans font-bold text-shadow">
              Customize your own Pomodoro!
            </h1>
            <button
              className="cursor-pointer"
              onClick={() => setShowModal(true)} // ✅ open modal
            >
              <EditIcon />
            </button>
          </header>

          {/* Timer */}
          <div className="mx-16 p-12 flex justify-center font-sans font-bold text-xxl">
            <span>
              {Math.floor(state.time / 60)}:
              {String(state.time % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 p-4">
            <button
              onClick={() => dispatch({ type: "START" })}
              className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
            >
              Start
            </button>
            <button
              onClick={() => dispatch({ type: "PAUSE" })}
              className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
            >
              Pause
            </button>
            <button
              onClick={() => dispatch({ type: "REST" })}
              className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
            >
              Rest
            </button>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Streaks + Cycles Column */}
      <div className="flex-1 flex justify-center ">
        <div className="container m-auto p-4 border-3 border-shadow bg-secondary rounded-2xl w-78 mt-24">
          <p className="font-sans">Total Streak: {/* streak num */}</p>
          <p className="font-sans">Total Daily Cycles: {/* cycle count */}</p>
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <PomodoroModal
          onClose={() => setShowModal(false)}
          dispatch={dispatch}
          currentSettings={{
            work: state.workDuration,
            shortBreak: state.shortBreak,
            longBreak: state.longBreak,
            cycles: state.cyclesBeforeLongBreak,
          }}
        />
      )}
    </div>
  );
};

export default Pomodoro;
