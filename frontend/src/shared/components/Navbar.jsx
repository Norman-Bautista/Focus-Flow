import { NavLink } from "react-router-dom";
import { CalendarCheck, ChartColumnIncreasing, Settings  } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 mx-8 rounded-2xl">
      <div className="flex gap-8 items-center">
        <span>Logo</span>
        <NavLink to="/pomodoro">
          <button className="font-sans border-shadow border-2 rounded-2xl px-4 py-2 cursor-pointer text-shadow font-medium active:bg-shadow active:text-white">
            Focusflow
          </button>
        </NavLink>
      </div>
      <div className="flex gap-4 items-center">
          <NavLink to="/calendar">
            <button className="font-sans bg-shadow text-white rounded-2xl px-4 py-2 cursor-pointer hover:text-accent">
              Calendar
            </button>
          </NavLink>
        
        <NavLink to="/insights">
          <button className="font-sans bg-shadow text-white rounded-2xl px-4 py-2 cursor-pointer hover:text-accent">
            Analytics
          </button>
        </NavLink>
        <NavLink to ="/settings">
          <button className="font-sans bg-shadow text-white rounded-2xl px-4 py-2 cursor-pointer hover:text-accent">
            Settings
          </button>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar