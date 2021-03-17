import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import Subheader from "../templates/Subheader";
import { IoChevronForwardOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { Redirect, useHistory } from "react-router-dom";
import { logoutGoogle } from "../utils/Firebase";
import { AuthContext } from "../App";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  let history = useHistory();

  //function to log out
  function logOut() {
    logoutGoogle();
    //history.push("/login");
  }

  //redirect if currentuser
  const currentUser = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Nastavení</Header>
      <div className="w-full flex justify-between items-center my-4 ">
        <Subheader>Dark mode</Subheader>
        <Switch checked={theme === "dark" ? true : false} offColor="#1d1f2f" onColor="#007aff" onChange={setTheme} />
      </div>
      <button className="w-full flex justify-between items-center my-4 ">
        <Subheader>Exportovat data</Subheader>
        <IoCloudDownloadOutline size="1.7em" className={`text-${theme}-tsec`} />
      </button>

      <button className="w-full flex justify-between items-center my-4" onClick={() => logOut()}>
        <Subheader>Odhlásit</Subheader>
        <IoChevronForwardOutline size="1.7em" className={`text-${theme}-tsec`} />
      </button>
    </div>
  );
};

export default Settings;
