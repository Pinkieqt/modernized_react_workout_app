import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import Subheader from "../templates/Subheader";
import { IoChevronForwardOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { Redirect } from "react-router-dom";
import { logoutGoogle } from "../utils/Firebase";
import { AuthContext, UsersDataContext } from "../App";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const usersData = useContext(UsersDataContext);

  //redirect if currentuser
  const currentUser = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  //function to export and view DB data
  function exportData() {
    let bckup = JSON.stringify(usersData);
    var x = window.open();
    x.document.open();
    x.document.write(bckup);
    x.document.close();
  }

  //function to log out
  function logOut() {
    logoutGoogle();
    //history.push("/login");
  }

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Nastavení</Header>
      <div className="w-full flex justify-between items-center my-4 ">
        <Subheader>Dark mode</Subheader>
        <Switch
          checked={theme === "dark" ? true : false}
          offColor="#1d1f2f"
          onColor="#C8FF3A"
          onHandleColor="#000"
          checkedIcon={false}
          onChange={setTheme}
        />
      </div>
      <button className="w-full flex justify-between items-center my-4" onClick={() => exportData()}>
        <Subheader>Exportovat data</Subheader>
        <IoCloudDownloadOutline size="1.7em" className={`text-${theme}-primary`} />
      </button>

      <button className="w-full flex justify-between items-center my-4" onClick={() => logOut()}>
        <Subheader>Odhlásit</Subheader>
        <IoChevronForwardOutline size="1.7em" className={`text-${theme}-primary`} />
      </button>
    </div>
  );
};

export default Settings;
