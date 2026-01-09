

export function TodoReducer(state, action) {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return { ...state, tasks: action.payload };
    case "GET_TASK":
      return { ...state, currentTask: action.payload };
    case "CREATE_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "COMPLETE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: true } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    default:
      return state;
  }
}   