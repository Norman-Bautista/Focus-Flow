import { useReducer, useState, useReducer, useEffect } from "react";
import { pomodoroReducer, initialState } from "../reducers/pomodoroReducer.js";

const usePomodoroManager = () => {
  
    const [timerState, timerDispatch] = useReducer(pomodoroReducer, initialState);
   
    const [showModal, setShowModal] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (timerState.isRunning && timerState.time > 0) {
          timer = setInterval(() => {
            timerDispatch({ type: "TICK" });
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

    return {
        // Timer state and actions
        timerState,
        startTimer,
        pauseTimer,
        resetTimer,
        startBreak,
        
        // Modal state and actions
        showModal,
        setShowModal,
        
        // Loading state
        isLoading,
        setIsLoading
    };
}

export default usePomodoroManager