
import { useReducer, useEffect, useState } from "react";
import { pomodoroReducer, initialState } from "../hooks/Pomodoro.timers";
import { Edit as EditIcon } from "@mui/icons-material";
import { BotMessageSquare } from "lucide-react";
import PomodoroModal from "../shared/components/PomodoroModal.jsx"; // ✅ import

const Pomodoro = () => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const [showModal, setShowModal] = useState(false); // ✅ modal toggle

  useEffect(() => {
    let timer;
    if (state.isRunning && state.time > 0) {
      timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.isRunning, state.time]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full relative">
      {/* AI Reminder */}
      <div className="flex-1 flex justify-start items-center outline-2">
        <div className="bg-shadow w-16 h-16 p-4 mt-16 rounded-4xl flex justify-center items-center">
          <BotMessageSquare className="text-white" />
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
      <div className="flex-1 flex justify-center outline-2">
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
