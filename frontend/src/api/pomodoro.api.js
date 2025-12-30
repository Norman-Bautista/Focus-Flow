import api from axios_Instance.js

export const get_All_Timers = async () => {
    try {
       const response = await api.get('api/v1/pomodoro/timers');
       return response.data; 
    } catch (error) {
        throw new Error(error.response?.data.message || "Saved timers cannot be retrieved");
    }    
};

export const get_Timer_Value = async () => {
    try {
        const response = await api.get('api/v1/pomodoro/timer/:type');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || "Timer value not found");
    }
};

export const update_Timer_Values = async () => {
    try {
        api.put('api/v1/pomodoro/timer/:type');
    } catch (error) {
        throw new Error(error.response?.data.message || "Error changing pomodoro timers");  
    }
};

export const clear_Timer = async () => {
    try {
        api.delete(api/v1/pomodoro/timers)
    } catch (error) {
        throw new Error(error.response?.data.message || "Error executing clear timers");
    }
};

export const update_Cycle_Longbreak = async () => {
    try {
        api.put('api/v1/pomodoro/cycle')
    } catch (error) {
        throw new Error(error.response?.data.message || "Error updating cycle requirement before longbreak");  
    }
};