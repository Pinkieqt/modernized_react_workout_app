import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoCogOutline,
  IoFitnessOutline,
  IoFileTrayFullOutline,
  IoLayersOutline,
  IoAddOutline,
  IoCloseOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { ThemeContext } from "../providers/ThemeProvider";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddArrivalComponent from "./AddArrivalComponent";
import AddWeightComponent from "./AddWeightComponent";

const NavBar = () => {
  const { theme } = React.useContext(ThemeContext);
  const [isModalOpened, setModalOpened] = useState(false);
  const [isFirstSegment, setFirstSegment] = useState(true);

  return (
    <div className="flex justify-center">
      <div
        className={`fixed bottom-0 w-11/12 h-12 flex items-center justify-around mb-3 bg-${theme}-nav bg-opacity-85 rounded-xl shadow-lg text-${theme}-tsec z-50`}
      >
        <NavLink to="/dashboard" activeClassName={`text-${theme}-primary`} className="w-12 h-12 rounded-2xl flex items-center justify-center">
          <IoHomeOutline size="1.7em" />
        </NavLink>
        <NavLink to="/metrics" activeClassName={`text-${theme}-primary`} className="w-12 h-12 rounded-2xl flex items-center justify-center">
          <IoFitnessOutline size="1.7em" />
        </NavLink>
        <div
          className={`flex items-center justify-center w-14 h-14 bg-gray-700 shadow-2xl rounded-full text-white`}
          onClick={() => {
            setModalOpened(!isModalOpened);
          }}
        >
          <IoChevronUpOutline size="2em" />
        </div>
        <NavLink to="/weights" activeClassName={`text-${theme}-primary`} className="w-12 h-12 rounded-2xl flex items-center justify-center">
          <IoLayersOutline size="1.7em" />
        </NavLink>
        <NavLink to="/settings" activeClassName={`text-${theme}-primary`} className="w-12 h-12 rounded-2xl flex items-center justify-center">
          <IoCogOutline size="1.7em" />
        </NavLink>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpened}
        onClose={() => setModalOpened(false)}
        classNames={{
          modal: "customModal" + theme,
        }}
        showCloseIcon={false}
        animationDuration={350}
      >
        <div className="p-5">
          <div className="flex justify-end">
            <IoCloseOutline size="2em" className={`text-${theme}-primary`} onClick={() => setModalOpened(false)} />
          </div>
          {isFirstSegment ? (
            <div className="w-full flex justify-center items-center py-5">
              <button
                className={`w-2/4 text-xl rounded-l-lg text-${theme}-primary bg-${theme}-primary bg-opacity-10 h-10 border border-${theme}-tpr border-opacity-20`}
              >
                Příchod
              </button>
              <button
                onClick={() => setFirstSegment(false)}
                className={`w-2/4 text-xl rounded-r-lg text-${theme}-tsec bg-${theme}-elev h-10 border border-${theme}-tpr border-opacity-20`}
              >
                Váha
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-5">
              <button
                onClick={() => setFirstSegment(true)}
                className={`w-2/4 text-xl rounded-l-lg text-${theme}-tsec bg-${theme}-elev h-10 border border-${theme}-tpr border-opacity-20`}
              >
                Příchod
              </button>
              <button
                className={`w-2/4 text-xl rounded-r-lg text-${theme}-primary bg-${theme}-primary bg-opacity-10 h-10 border border-${theme}-tpr border-opacity-20`}
              >
                Váha
              </button>
            </div>
          )}
          {isFirstSegment ? (
            <AddArrivalComponent closeHandler={() => setModalOpened(false)} />
          ) : (
            <AddWeightComponent closeHandler={() => setModalOpened(false)} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;
