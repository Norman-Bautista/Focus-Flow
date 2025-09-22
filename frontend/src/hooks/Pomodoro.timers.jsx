
export const initialState = {
  time: 1500, // 25 min default work time
  isRunning: false,
  mode: "work",
};

export function pomodoroReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "RESET":
      return { ...state, time: 1500, isRunning: false };
    case "REST":
      return {...state, time:300, mode:"rest" , isRunning: true }
    case "TICK":
      return { ...state, time: state.time - 1 };
    default:
      return state;
  }
}