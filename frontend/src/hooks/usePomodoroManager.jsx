import { useReducer, useState, useReducer, useEffect } from "react";
import { pomodoroReducer, initialState } from "../reducers/pomodoroReducer.js";

const usePomodoroManager = () => {
  
    const [timerState, timerDispatch] = useReducer(pomodoroReducer, initialState);
   
    const [showModal, setShowModal] = useState(false); 
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (timerState.isRunning && timerState.time > 0) {
          timer = setInterval(() => {
            dispatch({ type: "TICK" });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [timerState.isRunning, timerState.time]);
    
    
    const startTimer = useCallback(() => {
        timerDispatch({ type: "START" });
    }, []);

    const pauseTimer = useCallback(() => {
        timerDispatch({ type: "PAUSE" });
    }, []);

    const resetTimer = useCallback(() => {
        timerDispatch({ type: "RESET" });
    }, []);

    const startBreak = useCallback((isLongBreak = false) => {
        timerDispatch({ type: "START_BREAK", payload: { isLongBreak } });
    }, []);

    const updateSettings = useCallback((settings) => {
        timerDispatch({ type: "UPDATE_SETTINGS", payload: settings });
    }, []);

    

    const currentCycle = Math.floor(timerState.completedSessions / timerState.cyclesBeforeLongBreak) + 1;

    return {
        showModal,
        setShowModal,
        isloading,
        setIsLoading,
    }
}

export default usePomodoroManager