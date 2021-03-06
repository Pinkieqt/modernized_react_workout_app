import React from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoCogOutline, IoFitnessOutline, IoFileTrayFullOutline, IoAddOutline } from "react-icons/io5";
import { ThemeContext } from "../providers/ThemeProvider";

const NavBar = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className="flex justify-center">
      <div
        className={`absolute bottom-0 w-11/12 h-12 flex items-center justify-around mb-3 bg-${theme}-nav bg-opacity-10 rounded-xl text-${theme}-tsec`}
      >
        <NavLink to="/Dashboard" activeClassName={`text-${theme}-primary`}>
          <IoHomeOutline size="1.7em" />
        </NavLink>
        <NavLink to="/Metrics" activeClassName={`text-${theme}-primary`}>
          <IoFitnessOutline size="1.7em" />
        </NavLink>
        <div className="flex items-center justify-center w-14 h-14 mb-7 bg-gray-700 rounded-full text-white">
          <IoAddOutline size="2em" />
        </div>
        <NavLink to="/Weights" activeClassName={`text-${theme}-primary`}>
          <IoFileTrayFullOutline size="1.7em" />
        </NavLink>
        <NavLink to="/Settings" activeClassName={`text-${theme}-primary`}>
          <IoCogOutline size="1.7em" />
        </NavLink>
        {/* <Link to="/Modal">Modal</Link> */}
      </div>
    </div>
  );
};

export default NavBar;
