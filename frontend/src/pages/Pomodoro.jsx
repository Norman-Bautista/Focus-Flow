
import { 
  Edit as EditIcon, 
} from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import { CirclePlus } from 'lucide-react';
import usePomodoroManager from "../hooks/usePomodoroManager.jsx";
import PomodoroModal from "../shared/components/PomodoroModal.jsx"; 
import TodoModal from "../shared/components/TodoModal.jsx";


const Pomodoro = () => {

  const {
        timerState,
        startTimer,
        pauseTimer,
        resetTimer,
        startBreak,
        showModal,
        setShowModal,
        isLoading
    } = usePomodoroManager();

  return (
      <div className="flex flex-col lg:flex-row gap-6 w-full relative">
        {isLoading && <div className="loading"><CircularProgress/></div>}

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
            <div>

            </div>
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
                onClick={() => setShowModal(true)} 
              >
                <EditIcon />
              </button>
            </header>

            {/* Timer */}
            <div className="mx-16 p-12 flex justify-center font-sans font-bold text-xxl">
              <span>
                {formatTimer(timerState.time)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-8 p-4">
              <button
                onClick={startTimer}
                className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
              >
                Start
              </button>
              <button
                onClick={pauseTimer}
                className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
              >
                Pause
              </button>
              <button
                onClick={startBreak}
                className="px-4 py-2 bg-shadow text-white rounded font-medium cursor-pointer"
              >
                Rest
              </button>
              <button
                onClick={resetTimer}
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

        {taskModal && (
          <TodoModal
            onClose={()=> setTaskModal(false)}
            disptach={dispatch}
            
          />
        )}
      </div>
    );
  }; export default Pomodoro;
