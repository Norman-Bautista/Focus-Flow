import { NavLink } from "react-router-dom";
import { CalendarCheck, ChartColumnIncreasing, Settings  } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex ">
      <div>
        <span>Logo</span>
        <p>FocusFlow</p>
      </div>
      <div>
        <NavLink to="/calendar">
          Calendar
        </NavLink>
        <NavLink to="/insights">
          Analytics
        </NavLink>
        <NavLink to ="/settings">
          User Settings
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar