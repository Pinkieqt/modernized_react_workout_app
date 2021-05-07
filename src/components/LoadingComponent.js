import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import SyncLoader from "react-spinners/SyncLoader";

const LoadingComponent = ({ tableData }) => {
  const { theme } = useContext(ThemeContext);

  function getcolor() {
    switch (theme) {
      case "light":
        return "#007aff";
      case "rose":
        return "#ff4268";
      case "dark":
        return "#C8FF3A";
      case "mirage":
        return "#fe568d";
      default:
        return "#007aff";
    }
  }

  let color = getcolor();
  return (
    <div className={`min-h-screen bg-${theme}-bg flex justify-center items-center`}>
      <SyncLoader color={color} loading={true} size={15} />
    </div>
  );
};

export default LoadingComponent;
