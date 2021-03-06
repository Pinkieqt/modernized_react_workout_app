import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import Subheader from "../templates/Subheader";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Nastavení</Header>
      <div className="w-full flex justify-between items-center my-4 ">
        <Subheader>Dark mode</Subheader>
        <Switch checked={theme === "dark" ? true : false} offColor="#1d1f2f" onColor="#FDB813" onChange={setTheme} />
      </div>
    </div>
  );
};

export default Settings;
