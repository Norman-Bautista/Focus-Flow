import { CalendarCheck, ChartColumnIncreasing, Settings  } from 'lucide-react';
import NavButton from './Navbuttons';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 mx-8 mb-2 rounded-bl-2xl rounded-br-2xl outline-shadow outline-2 bg-white">
      {/* Logo and Home Button */}
      <div className='flex justify-center items-center gap-4'>
        <p>Logo</p>
          <NavLink>
            <button className='font-sans font-bold text-shadow cursor-pointer'>
              Focusflow
            </button>
          </NavLink>      
      </div>

      {/* Navbuttons */}
      <div className='flex justify-between items-center gap-2'>
        <NavButton to="/calendar">
          <button className='flex gap-4'>
            <CalendarCheck/> Calendar
          </button>
        </NavButton>

        <NavButton to="/insights">
          <button className='flex gap-4'>
            <ChartColumnIncreasing /> Analytics
          </button>
        </NavButton>

        <NavButton to="/settings">
          <button className='flex gap-4'>
            <Settings />
          </button>
        </NavButton>
      </div>
    
    </nav>
  )
}

export default Navbar