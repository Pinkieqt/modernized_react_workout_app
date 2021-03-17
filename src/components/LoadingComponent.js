import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import HashLoader from "react-spinners/HashLoader";

const LoadingComponent = ({ tableData }) => {
  const { theme } = useContext(ThemeContext);
  let color = theme === "dark" ? "#C8FF3A" : "#007aff";
  return (
    <div className={`min-h-screen bg-${theme}-bg flex justify-center items-center`}>
      <HashLoader color={color} loading={true} size={50} />
    </div>
  );
};

export default LoadingComponent;
