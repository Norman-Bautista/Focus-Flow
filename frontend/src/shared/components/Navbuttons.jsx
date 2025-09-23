
import { NavLink } from "react-router-dom";

const NavButton = ({ to, children }) => (
  <NavLink to={to}>
    <button className="font-sans bg-shadow text-white rounded-2xl px-4 py-2 cursor-pointer hover:text-accent">
      {children}
    </button>
  </NavLink>
);

export default NavButton;