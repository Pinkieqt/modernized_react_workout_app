import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Dashboard</Header>
    </div>
  );
};

export default Dashboard;
