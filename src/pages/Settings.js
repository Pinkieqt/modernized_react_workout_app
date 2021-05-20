import React, { useContext } from "react";
// import Switch from "react-switch";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import Subheader from "../templates/Subheader";
import { IoChevronForwardOutline, IoCloudDownloadOutline, IoLogoGithub } from "react-icons/io5";
import { Redirect } from "react-router-dom";
import { logoutGoogle } from "../utils/Firebase";
import { AuthContext, UsersDataContext } from "../App";
import Card from "../templates/Card";
import Text from "../templates/Text";
import PersonSelect from "../templates/PersonSelect";

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

  //colorize selected theme
  function getBorderColor(curTheme) {
    return curTheme === theme ? "border-pink-600" : "border-gray-500";
  }

  return (
    <div className={`min-h-screen bg-${theme}-bg`}>
      <div className={`p-4 min-h-screen bg-${theme}-bg mx-auto lg:w-1/3`}>
        <Header>Nastavení</Header>
        <div className={`my-3`}></div>
        <Card>
          <Subheader>Uživatel</Subheader>
          <PersonSelect />

          {/* Dark mode */}
          <Subheader>Barevné téma</Subheader>
          <Text>Vyber si své oblíbené barevné téma celé aplikace :)</Text>
          {/* <Switch
            checked={theme === "dark" ? true : false}
            offColor="#1d1f2f"
            onColor="#C8FF3A"
            onHandleColor="#000"
            checkedIcon={false}
            onChange={setTheme}
          /> */}

          {/* Theme switcher */}
          <div className="w-full flex flex-wrap justify-between h-32 mb-6">
            <div className="w-1/2 h-1/2 p-1">
              <div
                className={`w-full h-full flex justify-center items-center text-lg font-semibold bg-light-bg rounded-lg border-2 ${getBorderColor(
                  "light"
                )} text-light-primary cursor-pointer`}
                onClick={() => setTheme("light")}
              >
                breeze
              </div>
            </div>
            <div className="w-1/2 h-1/2 p-1">
              <div
                className={`w-full h-full  flex justify-center items-center text-lg font-semibold bg-rose-bg rounded-lg border-2  ${getBorderColor(
                  "rose"
                )}  text-rose-primary cursor-pointer`}
                onClick={() => setTheme("rose")}
              >
                rose
              </div>
            </div>
            <div className="w-1/2 h-1/2 p-1">
              <div
                className={`w-full h-full  flex justify-center items-center text-lg font-semibold bg-dark-bg rounded-lg border-2  ${getBorderColor(
                  "dark"
                )}  text-dark-primary cursor-pointer`}
                onClick={() => setTheme("dark")}
              >
                dracula
              </div>
            </div>
            <div className="w-1/2 h-1/2 p-1">
              <div
                className={`w-full h-full  flex justify-center items-center text-lg font-semibold bg-mirage-bg rounded-lg border-2  ${getBorderColor(
                  "mirage"
                )}  text-mirage-primary cursor-pointer`}
                onClick={() => setTheme("mirage")}
              >
                mirage
              </div>
            </div>
          </div>

          {/* Export */}
          <button className={`w-full flex justify-between items-center my-2 pb-1`} onClick={() => exportData()}>
            <Subheader>Exportovat data</Subheader>
            <IoCloudDownloadOutline size="1.7em" className={`text-${theme}-primary`} />
          </button>

          {/* Github */}
          <button
            className={`w-full flex justify-between items-center my-2 pb-1`}
            onClick={() => (window.location.href = "https://github.com/Pinkieqt/modernized_react_workout_app")}
          >
            <Subheader>Zdrojový kód</Subheader>
            <IoLogoGithub size="1.7em" className={`text-${theme}-primary`} />
          </button>

          {/* Logout */}
          <button className={`w-full flex justify-between items-center my-2 pb-1`} onClick={() => logOut()}>
            <Subheader>Odhlásit</Subheader>
            <IoChevronForwardOutline size="1.7em" className={`text-${theme}-primary`} />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
